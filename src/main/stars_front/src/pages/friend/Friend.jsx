import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdPersonAddAlt1 } from "react-icons/md";
import { PiXSquare } from "react-icons/pi";
import { PiSquareLogo } from "react-icons/pi";
import PartyAxiosApi from "../../api/PartyAxiosApi";
import FriendAxiosApi from "../../api/FriendAxiosApi";
import Profile from "../../component/Profile";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Common from "../../utils/Common";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  cursor: default;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 375px) {
    display: flex;
  }
`;

const Content = styled.div`
  position: relative;
  width: 60%;
  height: auto;
  aspect-ratio: 10 / 6;
  background-color: #fff;
  overflow-y: auto;
  border: 7px solid #000;
  box-shadow: 5px 5px #000;

  @media screen and (max-width: 1024px) {
    width: 80%;
    height: auto;
    aspect-ratio: 10 / 7;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (max-width: 375px) {
    min-width: 375px;
  }
`;
const ContentLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  width: 100%;
  height: 10%;
  z-index: 999;
  border-bottom: 5px solid #000;
  background: #bf00ff;
`;

const CenterMain = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const UserBox = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  position: relative;
  margin-top: 5px;
  width: 95%;
  justify-content: space-between;
  display: flex;
  aspect-ratio: 10 / 5;
  border: 3px solid #000;
  font-size: 30px;

  padding-left: 10px;
  background: #ffffff;
  color: #000;

  button {
    display: flex;
    border: none;
    font-size: 30px;
    background: none;
    @media screen and (max-width: 425px) {
      font-size: 15px;
    }
  }
  @media screen and (max-width: 768px) {
    height: 60px;
  }
  @media screen and (max-width: 425px) {
    height: 40px;
    font-size: 13px;
  }
`;
const AddBoxUser = styled.div`
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 425px) {
  }
`;
const AgreeBoxUser = styled.div`
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  /* background: red; */
`;
const FriendProfile = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
  @media screen and (max-width: 425px) {
    font-size: 13px;
    padding: 0;
  }
`;
const FriendNick = styled.div`
  padding-top: 10px;
  @media screen and (max-width: 768px) {
    font-size: 20px;
    padding: 0;
  }
  @media screen and (max-width: 425px) {
    font-size: 13px;
    padding: 0;
  }
`;
const AgreeBtn = styled.div`
  display: flex;
  gap: 5px;
  width: 40%;
  /* background: red; */
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const OkBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 50%;
  height: 100%;

  p {
    padding-top: 10px;
    font-size: 25px;

    @media screen and (max-width: 425px) {
      font-size: 15px;
    }
  }
`;
const NoBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  /* background: red; */
  height: 100%;
  cursor: pointer;

  p {
    padding-top: 10px;
    font-size: 25px;
    @media screen and (max-width: 425px) {
      font-size: 15px;
    }
  }
`;
const UserBoxAll = styled(UserBox)`
  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  position: relative;
  gap: 20px;
  aspect-ratio: 10 / 2;
  margin-top: 5px;
  justify-content: space-between;
  width: 70%;
  /* background: red; */
  border: 3px solid #000;
  font-size: 30px;
  height: auto;
  /* padding-left: 10px;
  min-height: 70px; */
  color: #000;

  button {
    width: 15%;
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  @media screen and (max-width: 425px) {
    font-size: 20px;
  }
`;
const ProfileAll = styled.div`
  /* position: absolute; */
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const AllProfile = styled.div``;
const AlluserNick = styled.div`
  position: absolute;
  display: flex;
  padding-top: 5px;
  align-items: center;
  left: 40%;
`;
const AddPriofile = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const AgreePriofile = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const AllUser = styled.div`
  display: flex;
  position: absolute;
  left: 55%;
  transform: translate(-50%);
  width: 55%;
  top: 15%;
  align-items: center;
  flex-direction: column;
  text-align: center;
  height: 70%;
  background: #fff;
  overflow-y: auto;
  transition: 0.3s all;
  border: 3px solid #000;
  box-shadow: 2px 2px #000;

  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c0c0c0;
    border-radius: 0;
    border: 2px solid #808080;
    box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #000;
  }

  &::-webkit-scrollbar-track {
    background: #fff;
    border: 1px solid #808080;
    box-shadow: inset 1px 1px 0 #000;
  }

  &::-webkit-scrollbar-corner {
    background: #fff;
  }

  @media screen and (max-width: 1024px) {
    width: 40%;
  }
  @media screen and (max-width: 768px) {
    width: 45%;
  }
  @media screen and (max-width: 425px) {
    width: 50%;
  }
`;

const InputStyled = styled.input`
  width: 80%;
  height: 40px;
  padding-top: 10px;
  margin: 20px;
  border: 3px solid #000;
  background-color: #ff52ae;
  display: flex;
  font-size: 40px;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media screen and (max-width: 425px) {
    padding: 0;
    height: 30px;
    font-size: 15px;
  }
  &::placeholder {
    display: flex;
    align-items: center;
    font-size: 30px;
    color: #fff;

    @media screen and (max-width: 425px) {
      font-size: 18px;
    }
  }
  &:focus {
    background: #fff;
    border: 1px solid #88adf1;
    outline: none;
  }

  p {
    @media screen and (max-width: 425px) {
      font-size: 10px;
    }
  }
`;
const FriendBox = styled.div`
  position: absolute;
  width: 22%;
  height: 85%;
  background: #ff52ae;
  box-shadow: 5px 9px 11px -5px gray;
  text-align: center;
  border-right: 5px solid #000;
  border-top: 5px solid #000;
  overflow-y: auto;
  display: flex;
  bottom: 0;
  align-items: center;
  flex-direction: column;

  @media screen and (max-width: 1024px) {
    width: 30%;
  }
  @media screen and (max-width: 768px) {
    width: 26%;
  }

  input {
    margin-top: 10px;
    width: 90%;
    height: 40px;
    font-size: 35px;
    text-align: center;
    border: 3px solid #000;
    padding-top: 7px;

    &::placeholder {
      font-size: 30px;
      color: #000;
      @media screen and (max-width: 768px) {
        font-size: 25px;
      }
      @media screen and (max-width: 425px) {
        font-size: 18px;
      }
    }

    &:focus {
      outline: none;
      background: #fff;
      border: 1px solid #88adf1;
    }
    @media screen and (max-width: 768px) {
      font-size: 30px;
    }
    @media screen and (max-width: 425px) {
      font-size: 15px;
      height: 30px;
    }
  }
`;
const FriendAgree = styled.div`
  position: absolute;
  width: 25%;
  right: 0;
  bottom: 0;
  height: 50%;
  z-index: 2;
  overflow: hidden;
  background: #ff52ae;
  overflow-y: auto;
  text-align: center;
  align-items: center;
  color: #fff;
  flex-direction: column;
  /* overflow: hidden; */
  border-top: 3px solid #000;
  border-left: 3px solid #000;

  display: ${(props) => (props.show ? "flex" : "none")};

  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c0c0c0;
    border-radius: 0;
    border: 2px solid #808080;
    box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #000;
  }

  &::-webkit-scrollbar-track {
    background: #fff;
    border: 1px solid #808080;
    box-shadow: inset 1px 1px 0 #000;
  }

  &::-webkit-scrollbar-corner {
    background: #fff;
  }
  @media screen and (max-width: 1024px) {
    width: 30%;
  }
  @media screen and (max-width: 425px) {
    width: 40%;
  }
`;
const AgreeTitleText = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  justify-content: center;
  margin: 10px 0;
  align-items: center;
  p {
    display: inline-block;
    width: 100%;
    height: 50%;
    font-size: 30px;

    @media screen and (max-width: 425px) {
      width: 100%;
      font-size: 18px;
    }
  }
`;

const FriendAdd = styled.div`
  position: absolute;
  width: 25%;
  right: 0;
  z-index: 2;
  bottom: 0;
  height: 50%;
  background: #ff52ae;
  overflow-y: auto;
  overflow-x: hidden;
  bottom: 0;
  text-align: center;
  align-items: center;
  color: #fff;
  flex-direction: column;
  /* overflow: hidden; */
  border-top: 3px solid #000;
  border-left: 3px solid #000;

  display: ${(props) => (props.show ? "flex" : "none")};

  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c0c0c0;
    border-radius: 0;
    border: 2px solid #808080;
    box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #000;
  }

  &::-webkit-scrollbar-track {
    background: #fff;
    border: 1px solid #808080;
    box-shadow: inset 1px 1px 0 #000;
  }

  &::-webkit-scrollbar-corner {
    background: #fff;
  }
  @media screen and (max-width: 1024px) {
    width: 30%;
    font-size: 30px;
  }
  @media screen and (max-width: 425px) {
    width: 40%;
    font-size: 20px;
  }
`;
const FriendTitleText = styled.div`
  display: flex;
  width: 100%;
  height: 10%;
  margin: 10px 0;
  justify-content: center;
  align-items: center;

  p {
    display: inline-block;
    width: 100%;
    height: 50%;
    font-size: 30px;
    @media screen and (max-width: 425px) {
      width: 100%;
      font-size: 18px;
    }
  }
`;
const ButtonContainer = styled.div`
  width: 15%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  gap: 20px;
  right: 0;
  bottom: 0;

  @media screen and (max-width: 425px) {
    width: 20%;
  }
`;
const FriendAddBtn = styled.div`
  display: flex;
  width: 90%;
  height: 30%;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #d45353, #dd7777);

  border: 2px solid #fff;
  border-top-color: #ccc;
  border-left-color: #ccc;
  border-right-color: #333;
  border-bottom-color: #333;
  box-shadow: 1px 1px 0 0 #000;
  cursor: pointer;
  outline: none;
  &:active {
    border-top-color: #333;
    border-left-color: #333;
    border-right-color: #ccc;
    border-bottom-color: #ccc;
    background: linear-gradient(to bottom, #d45353, #dd7777);
  }

  p {
    font-size: 25px;
    color: #fff;
    padding-top: 10px;
    text-align: center;
    @media screen and (max-width: 425px) {
      font-size: 20px;
    }
    @media screen and (max-width: 375px) {
      font-size: 18px;
    }
  }
  @media screen and (max-width: 425px) {
    width: 85%;
  }
`;
const FriendAgreeBtn = styled.div`
  display: flex;
  width: 90%;
  height: 30%;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #d45353, #dd7777);

  border: 2px solid #fff;
  border-top-color: #ccc;
  border-left-color: #ccc;
  border-right-color: #333;
  border-bottom-color: #333;
  box-shadow: 1px 1px 0 0 #000;
  cursor: pointer;
  outline: none;
  &:active {
    border-top-color: #333;
    border-left-color: #333;
    border-right-color: #ccc;
    border-bottom-color: #ccc;
    background: linear-gradient(to bottom, #d45353, #dd7777);
  }

  p {
    color: #fff;
    font-size: 25px;
    padding-top: 10px;
    text-align: center;
    @media screen and (max-width: 425px) {
      font-size: 20px;
    }
    @media screen and (max-width: 375px) {
      font-size: 18px;
    }
  }

  @media screen and (max-width: 425px) {
    width: 85%;
  }
`;

const CloseButton = styled.button`
  width: 5%;
  height: 100%;
  z-index: 99;
  border: none;
  display: flex;

  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: none;
`;

const StyledPiXSquare = styled(PiXSquare)`
  font-size: 70px;
  color: #000;
  transition: 0.3s ease;
`;
const FullButton = styled.button`
  width: 5%;
  height: 100%;
  z-index: 99;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: none;
`;
const AddClose = styled.button`
  width: 100%;
  display: flex;
  background: #bf00ff;
  justify-content: end;
  border: none;
  cursor: pointer;
`;

const Friend = ({ closeModal }) => {
  const [allUser, setAllUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [allFriend, setAllFriend] = useState([]);
  const [allIng, setAllIng] = useState([]);
  const [allAccept, setAllAccept] = useState([]);
  const [searchAll, setSearchAll] = useState("");
  const [searchFriend, setSearchFriend] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [showFilteredUsers, setShowFilteredUsers] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [initialPendingRequests, setInitialPendingRequests] = useState([]);
  const [showFriendAdd, setShowFriendAdd] = useState(false);
  const [showFriendAgree, setShowFriendAgree] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [modalFriendData, setModalFriendData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const fetchFriendRequests = async () => {
    try {
      const res = await FriendAxiosApi.allAccept();
      const friendRequests = res.data;
      if (friendRequests.length > 0) {
        setModalFriendData(friendRequests[0]);
        setShowRequestModal(true);
      }
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  };

  useEffect(() => {
    fetchFriendRequests();
  }, [location]);

  const onClickAgree = async (nick) => {
    try {
      const res = await FriendAxiosApi.friendAgree(nick);
      if (res) {
        alert("친구요청을 수락하였습니다.");
        setShowRequestModal(false);
        setRefresh((prev) => !prev);
        fetchFriendRequests();
      } else {
        alert("친구요청을 거절하였습니다.");
        setShowRequestModal(false);
        fetchFriendRequests();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onClickReject = async (fno) => {
    try {
      const res = await FriendAxiosApi.friendDelete(fno);
      if (res) {
        alert("친구요청을 거절하였습니다.");
        setShowRequestModal(false);
        fetchFriendRequests();
        setRefresh((prev) => !prev);
      } else {
        alert("친구요청을 거절하지 못했습니다.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const rspUsers = await PartyAxiosApi.allUsers();
        setAllUser(rspUsers.data);

        const rspFriends = await FriendAxiosApi.allFriends();
        console.log("친구목록" + rspFriends.data);
        setAllFriend(rspFriends.data);

        const rspIng = await FriendAxiosApi.allIng();
        console.log(rspIng.data);
        setAllIng(rspIng.data);

        const rspAccept = await FriendAxiosApi.allAccept();
        console.log("수락중" + rspAccept.data);
        setAllAccept(rspAccept.data);

        // 초기 친구 신청 목록 설정
        const initialPending = await FriendAxiosApi.allIng();
        setInitialPendingRequests(initialPending.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllData();
  }, [refresh]);

  useEffect(() => {
    if (searchAll === "") {
      setFilteredUsers([]);
      setShowFilteredUsers(false);
    } else {
      const filtered = allUser.filter(
        (user) =>
          user.nick.toLowerCase().includes(searchAll.toLowerCase()) &&
          !isPending(user.nick)
      );
      setFilteredUsers(filtered);
      setShowFilteredUsers(true);
    }
  }, [searchAll, allUser, initialPendingRequests]);

  const isPending = (nick) => {
    return initialPendingRequests.some((req) => req.to === nick);
  };

  const onChangeSearchAll = (e) => {
    const value = e.target.value;
    setSearchAll(value);
    setShowFilteredUsers(value !== "");
  };

  const onChangeSearchFriend = (e) => {
    setSearchFriend(e.target.value);
  };

  const friendApplication = async (nick) => {
    try {
      const existingRequest = pendingRequests.find((req) => req.to === nick);
      if (existingRequest) {
        alert("이미 친구 신청을 보냈습니다.");
        return;
      }
      if (isPending(nick)) {
        alert("이 사용자는 이미 친구 신청을 보낸 상태입니다.");
        return;
      }
      setIsRequesting(true);
      const res = await FriendAxiosApi.friendApplication(nick);
      if (res) {
        alert("친구신청 메세지를 보냈습니다.");
        setPendingRequests([...pendingRequests, { to: nick }]);
        setRefresh((prev) => !prev);
      } else {
        alert("신청실패");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsRequesting(false);
    }
  };

  const onClickDelete = async (
    fno,
    isRequestReject = false,
    isRequestCancel = false
  ) => {
    try {
      const res = await FriendAxiosApi.friendDelete(fno);
      setRefresh((prev) => !prev);
      if (res) {
        if (isRequestReject) {
          alert("친구요청을 거절하였습니다.");
          setRefresh((prev) => !prev);
        } else if (isRequestCancel) {
          alert("친구신청을 취소하였습니다.");
          setRefresh((prev) => !prev);
        } else {
          alert("친구를 삭제하였습니다.");
        }
      } else {
        alert("삭제실패");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const toggleFriendAdd = () => {
    setShowFriendAdd(!showFriendAdd);
    setRefresh((prev) => !prev);
  };
  const toggleFriendAgree = () => {
    setShowFriendAgree(!showFriendAgree);
    setRefresh((prev) => !prev);
  };

  const closeFriendM = (e) => {
    e.stopPropagation();
    closeModal();
  };
  const FullFriendM = (e) => {
    e.stopPropagation();
    closeModal();
  };

  return (
    <Container onClick={(e) => e.stopPropagation()}>
      <Content>
        <ContentLine>
          <FullButton onClick={FullFriendM}>
            <PiSquareLogo style={{ fontSize: "63px", color: "#000" }} />
          </FullButton>
          <CloseButton onClick={closeFriendM}>
            <StyledPiXSquare />
          </CloseButton>
        </ContentLine>
        <CenterMain>
          <AllUser>
            <InputStyled
              type="text"
              onChange={onChangeSearchAll}
              placeholder="검색"
            />
            {searchAll !== "" && filteredUsers.length === 0 && (
              <p style={{ color: "#000" }}>검색 결과가 없습니다.</p>
            )}
            {(searchAll === "" ? allUser : filteredUsers).map((user) => (
              <UserBoxAll
                key={user.nick}
                show={
                  showFilteredUsers &&
                  user.nick.toLowerCase().includes(searchAll.toLowerCase())
                }
                isAdded={
                  !allFriend.some(
                    (friend) =>
                      (friend.tf === "FALSE" ? friend.from : friend.to) ===
                      user.nick
                  )
                }
              >
                <ProfileAll>
                  <AllProfile>
                    <Profile size="50px" src={user.image} />
                  </AllProfile>
                  {/* {handleResize(user)} */}
                </ProfileAll>
                <AlluserNick>{user.nick}</AlluserNick>
                {!allFriend.some(
                  (friend) =>
                    (friend.tf === "FALSE" ? friend.from : friend.to) ===
                    user.nick
                ) && (
                  <>
                    {pendingRequests.some((req) => req.to === user.nick) ? (
                      <button>
                        <MdPersonAddAlt1
                          style={{
                            fontSize: "30px",
                            color: "white",
                          }}
                        />
                      </button>
                    ) : (
                      <button onClick={() => friendApplication(user.nick)}>
                        <MdPersonAddAlt1
                          style={{
                            fontSize: "30px",
                          }}
                        />
                      </button>
                    )}
                  </>
                )}
              </UserBoxAll>
            ))}
          </AllUser>
          <FriendBox>
            <input
              type="text"
              onChange={onChangeSearchFriend}
              placeholder="친구검색"
            />
            {allFriend
              .filter(
                (friend) =>
                  friend.from.includes(searchFriend) ||
                  friend.to.includes(searchFriend)
              )
              .map((friend) => (
                <UserBox key={friend.fno}>
                  <FriendProfile>
                    <Profile
                      size={`50px`}
                      src={
                        friend.tf === `FALSE`
                          ? friend.fromProfile
                          : friend.toProfile
                      }
                    />
                  </FriendProfile>
                  <FriendNick>
                    {friend.tf === `FALSE` ? friend.from : friend.to}
                  </FriendNick>
                  <button onClick={() => onClickDelete(friend.fno, false)}>
                    <PiXSquare style={{}} />
                  </button>
                </UserBox>
              ))}
          </FriendBox>
          <ButtonContainer>
            <FriendAddBtn onClick={toggleFriendAdd}>
              <p>친구 요청</p>
            </FriendAddBtn>
            <FriendAgreeBtn onClick={toggleFriendAgree}>
              <p> 친구 수락</p>
            </FriendAgreeBtn>
          </ButtonContainer>
          <FriendAdd show={showFriendAdd}>
            <AddClose onClick={toggleFriendAdd}>
              <PiXSquare style={{ fontSize: "30px", color: "#414141" }} />
            </AddClose>
            <FriendTitleText>
              <p style={{ color: "#fff" }}>친구 요청 대기</p>
            </FriendTitleText>
            {allIng.map((friend) => (
              <AddBoxUser>
                <UserBox key={friend.fno}>
                  <AddPriofile>
                    <Profile size={`3rem`} src={friend.fromProfile} />
                  </AddPriofile>
                  <div style={{}}>{friend.to}</div>
                  <button onClick={() => onClickDelete(friend.fno, false)}>
                    <p style={{ fontSize: "20px", paddingRight: "5px" }}>
                      취소
                    </p>
                  </button>
                </UserBox>
              </AddBoxUser>
            ))}
          </FriendAdd>

          <FriendAgree show={showFriendAgree}>
            <AddClose onClick={toggleFriendAgree}>
              <PiXSquare style={{ fontSize: "30px", color: "#414141" }} />
            </AddClose>
            <AgreeTitleText>
              <p style={{ color: "#fff" }}>친구 수락 대기</p>
            </AgreeTitleText>
            {allAccept.map((friend) => (
              <AgreeBoxUser>
                <UserBox key={friend.fno}>
                  <AgreePriofile>
                    <Profile size={`3rem`} src={friend.fromProfile} />
                  </AgreePriofile>
                  <div
                    style={{
                      fontSize: "25px",
                      marginLeft: "10px",
                      marginTop: "10px",
                    }}
                  >
                    {friend.from}
                  </div>
                  <AgreeBtn>
                    <OkBtn onClick={() => onClickAgree(friend.from)}>
                      <p>수락</p>
                    </OkBtn>
                    <NoBtn onClick={() => onClickReject(friend.fno)}>
                      <p>거절</p>
                    </NoBtn>
                  </AgreeBtn>
                </UserBox>
              </AgreeBoxUser>
            ))}
          </FriendAgree>
        </CenterMain>
      </Content>
    </Container>
  );
};

export default Friend;
