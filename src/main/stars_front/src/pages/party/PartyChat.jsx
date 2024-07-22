import styled from "styled-components";
import Profile from "../../component/Profile";
import Common from "../../utils/Common";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatAxiosApi from "../../api/ChatAxiosApi";
import MyAxiosApi from "../../api/MyAxiosApi";

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 90%;
  overflow-y: auto;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background-color: white;
  padding: 10px;
  border: 4px solid black;
`;

const Message = styled.div`
  width: 100%;
  padding: 5px;
  /* margin-left: 10px; */
  border-radius: 10px;
  background-color: ${(props) => (props.isSender ? "#DCF8C6" : "#E0E0E0")};
  border: ${(props) =>
    props.isSender ? "1px solid #DCF8C6" : "1px solid #E0E0E0"};
  position: relative;
  word-break: break-word;
  align-self: ${(props) => (props.isSender ? "flex-end" : "flex-start")};
`;

const Input = styled.input`
  padding: 5px 10px;
  width: 100%;
  /* border-radius: 4px; */
  background-color: #3f3f3f;
  border: 1px solid #000;
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
`;

const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  /* border-radius: 8px; */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* background-color: #ff3366; */
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  ${(props) =>
    props.isSender ? "flex-direction: row-reverse;" : "flex-direction: row;"}
  margin-bottom: 10px;
`;

const ChatHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #bf00ff; */
  width: 100%;
`;

const ChatFoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;

const Sender = styled.p`
  /* font-weight: bold; */
  font-size: 1rem;
  color: #000;
`;

const Msg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: #000;
  font-weight: bold;
  /* width: 200px; */
`;

const MsgBox = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

const PartyChat = () => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [inputMsg, setInputMsg] = useState("");
  const [chatList, setChatList] = useState([]);
  const [sender, setSender] = useState("");
  // const [chatList, setChatList] = useState([]);
  const { roomId } = useParams();
  // const [sender, setSender] = useState("");
  // const [roomName, setRoomName] = useState(""); // 채팅방 이름
  const ws = useRef(null);
  //   const navigate = useNavigate(); // useNavigate 훅 추가

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

  const goChatMsg = (e) => {
    if (e.key === "Enter") {
      try {
        onClickMsgSend(e);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onClickMsgSend = (e) => {
    if (e.key === "Enter") {
      const MessageSave = async (roodId, sender, message) => {
        const rsp = await ChatAxiosApi.chatMessageSave(roodId, sender, message);
        setInputMsg("");
      };
      ws.current.send(
        JSON.stringify({
          type: "TALK",
          roomId: roomId,
          sender: sender.nick,
          image: sender.image,
          message: inputMsg,
        })
      );
      MessageSave(roomId, sender.nick, inputMsg);
      setInputMsg("");
      console.log(`sender : ${sender}`);
      console.log(`inputMsg : ${inputMsg}`);
      console.log(`roomId : ${roomId}`);
    }
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
        console.log("확인");
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
    // console.log("방번호 : " + roomId);
    if (!ws.current) {
      ws.current = new WebSocket("/ws/chat");
      ws.current.onopen = () => {
        console.log("connected to ");
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
            {chat.sender !== sender.nick && (
              <Profile size={`2rem`} src={chat.image} />
            )}
            <MsgBox>
              {chat.sender !== sender.nick && (
                <ChatHead>
                  <Sender>{`${chat.sender}`}</Sender>
                </ChatHead>
              )}
              <Message isSender={chat.sender === sender.nick}>
                <Msg>{` ${chat.message} `}</Msg>
              </Message>
              <ChatFoot>
                <Sender>
                  {Common.formatDetailDate(chat.sentAt).substring(-7)}
                </Sender>
              </ChatFoot>
            </MsgBox>
          </Div>
        ))}
      </MessagesContainer>

      <div>
        <Input
          placeholder="문자 전송"
          value={inputMsg}
          onChange={onChangMsg}
          onKeyUp={onEnterKey}
          onKeyDown={goChatMsg}
        />
        {/* <SendButton onClick={onClickMsgSend}>전송</SendButton> */}
      </div>
      {/* <CloseButton onClick={onClickMsgClose}>채팅 종료 하기</CloseButton> */}
    </ChatContainer>
  );
};
export default PartyChat;
