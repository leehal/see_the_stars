import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdPersonAddAlt1 } from "react-icons/md";
import { PiXSquare } from "react-icons/pi";
import { PiSquareLogo } from "react-icons/pi";
import PartyAxiosApi from "../../api/PartyAxiosApi";
import FriendAxiosApi from "../../api/FriendAxiosApi";
import Profile from "../../component/Profile";
import { useLocation } from "react-router-dom";

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
`;

const Content = styled.div`
  position: relative;
  width: 60%;
  height: 70%;
  background-color: #fff;
  overflow-y: auto;
  border: 7px solid #000;
  box-shadow: 5px 5px #000;
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
  display: flex;
  border: 3px solid #000;
  font-size: 30px;
  height: 10%;
  padding-left: 10px;
  min-height: 70px;
  background: #ffffff;
  color: #000;

  button {
    position: absolute;
    right: 5%;
    width: 15%;
    height: 60%;
    display: flex;
    border: none;
    background: none;
  }
`;
const FriendProfile = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
`;
const FriendNick = styled.div`
  position: absolute;
  left: 30%;
  display: flex;
  align-items: center;
  padding-top: 5px;
`;
const AgreeBtn = styled.div`
  position: absolute;
  display: flex;
  gap: 10px;
  height: 50%;
  right: 3%;
`;
const OkBtn = styled.div`
  cursor: pointer;
`;
const NoBtn = styled.div`
  cursor: pointer;
`;
const UserBoxAll = styled(UserBox)`
  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  position: relative;
  gap: 20px;
  margin-top: 5px;
  width: 70%;
  border: 3px solid #000;
  font-size: 30px;
  height: 10%;
  padding-left: 10px;
  min-height: 70px;
  color: #000;

  button {
    position: absolute;
    right: 5%;
    width: 10%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;
const ProfileAll = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
`;
const AlluserNick = styled.div`
  position: absolute;
  display: flex;
  padding-top: 5px;
  align-items: center;
  left: 25%;
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

  &:hover {
  }

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
`;

const InputStyled = styled.input`
  width: 80%;
  height: 40px;
  padding-top: 10px;
  margin: 20px;
  border: 3px solid #000;
  background-color: #bf00ff;
  display: flex;
  font-size: 40px;
  justify-content: center;
  align-items: center;
  text-align: center;

  &::placeholder {
    display: flex;
    align-items: center;
    font-size: 30px;
    color: #fff;
  }
  &:focus {
    background: #fff;
    border: 1px solid #88adf1;
    outline: none;
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
    }

    &:focus {
      outline: none;
      background: #fff;
      border: 1px solid #88adf1;
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

  p {
    margin: 10px 0 20px 0;
  }

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
  bottom: 0;
  text-align: center;
  align-items: center;
  color: #fff;
  flex-direction: column;
  /* overflow: hidden; */
  border-top: 3px solid #000;
  border-left: 3px solid #000;

  display: ${(props) => (props.show ? "flex" : "none")};
  p {
    margin: 10px 0 20px 0;
  }

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
`;

const FriendAddBtn = styled.div`
  position: absolute;
  width: 10%;
  height: 7%;
  z-index: 1;
  display: flex;
  justify-content: center;
  transition: all 0.2s ease-in;
  font-size: 30px;
  background: #bf00ff;
  bottom: 5%;
  border: 3px solid #000;
  right: 2%;
  cursor: pointer;
  padding-top: 9px;

  &:hover {
    background: #ff52ae;
    color: #fff;
  }
`;
const FriendAgreeBtn = styled.div`
  position: absolute;
  width: 10%;
  height: 7%;
  z-index: 1;
  display: flex;
  justify-content: center;
  transition: all 0.2s ease-in;
  font-size: 30px;
  background: #bf00ff;
  bottom: 15%;
  border: 3px solid #000;
  right: 2%;
  cursor: pointer;
  padding-top: 9px;

  &:hover {
    background: #ff52ae;
    color: #fff;
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
  position: absolute;
  right: 0;
  top: 2%;
  width: 15%;
  background: #ff52ae;
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
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

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
              <p style={{ color: "#000", fontSize: "30px" }}>
                검색 결과가 없습니다.
              </p>
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
                  <Profile size="60px" src={user.image} />
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
                    <PiXSquare style={{ fontSize: "35px", color: "#000" }} />
                  </button>
                </UserBox>
              ))}
          </FriendBox>
          <FriendAddBtn onClick={toggleFriendAdd}>친구 요청</FriendAddBtn>
          <FriendAdd show={showFriendAdd}>
            <p style={{ color: "#fff", fontSize: "30px" }}>친구 요청 대기</p>
            {allIng.map((friend) => (
              <UserBox key={friend.fno}>
                <Profile size={`2.5rem`} src={friend.toProfile} />
                <div style={{ marginLeft: "15px" }}>{friend.to}</div>
                <button onClick={() => onClickDelete(friend.fno, false)}>
                  <p style={{ fontSize: "25px" }}>취소</p>
                </button>
              </UserBox>
            ))}
            <AddClose onClick={toggleFriendAdd}>
              <PiXSquare style={{ fontSize: "30px", color: "#414141" }} />
            </AddClose>
          </FriendAdd>
          <FriendAgreeBtn onClick={toggleFriendAgree}>친구 수락</FriendAgreeBtn>
          <FriendAgree show={showFriendAgree}>
            <p style={{ color: "#fff", fontSize: "30px" }}>친구 수락 대기</p>
            {allAccept.map((friend) => (
              <UserBox key={friend.fno}>
                <Profile size={`2.5rem`} src={friend.fromProfile} />
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
                    <p style={{ color: "#000", fontSize: "25px" }}>수락</p>
                  </OkBtn>
                  <NoBtn onClick={() => onClickReject(friend.fno)}>
                    <p style={{ color: "#000", fontSize: "25px" }}>거절</p>
                  </NoBtn>
                </AgreeBtn>
              </UserBox>
            ))}
            <AddClose onClick={toggleFriendAgree}>
              <PiXSquare style={{ fontSize: "30px", color: "#414141" }} />
            </AddClose>
          </FriendAgree>
        </CenterMain>
      </Content>
    </Container>
  );
};

export default Friend;
