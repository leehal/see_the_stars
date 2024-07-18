import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Friend from "../pages/friend/Friend";
import LogoImg from "../image/LogoBPr.png";

const StyledHeader = styled.div`
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  background: #c33740;
  align-items: center;
  overflow: hidden;
  justify-content: center;
  z-index: 9;
  gap: 5%;
  top: 0;
  font-size: 30px;
  width: 100%;
  height: 14vh;

  @media screen and (max-width: 768px) {
    height: 8vh;
    color: rgba(0, 0, 0, 0);
    & > * {
      visibility: hidden;
    }
  }
  @media screen and (max-width: 375px) {
    min-width: 375px;
  }
`;

const Logo = styled.div`
  position: absolute;
  left: 15%;
  width: 10%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 3%;
    left: 10%;
    width: 50%;
    height: 17%;
  }
`;

const Div = styled.div`
  color: #fff;
  cursor: pointer;
  height: 100%;
  display: flex;
  padding-top: 10px;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #000;
    font-weight: bold;
  }
`;

const HamberGerContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-350px")};
  width: 300px;
  height: 100vh;
  background: #c33740;
  transition: right 300ms;
  overflow: hidden;
  z-index: 1200;
`;
const TureBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  cursor: default;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HamberGerMenu = styled.div`
  display: flex;
  background: yellow;
  justify-content: center;
  ul {
    position: absolute;
    top: 25%;
    width: 80%;
    height: 50%;
    list-style: none;
    display: flex;

    flex-direction: column;
  }

  li {
    cursor: pointer;
    margin: 20px 0;
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    transition: all 0.5s ease-in;
    font-size: 25px;
    color: #fff;

    &:hover {
      color: #000;
      font-weight: bold;
      background: #8f3339;
    }
  }
`;

const MobileHeader = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    right: 0;
    top: 0;
    margin: 12px 10px 0 0;

    z-index: 999;
  }

  input[type="checkbox"] {
    display: none;
  }

  label {
    position: relative;
    display: block;
    width: 50px;
    height: 40px;

    cursor: pointer;
    z-index: 9999;
  }

  label > span {
    position: absolute;
    display: block;
    width: 100%;
    height: 7px;
    background: #000;
    border-radius: 5px;
    transition: transform 300ms, opacity 0ms;
  }

  label > span:nth-child(1) {
    top: 0;
  }

  input[type="checkbox"]:checked + label > span:nth-child(1) {
    top: 50%;
    transform: translate(0, -50%) rotate(45deg);
  }

  label > span:nth-child(2) {
    top: 50%;
    transform: translate(0, -50%);
  }

  input[type="checkbox"]:checked + label > span:nth-child(2) {
    opacity: 0;
  }

  label > span:nth-child(3) {
    bottom: 0;
  }

  input[type="checkbox"]:checked + label > span:nth-child(3) {
    top: 50%;
    transform: translate(0, -50%) rotate(-45deg);
  }
`;

const Header = () => {
  const [modalFriend, setModalFriend] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleFriendModal = () => {
    setModalFriend(!modalFriend);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (isOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [isOpen]);

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  if (location.pathname.includes("/login")) {
    return null;
  }
  const onClickTrip = (path) => {
    if (!location.pathname.includes("/goodtrip")) {
      navigate(path);
      setIsOpen(false);
    }
  };
  return (
    <>
      <StyledHeader>
        <Logo>
          <img src={LogoImg} alt="logo" onClick={() => navigate("/")} />
        </Logo>
        <Div onClick={() => handleNavigate("/party")}>내모임</Div>
        <Div
          onClick={() => {
            onClickTrip("/goodtrip");
          }}
        >
          여행지추천
        </Div>
        <Div onClick={toggleFriendModal}>
          친구
          {modalFriend && <Friend closeModal={toggleFriendModal} />}
        </Div>
        <Div onClick={() => handleNavigate("/my")}>마이페이지</Div>
      </StyledHeader>
      <MobileHeader>
        <input
          type="checkbox"
          id="menuToggle"
          onChange={toggleMenu}
          checked={isOpen}
        />
        <label htmlFor="menuToggle">
          <span></span>
          <span></span>
          <span></span>
        </label>
        {isOpen && <TureBack />}
        <HamberGerContainer isOpen={isOpen}>
          <HamberGerMenu>
            <Logo>
              <img
                src={LogoImg}
                alt="logo"
                onClick={() => handleNavigate("/")}
              />
            </Logo>
            <ul>
              <li onClick={() => handleNavigate("/party")}>내모임</li>
              <li onClick={() => onClickTrip("/goodtrip")}>여행지추천</li>
              <li onClick={toggleFriendModal}>
                친구{modalFriend && <Friend closeModal={toggleFriendModal} />}
              </li>
              <li onClick={() => handleNavigate("/my")}>마이페이지</li>
            </ul>
          </HamberGerMenu>
        </HamberGerContainer>
      </MobileHeader>
    </>
  );
};

export default Header;
