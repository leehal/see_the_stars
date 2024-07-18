import { useEffect, useState } from "react";
import Profile from "../../component/Profile";
import { useNavigate } from "react-router-dom";
import PartyAxiosApi from "../../api/PartyAxiosApi";
import styled from "styled-components";

const UserListDiv = styled.div`
  width: 100%;
  height: 200px;
  flex-direction: column;
  border: 3px solid #000;
  overflow-y: auto;
`;

const UserBox = styled.div`
  display: flex;
  width: 100%;
  height: 25%;
  background-color: ${({ isSelected }) =>
    isSelected ? "pink" : "white"}; // 선택된 경우 핑크색
  &:hover {
    background-color: yellowgreen;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;
`;

const NickEmail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 100%;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button`
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  background-color: #ff3366;
  padding: 0% 2%;
  margin-top: 3%;
  text-align: center;
  border: 3px solid #000;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`;

const PartyUpdate = ({ closeModal, pno, setPno, memberList, lend }) => {
  const [nickList, setNickList] = useState([]);
  const [alluser, setAlluser] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]); // 선택된 유저 상태 관리

  const updateParty = async () => {
    try {
      const rsp = await PartyAxiosApi.partyMemberAdd(pno, nickList);
      if (rsp.data) {
        closeModal();
        setPno(undefined);
        lend((prev) => !prev);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const rsp = await PartyAxiosApi.allUsers();
        const memberIds = memberList.map((member) => member.nick);

        setAlluser(rsp.data.filter((user) => !memberIds.includes(user.nick)));
      } catch (e) {
        console.log(e);
      }
    };
    fetchAllUsers();
  }, []);

  const handleUserClick = (user) => {
    if (nickList.includes(user.nick)) {
      // 이미 선택된 경우, 선택 해제 (배열에서 제거)
      setNickList((prevList) => prevList.filter((n) => n !== user.nick));
      setSelectedUsers((prevSelected) =>
        prevSelected.filter((nick) => nick !== user.nick)
      );
    } else {
      // 선택되지 않은 경우, 배열에 추가
      setNickList((prevList) => [...prevList, user.nick]);
      setSelectedUsers((prevSelected) => [...prevSelected, user.nick]);
    }
  };

  return (
    <>
      <UserListDiv>
        {alluser.map((user) => (
          <UserBox
            key={user.email}
            onClick={() => handleUserClick(user)}
            isSelected={selectedUsers.includes(user.nick)}
          >
            <ProfileBox>
              <Profile
                size={`2rem`}
                src={user.image}
                // onClick={() => navigate("/my")}
              />
            </ProfileBox>
            <NickEmail>
              <div>{user.nick}</div>
            </NickEmail>
            <NickEmail>
              <div>{user.email}</div>
            </NickEmail>
          </UserBox>
        ))}
      </UserListDiv>
      <ButtonBox>
        <Button onClick={updateParty}>인원 추가</Button>
      </ButtonBox>
    </>
  );
};

export default PartyUpdate;
