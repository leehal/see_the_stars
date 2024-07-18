import React, { useState, useEffect, useRef } from "react";
import Common, { DOMAIN } from "../../utils/Common";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChatAxiosApi from "../../api/ChatAxiosApi";
import MyAxiosApi from "../../api/MyAxiosApi";
import Profile from "../../component/Profile";

const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChatHeader = styled.div`
  font-size: 1.5em;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  overflow-y: auto;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 20px;
`;

const Message = styled.div`
  max-width: 60%;
  padding: 10px;
  margin: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.isSender ? "#DCF8C6" : "#E0E0E0")};
  border: ${(props) =>
    props.isSender ? "1px solid #DCF8C6" : "1px solid #E0E0E0"};
`;

const Input = styled.input`
  padding: 10px;
  width: 70%;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const SendButton = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
const CloseButton = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: #f44336;
  color: white;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;
const Div = styled.div`
  display: flex;
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
`;

const Chatting = () => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [inputMsg, setInputMsg] = useState("");
  const [chatList, setChatList] = useState([]);
  const { roomId } = useParams();
  const [sender, setSender] = useState("");
  // const [roomName, setRoomName] = useState(""); // 채팅방 이름
  const ws = useRef(null);
  const navigate = useNavigate(); // useNavigate 훅 추가

  const onChangMsg = (e) => {
    setInputMsg(e.target.value);
    console.log(e.target.value);
  };

  const onEnterKey = (e) => {
    if (e.key === "Enter" && inputMsg.trim() !== "") {
      e.preventDefault();
      onClickMsgSend(e);
    }
  };

  const onClickMsgSend = (e) => {
    const MessageSave = async (roodId, sender, message) => {
      const rsp = await ChatAxiosApi.chatMessageSave(roodId, sender, message);
      setInputMsg("");
    };
    ws.current.send(
      JSON.stringify({
        type: "TALK",
        roomId: roomId,
        sender: sender.nick,
        message: inputMsg,
      })
    );
    MessageSave(roomId, sender.nick, inputMsg);
    setInputMsg("");
    console.log(`sender : ${sender}`);
    console.log(`inputMsg : ${inputMsg}`);
    console.log(`roomId : ${roomId}`);
  };
  const onClickMsgClose = () => {
    ws.current.send(
      JSON.stringify({
        type: "CLOSE",
        roomId: roomId,
        sender: sender.nick,
        message: "종료 합니다.",
      })
    );
    ws.current.close();
    navigate("/Chat");
  };

  useEffect(() => {
    // 이메일로 회원 정보 가져 오기
    const getMember = async () => {
      try {
        const rsp = await MyAxiosApi.memberDetail();
        console.log(rsp.data.nick);
        setSender(rsp.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMember();
  }, []);

  useEffect(() => {
    // 채팅방 정보 가져 오기
    const getChatRoom = async () => {
      try {
        const rsp = await ChatAxiosApi.chatDetail(roomId);
        console.log(rsp.data.roomId);
        // setRoomName(rsp.data.name);
      } catch (error) {
        console.log(error);
      }
    };
    const getViewMessage = async () => {
      try {
        const rsp = await ChatAxiosApi.chatViewMesage(roomId);
        console.log(rsp.data);
        setChatList(rsp.data);
      } catch (error) {
        console.log(error);
      }
    };
    getChatRoom();
    getViewMessage();
  }, []);

  useEffect(() => {
    console.log("방번호 : " + roomId);
    if (!ws.current) {
      ws.current = new WebSocket(Common.DOMAIN + "/ws/chat");
      ws.current.onopen = () => {
        console.log("connected to " + Common.DOMAIN);
        setSocketConnected(true);
      };
    }
    if (socketConnected) {
      ws.current.send(
        JSON.stringify({
          type: "ENTER",
          roomId: roomId,
          sender: sender.nick,
          message: "처음으로 접속 합니다.",
        })
      );
    }
    ws.current.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      console.log("테스트" + data.message);
      setChatList((prevItems) => [...prevItems, data]);
    };
  }, [socketConnected]);

  // 화면 하단으로 자동 스크롤
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatList]);

  return (
    <ChatContainer>
      {/* <ChatHeader>채팅방 {roomName}</ChatHeader> */}
      <MessagesContainer ref={chatContainerRef}>
        {chatList.map((chat, index) => (
          <Div key={index} isSender={chat.sender === sender.nick}>
            <Profile size={`3rem`} src={sender.image}></Profile>
            <Message isSender={chat.sender === sender.nick}>{`${
              chat.sender
            } > ${chat.message} > ${Common.formatDetailDate(
              chat.sentAt
            )}`}</Message>
          </Div>
        ))}
      </MessagesContainer>
      <div>
        <Input
          placeholder="문자 전송"
          value={inputMsg}
          onChange={onChangMsg}
          onKeyUp={onEnterKey}
        />
        <SendButton onClick={onClickMsgSend}>전송</SendButton>
      </div>
      <CloseButton onClick={onClickMsgClose}>채팅 종료 하기</CloseButton>
    </ChatContainer>
  );
};

export default Chatting;
