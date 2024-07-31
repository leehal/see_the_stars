import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Weathers from "./Weathers";
import Festival from "./Festival";
import MainLogin from "../login/MainLogin";
import Advertisement from "../advertisement/Advertisement";
import AdInquiry from "../advertisement/AdInquiry";
import React, { useState, useEffect } from "react";
import Modal from "../../component/Modal";
import Basic from "../../image/Logo.jpg";
import Backimg from "../../image/retro_bg_15.jpg";
import playImageActive from "../../image/재생 버튼.png";
import playImageInactive from "../../image/배경 없는 재생.png";
import pauseImageActive from "../../image/정지 버튼.png";
import pauseImageInactive from "../../image/배경 없는 정지.png";

const Container = styled.div`
  width: 100%;
  height: auto;
  background: #f3f3f3;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url(${Backimg});
  background-size: cover;
  background-repeat: no-repeat;

  @media screen and (max-width: 425px) {
    background: none;
  }
  @media screen and (max-width: 375px) {
    min-width: 375px;
  }
`;

const Back = styled.div`
  position: absolute;
  width: 100%;
  height: 300px;
  /* background: #f4eedd; */
  top: 40%;
  z-index: -1;
`;
const Content = styled.div`
  width: 70vw;
  display: flex;
  background: #fff;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 768px) {
    width: 90vw;
  }
  @media screen and (max-width: 425px) {
    background: none;
    width: 100%;
  }
  @media screen and (max-width: 375px) {
    min-width: 375px;
  }
`;

const Firstp = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 95%;
  height: 86vh;
  justify-content: center;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 425px) {
    width: 100%;
    height: 70vh;
  }
  @media screen and (max-width: 375px) {
    min-width: 375px;
  }
`;

const MainPage = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 60%;
  margin-bottom: 2%;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    width: 90%;
    height: 45%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media screen and (max-width: 425px) {
    flex-direction: column;
    width: 100%;
    height: 45%;
    display: flex;
  }
`;

const Second = styled.div`
  width: 100%;
  height: 100vh;

  @media screen and (max-width: 425px) {
    width: 100%;
    height: 60vh;
  }
`;

const Login = styled.div`
  width: 90%;
  height: 30%;
  background: #fff;
  overflow: hidden;
  border-radius: 15px;
  border: 3px solid #000;

  @media screen and (max-width: 1024px) {
    width: 90%;
    height: 40%;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
    height: 40%;
    border-radius: 20px;
  }
  @media screen and (max-width: 425px) {
    width: 50%;
    height: 150px;
    order: 2;
    border: none;
    box-shadow: 3px 3px 6px -4px gray;
  }
`;

const Promotion = styled.div`
  display: flex;
  justify-content: start;
  width: 60%;
  height: 20%;
  background: #e7e7e7;
  overflow: hidden;
  margin-top: 25px;
  border: 5px solid #000;
  box-shadow: 6px 14px 0 #000, 14px 14px 0 #000;

  @media screen and (max-width: 1024px) {
    position: absolute;
    width: 45%;
    height: 50%;
    bottom: 1%;
    left: 0;
    box-shadow: none;
  }
  @media screen and (max-width: 425px) {
    width: 100%;
    height: 20%;
    border: none;
    bottom: 5%;
    box-shadow: 3px 3px 8px -4px gray, -3px -3px 8px -4px gray,
      3px -3px 8px -4px gray, -3px 3px 8px -4px gray;
  }
`;

const Weather = styled.div`
  width: 90%;
  height: 40%;
  background: #fff;
  border: 3px solid #000;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1024px) {
    width: 90%;
    height: 50%;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
    height: 40%;
    border-radius: 20px;
    order: 1;
  }
  @media screen and (max-width: 425px) {
    width: 45%;
    height: 150px;
    border-radius: 20px;
    border: none;
    box-shadow: 3px 3px 6px -4px gray;
  }
`;

const SlideImg = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  transition: transform 1s ease-in-out;

  @media screen and (max-width: 425px) {
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 375px) {
    min-width: 375px;
  }
`;

const SlideBox = styled.div`
  min-width: 100%;
  height: 100%;
`;

const Slide = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const RightBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 30%;
  gap: 30px;
  height: 100%;
  background: none;
  border: 5px solid #000;

  @media screen and (max-width: 1024px) {
    width: 50%;
    height: 50%;
    bottom: 1%;
    right: 0;
    order: 1;
    justify-content: center;
    position: absolute;
    display: flex;
    gap: 10px;
  }
  @media screen and (max-width: 786px) {
    justify-content: center;
  }

  @media screen and (max-width: 425px) {
    display: flex;
    position: absolute;
    flex-direction: row;
    align-items: center;
    border: none;
    width: 90%;
    height: 30%;
    top: 40%;
    left: 50%;
    transform: translate(-50%);
  }
`;
const LeftBox = styled.div`
  display: flex;
  position: relative;
  background: #fff;
  width: 65%;
  background: #f4eedd;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  border: 5px solid #000;
  overflow: hidden;
  box-shadow: 6px 14px 0 #000, 14px 14px 0 #000;

  @media screen and (max-width: 1024px) {
    position: absolute;
    top: 1%;
    order: 2;
    width: 90%;
    height: 45%;
    box-shadow: none;
  }
  @media screen and (max-width: 425px) {
    position: absolute;
    width: 100%;
    height: 35%;
    border: none;
  }
`;

const Spacer = styled.div`
  width: 100%;
  margin-top: 5px;
  height: 8%;
  background: #000a5c;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const Main = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isPlaying) {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % 4);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  return (
    <>
      <Container>
        <Content>
          <Firstp>
            {/* <Back></Back> */}
            <Promotion>
              <Advertisement setModalOpen={setModalOpen} />
            </Promotion>
            <MainPage>
              <LeftBox>
                <SlideImg
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {[1, 2, 3, 4].map((slideNumber) => (
                    <SlideBox key={slideNumber}>
                      <Slide
                        src={`/img/poster${slideNumber}.jpg`}
                        alt="Poster"
                        style={{
                          objectFit: slideNumber === 3 ? "contain" : "cover",
                        }}
                      />
                    </SlideBox>
                  ))}
                </SlideImg>
              </LeftBox>

              <RightBox>
                <Spacer></Spacer>
                <Login>
                  <MainLogin setRefresh={setRefresh} />
                </Login>

                <Weather>
                  <Weathers></Weathers>
                </Weather>
              </RightBox>
            </MainPage>
          </Firstp>
          <Second>
            <Festival></Festival>
          </Second>
        </Content>
      </Container>
      <Modal open={modalOpen} close={closeModal} header="광고문의">
        <AdInquiry setModalOpen={setModalOpen} />
      </Modal>
    </>
  );
};

export default Main;
