import { useContext, useEffect, useState } from "react";
import Profile from "../../component/Profile";
import { useNavigate } from "react-router-dom";
import PartyAxiosApi from "../../api/PartyAxiosApi";
import styled from "styled-components";
import { UserContext } from "../../context/UserStore";
import FriendAxiosApi from "../../api/FriendAxiosApi";

const UserListDiv = styled.div`
  width: 100%;
  height: 200px;
  flex-direction: column;
  border: 1px solid green;
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

const toEmail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 100%;
`;

const Input = styled.input`
  width: 100%;
  color: white;
  background-color: #ff3366; /* 레트로 핑크 */
  border-radius: 5px;
  border: 3px solid black;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 2%;
  text-align: center;
  padding: 2%;
  &:focus {
    border-color: #333;
    outline: none;
  }
  &::placeholder {
    color: white;
  }
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

const PartySave = ({ closeModal }) => {
  const [pname, setPname] = useState("");
  const [toList, settoList] = useState([]);
  const [alluser, setAlluser] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]); // 선택된 유저 상태 관리

  const createParty = async () => {
    if (pname === "") {
      alert("모임 이름을 입력해주세요.");
    } else {
      try {
        const rsp = await PartyAxiosApi.partyCreate(toList, pname);
        if (rsp.data) {
          closeModal();
          setPname("");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const rsp = await FriendAxiosApi.allFriends();
        setAlluser(rsp.data);
        console.log(rsp.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchAllUsers();
  }, []);

  // useEffect(() => {
  //   console.log(pname);
  // }, [pname]);

  const handleUserClick = (user) => {
    if (toList.includes(user.to)) {
      // 이미 선택된 경우, 선택 해제 (배열에서 제거)
      settoList((prevList) => prevList.filter((n) => n !== user.to));
      setSelectedUsers((prevSelected) =>
        prevSelected.filter((to) => to !== user.to)
      );
    } else {
      // 선택되지 않은 경우, 배열에 추가
      settoList((prevList) => [...prevList, user.to]);
      setSelectedUsers((prevSelected) => [...prevSelected, user.to]);
    }
  };

  return (
    <>
      <Input
        type="text"
        onChange={(e) => setPname(e.target.value)}
        placeholder="모임 명"
      />

      <UserListDiv>
        {alluser.map((user) => (
          <UserBox
            key={user.email}
            onClick={() => handleUserClick(user)}
            isSelected={selectedUsers.includes(user.to)}
          >
            <ProfileBox>
              <Profile
                size={`2rem`}
                src={user.img}
                // onClick={() => navigate("/my")}
              />
            </ProfileBox>
            <toEmail>
              <div>{user.to}</div>
            </toEmail>
            {/* <toEmail>
              <div>{user.email}</div>
            </toEmail> */}
          </UserBox>
        ))}
      </UserListDiv>
      <ButtonBox>
        <Button onClick={createParty}>모임 생성</Button>
      </ButtonBox>
    </>
  );
};

export default PartySave;
