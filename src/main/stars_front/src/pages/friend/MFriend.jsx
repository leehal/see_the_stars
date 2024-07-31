import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdPersonAddAlt1 } from "react-icons/md";
import { PiXSquare } from "react-icons/pi";
import PartyAxiosApi from "../../api/PartyAxiosApi";
import FriendAxiosApi from "../../api/FriendAxiosApi";
import Profile from "../../component/Profile";
import { useNavigate } from "react-router-dom";
import Common from "../../utils/Common";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 375px) {
    min-width: 375px;
  }
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const TabMenu = styled.div`
  display: flex;
  position: absolute;
  top: 10%;
  height: 60px;
  width: 100%;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  justify-content: center;
`;

const Tab = styled.div`
  display: flex;
  width: 100%;
  font-size: 25px;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  cursor: pointer;
  color: #fff;

  p {
    padding-top: 10px;
    display: flex;
    align-items: center;
    color: #000;
    justify-content: center;
    width: 90%;
    height: 100%;
    text-align: center;

    ${({ active }) =>
      active &&
      `
      border: 2px solid #ff52ae;
    `}
    &:hover {
      background: #d1d1d1;
      color: #fff;
    }
  }

  @media screen and (max-width: 425px) {
    font-size: 20px;
  }
`;

const FriendList = styled.div`
  display: flex;
  position: absolute;
  top: 30%;
  background: #f4eedd;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  border-radius: 30px;
  height: 60%;
  overflow-y: auto;

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
const UserBoxAD = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  padding: 5px;
  background: #fff;
  box-shadow: 3px 3px 8px -4px gray;
  border-radius: 25px;
  color: #000;
  margin-bottom: 10px;
  font-size: 30px;
`;
const UserBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  padding: 5px;
  background: #fff;
  box-shadow: 3px 3px 8px -4px gray;
  border-radius: 25px;
  color: #000;
  margin-bottom: 10px;
  font-size: 30px;

  button {
    border: none;
    font-size: 30px;
    background: none;
    margin: 0 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserName = styled.div`
  font-size: 30px;
  padding-top: 5px;
`;
const UserNameAgree = styled.div`
  font-size: 30px;
  padding-top: 5px;

  @media screen and (max-width: 425px) {
    font-size: 25px;
  }
`;
const BtnAD = styled.div`
  width: 100px;
  display: flex;
  justify-content: space-between;

  button {
    width: 45%;
    border-radius: 10px;
    font-size: 25px;
    padding-top: 10px;
    color: #fff;
    background: #b8b8b8;
    box-shadow: 4px 4px 8px -6px gray;
  }
`;
const SearchInput = styled.input`
  width: 80%;
  position: absolute;
  top: 20%;
  height: 40px;
  border: 2px solid #000;
  background: #999;
  font-size: 30px;
  border-radius: 20px;
  text-align: center;

  &::placeholder {
    position: absolute;
    color: #fff;
    width: 100%;
    height: 60%;
    top: 50%;
    transform: translateY(-50%);
  }

  &:focus {
    background: #fff;
    border: 1px solid #ff52ae;
    outline: none;
  }
`;

const MFriend = ({ closeModal }) => {
  const [allUser, setAllUser] = useState([]);
  const [allFriend, setAllFriend] = useState([]);
  const [allIng, setAllIng] = useState([]);
  const [allAccept, setAllAccept] = useState([]);
  const [searchAll, setSearchAll] = useState("");
  const [searchFriend, setSearchFriend] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingRequests, setPendingRequests] = useState([]);
  const [initialPendingRequests, setInitialPendingRequests] = useState([]);
  const [currentTab, setCurrentTab] = useState("allUsers");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const rspUsers = await PartyAxiosApi.allUsers();
        setAllUser(rspUsers.data);

        const rspFriends = await FriendAxiosApi.allFriends();
        setAllFriend(rspFriends.data);

        const rspIng = await FriendAxiosApi.allIng();
        setAllIng(rspIng.data);

        const rspAccept = await FriendAxiosApi.allAccept();
        setAllAccept(rspAccept.data);

        const initialPending = await FriendAxiosApi.allIng();
        setInitialPendingRequests(initialPending.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllData();
  }, [refresh]);

  useEffect(() => {
    if (!Common.getRefreshToken()) {
      navigate("/login");
    }
  }, [navigate]);

  const onChangeSearchAll = (e) => {
    setSearchAll(e.target.value);
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
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleUserSelect = (user) => {
    // 선택된 유저의 정보를 콘솔에 출력합니다.
    console.log("선택된 유저:", user);
    // 이곳에 선택된 유저에 대한 추가 작업을 수행할 수 있습니다.
  };

  const onClickDelete = async (fno) => {
    try {
      const res = await FriendAxiosApi.friendDelete(fno);
      if (res) {
        alert("친구를 삭제하였습니다.");
        setRefresh((prev) => !prev);
      } else {
        alert("삭제실패");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onClickAgree = async (nick) => {
    try {
      const res = await FriendAxiosApi.friendAgree(nick);
      if (res) {
        alert("친구요청을 수락하였습니다.");
        setRefresh((prev) => !prev);
      } else {
        alert("친구요청을 거절하였습니다.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const renderUsers = (users) => {
    return users.map((user) => (
      <UserBox key={user.nick}>
        <ProfileContainer>
          <Profile size="50px" src={user.image} />
          <UserName>{user.nick}</UserName>
          <button onClick={() => friendApplication(user.nick)}>
            <MdPersonAddAlt1 style={{ fontSize: "30px" }} />
          </button>
        </ProfileContainer>
      </UserBox>
    ));
  };

  const renderFriends = (friends) => {
    return friends
      .filter(
        (friend) =>
          friend.from.includes(searchFriend) || friend.to.includes(searchFriend)
      )
      .map((friend) => (
        <UserBox key={friend.fno}>
          <ProfileContainer>
            <Profile
              size="50px"
              src={
                friend.tf === "FALSE" ? friend.fromProfile : friend.toProfile
              }
            />
            <UserName>
              {friend.tf === "FALSE" ? friend.from : friend.to}
            </UserName>
            <button onClick={() => onClickDelete(friend.fno)}>
              <PiXSquare />
            </button>
          </ProfileContainer>
        </UserBox>
      ));
  };

  const renderPendingRequests = (requests) => {
    return requests.map((friend) => (
      <UserBox key={friend.fno}>
        <ProfileContainer>
          <Profile size="50px" src={friend.fromProfile} />
          <UserName>{friend.to}</UserName>
          <button onClick={() => onClickDelete(friend.fno)}>
            <p style={{ fontSize: "20px" }}>취소</p>
          </button>
        </ProfileContainer>
      </UserBox>
    ));
  };

  const renderAcceptedRequests = (requests) => {
    return requests.map((friend) => (
      <UserBoxAD key={friend.fno}>
        <ProfileContainer>
          <Profile size="50px" src={friend.fromProfile} />
          <UserNameAgree>{friend.from}</UserNameAgree>
          <BtnAD>
            <button onClick={() => onClickAgree(friend.from)}>
              <p>수락</p>
            </button>
            <button onClick={() => onClickDelete(friend.fno)}>
              <p>거절</p>
            </button>
          </BtnAD>
        </ProfileContainer>
      </UserBoxAD>
    ));
  };

  return (
    <Container>
      <Content>
        <TabMenu>
          <Tab
            active={currentTab === "allUsers"}
            onClick={() => {
              setCurrentTab("allUsers");
              setSearchQuery("");
            }}
          >
            <p>모든 유저</p>
          </Tab>
          <Tab
            active={currentTab === "friends"}
            onClick={() => setCurrentTab("friends")}
          >
            <p>친구 목록</p>
          </Tab>
          <Tab
            active={currentTab === "pendingRequests"}
            onClick={() => setCurrentTab("pendingRequests")}
          >
            <p>친구 요청</p>
          </Tab>
          <Tab
            active={currentTab === "acceptedRequests"}
            onClick={() => setCurrentTab("acceptedRequests")}
          >
            <p>친구 수락</p>
          </Tab>
        </TabMenu>
        {currentTab === "allUsers" && (
          <>
            <SearchInput
              type="text"
              placeholder="유저 검색"
              value={searchQuery}
              onChange={handleSearch}
            />
            <FriendList>
              {searchQuery
                ? renderUsers(
                    allUser.filter((user) => user.nick.includes(searchQuery))
                  )
                : null}
            </FriendList>
          </>
        )}
        {currentTab === "friends" && (
          <>
            <SearchInput
              type="text"
              placeholder="친구 검색"
              value={searchFriend}
              onChange={onChangeSearchFriend}
            />
            <FriendList>{renderFriends(allFriend)}</FriendList>
          </>
        )}
        {currentTab === "pendingRequests" && (
          <FriendList>{renderPendingRequests(allIng)}</FriendList>
        )}
        {currentTab === "acceptedRequests" && (
          <FriendList>{renderAcceptedRequests(allAccept)}</FriendList>
        )}
      </Content>
    </Container>
  );
};

export default MFriend;