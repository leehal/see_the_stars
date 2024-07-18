import styled from "styled-components";
import KakaoLogin from "./KakaoLogin";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 425px) {
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: none;

  height: 40%;
  background: #ff52ae;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in;

  &:hover {
    background: #bf00ff;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 30%;
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
  height: 40%;

  @media screen and (max-width: 425px) {
    width: 100%;
    height: 65%;
  }
`;

const SignupBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 20%;
  font-size: 20px;
  padding-top: 5px;
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
        <div>
          <KakaoLogin />
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
        </div>
      </Container>
    </>
  );
};
export default BeforLogin;
