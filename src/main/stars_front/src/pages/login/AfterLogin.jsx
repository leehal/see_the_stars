import { useContext, useEffect, useState } from "react";
import MyAxiosApi from "../../api/MyAxiosApi";
import Profile from "../../component/Profile";
import styled from "styled-components";
import { MdLogout } from "react-icons/md";
import { UserContext } from "../../context/UserStore";
import { useNavigate } from "react-router-dom";
import Common from "../../utils/Common";

const Box = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  height: 100%;
  /* background: blue; */
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Cdiv = styled.div`
  display: flex;
  width: 50%;
  font-size: 20px;
  font-weight: bold;
  flex-direction: column;
  :first-child {
    font-weight: bold;
    font-size: 30px;
    cursor: pointer;

    @media screen and (max-width: 1350px) {
      font-size: 25px;
    }
    @media screen and (max-width: 425px) {
      display: flex;
      flex-direction: row;
      font-size: 20px;
    }
  }
`;
const AddBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  @media screen and (max-width: 425px) {
    gap: 5px;
  }
`;

const LogoutButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
  height: 30%;
  font-size: 20px;
  border: 3px solid #000;
  cursor: pointer;
  &:hover {
    color: #bf00ff;
  }

  span {
    padding-top: 5px;
  }

  @media screen and (max-width: 768px) {
    width: 80%;
    height: 20%;
  }
`;

const AfterLogin = ({ setRefresh }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  // const [profile, setProfile] = useState();
  // const [id, setId] = useState();

  const onClickLogout = () => {
    alert("로그아웃 됬습니다");
    localStorage.clear();
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    const memberDetail = async () => {
      try {
        const res = await MyAxiosApi.memberDetail();
        console.log(res.data);
        if (res.data) {
          setUser(res.data);
          // setProfile(res.data.image);
          // setId(res.data.mid);
          // setNick(res.data.nick);
        } else {
          console.log("데이터 없음");
        }
      } catch (e) {
        console.log(e);
      }
    };
    memberDetail();
  }, []);

  return (
    <>
      <Box>
        <AddBox>
          <Profile
            size={`4rem`}
            border={`3px solid #000`}
            src={user?.image}
            onClick={() => navigate("my")}
          ></Profile>

          <Cdiv>
            <span onClick={() => navigate("my")}>{user?.nick}님</span>
            <span>{user?.mid}</span>
          </Cdiv>
        </AddBox>
        <LogoutButton onClick={onClickLogout}>
          <span>로그아웃</span> <MdLogout />
        </LogoutButton>
      </Box>
    </>
  );
};
export default AfterLogin;
