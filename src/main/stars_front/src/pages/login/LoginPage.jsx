import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import Back from "../../image/loginImg2.jpg";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  @media screen and (max-width: 786px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media screen and (max-width: 425px) {
    background: #da2b70;
  }
`;

const FristBack = styled.div`
  position: relative;
  background-image: url(${Back});
  width: 78%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media screen and (max-width: 425px) {
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Color = styled.div`
  width: 22%;
  background-color: #da2b70;
  height: 100%;

  @media screen and (max-width: 425px) {
    background: none;
  }
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
  right: 15%;
  top: 50%;
  transform: translateY(-50%);
  border: 3px solid black;
  box-shadow: 4px 8px 0 #000, 8px 8px 0 #000;

  @media screen and (max-width: 1920px) {
    right: 10%;
  }
  @media screen and (max-width: 1024px) {
    width: 350px;
  }
  @media screen and (max-width: 425px) {
    width: 100%;
    height: 90%;
    background: #fff;
    right: 0;
    box-shadow: none;
    border-radius: 0;
    border: none;
  }
`;

const Logo = styled.div`
  cursor: pointer;
  position: absolute;
  top: 120px;
  font-size: 3rem;
  font-weight: bold;

  @media screen and (max-width: 425px) {
    transform: ${(props) => (props.isHidden ? "scale(0)" : "scale(1)")};
    transition: transform 0.3s;
  }
`;

const LoginPage = () => {
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const boxRef = useRef(null);

  // Handle focus and blur events
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  useEffect(() => {
    const boxElement = boxRef.current;

    // Function to add event listeners to all inputs
    const addFocusListeners = () => {
      if (boxElement) {
        const inputs = boxElement.querySelectorAll("input, textarea, select");
        inputs.forEach((input) => {
          input.addEventListener("focus", handleFocus);
          input.addEventListener("blur", handleBlur);
        });
      }
    };

    // Function to remove event listeners from all inputs
    const removeFocusListeners = () => {
      if (boxElement) {
        const inputs = boxElement.querySelectorAll("input, textarea, select");
        inputs.forEach((input) => {
          input.removeEventListener("focus", handleFocus);
          input.removeEventListener("blur", handleBlur);
        });
      }
    };

    // Use MutationObserver to detect changes in the box element
    const observer = new MutationObserver(() => {
      removeFocusListeners(); // Clean up old listeners
      addFocusListeners(); // Add new listeners
    });

    if (boxElement) {
      observer.observe(boxElement, { childList: true, subtree: true });
      addFocusListeners(); // Initial setup
    }

    // Cleanup function
    return () => {
      removeFocusListeners();
      if (boxElement) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <Container>
      <FristBack />
      <Box ref={boxRef}>
        <Logo onClick={() => navigate("/")} isHidden={isFocused}>
          별보러 갈래?
        </Logo>
        <Outlet />
      </Box>
      <Color />
    </Container>
  );
};

export default LoginPage;
