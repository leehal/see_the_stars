import styled from "styled-components";
import KakaoLogin from "./KakaoLogin";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const KakaoL = styled.div`
  display: flex;
  width: 100%;
  height: 35%;

  @media screen and (max-width: 425px) {
    height: 50%;
  }
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: none;
  height: 35%;
  background: #ff52ae;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in;
  @media screen and (max-width: 425px) {
    height: 50%;
  }

  &:hover {
    background: #bf00ff;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 50%;
    gap: 10px;
    padding-top: 10px;
    font-size: 30px;
    font-weight: bold;
    @media screen and (max-width: 1024px) {
      font-size: 25px;
    }
    @media screen and (max-width: 425px) {
      font-size: 20px;
    }
  }
`;

const Line = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30%;
  @media screen and (max-width: 425px) {
    display: none;
  }
`;

const SignupBox = styled.div`
  width: 30%;
  height: 35%;
  display: flex;
  font-size: 20px;
  justify-content: center;
  cursor: pointer;
  &:hover {
    color: #bf00ff;
  }
  @media screen and (max-width: 1024px) {
    font-size: 17px;
  }
  @media screen and (max-width: 425px) {
    font-size: 12px;
    height: 25%;
  }
`;
const BeforLogin = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Button
          onClick={() => {
            navigate("login");
          }}
        >
          <div>
            <span>- - -</span>로그인<span>- - -</span>
          </div>
        </Button>
        <KakaoL>
          <KakaoLogin />
        </KakaoL>
        <Line>
          <SignupBox
            onClick={() => {
              navigate("login/find/id");
            }}
          >
            아이디 찾기
          </SignupBox>
          <span>ㅣ</span>
          <SignupBox
            onClick={() => {
              navigate("login/find/pw");
            }}
          >
            비밀번호 찾기
          </SignupBox>
          <span>ㅣ</span>
          <SignupBox
            onClick={() => {
              navigate("login/signup");
            }}
          >
            회원가입
          </SignupBox>
        </Line>
      </Container>
    </>
  );
};
export default BeforLogin;
