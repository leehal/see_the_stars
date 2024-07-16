import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import Back from "../../image/loginImg2.jpg";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  /* overflow: hidden; */
`;
const FristBack = styled.div`
  position: relative;
  background-image: url(${Back});
  width: 78%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
const Color = styled.div`
  width: 22%;
  background-color: #da2b70;
  height: 100%;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 400px;
  height: 700px;
  background-color: white;
  border-radius: 15px;
  right: 200px;
  bottom: 40px;
  border: 3px solid black;
  box-shadow: 4px 8px 0 #000, 8px 8px 0 #000; /* 그림자 효과 추가 */
`;

const Logo = styled.div`
  position: absolute;
  cursor: pointer;
  top: 100px;
  font-size: 3rem;
  font-weight: bold;
`;
const AnimatedContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <FristBack />
        <Box>
          <Logo onClick={() => navigate("/")}>별보러 갈래?</Logo>
          <Outlet />
        </Box>
        <Color />
      </Container>
    </>
  );
};

export default LoginPage;
