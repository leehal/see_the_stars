import { useEffect, useState } from "react";
import styled from "styled-components";
import LeftB from "../../image/메인상단왼쪽방향.png";
import RightB from "../../image/메인상단오른쪽방향.png";
import AuthAxiosApi from "../../api/AuthAxiosApi";

const SignupBox = styled.div`
  position: absolute;
  top: 15%;
  right: 2%;
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  padding-top: 8px;
  cursor: pointer;
  color: #fff;
  transition: all 0.2s ease-in;
  background: linear-gradient(to bottom, #d45353, #dd7777);
  border: 2px solid #fff;
  border-top-color: #ccc;
  border-left-color: #ccc;
  border-right-color: #333;
  border-bottom-color: #333;
  box-shadow: 1px 1px 0 0 #000;
  cursor: pointer;
  outline: none;
  &:active {
    border-top-color: #333;
    border-left-color: #333;
    border-right-color: #ccc;
    border-bottom-color: #ccc;
    background: linear-gradient(to bottom, #d45353, #dd7777);
  }

  @media screen and (max-width: 1024px) {
    width: 90px;
    height: 50px;
    top: 85%;
    left: 1%;
  }
  @media screen and (max-width: 425px) {
    width: 60px;
    height: 30px;
    top: 75%;
    left: 1%;
  }
`;

const SlideshowContainer = styled.div`
  cursor: pointer;
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 100%;
  background: #fff;
  margin: 0 auto;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const ControlButton = styled.div`
  border: none;
  cursor: pointer;
  /* padding: 10px; */
  width: 35px;
  font-size: 20px;
  height: 30px;
`;

const LeftBtn = styled(ControlButton)`
  background-image: url(${LeftB});
  background-position: left center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const RightBtn = styled(ControlButton)`
  background-image: url(${RightB});
  background-position: right center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const Indicator = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 25px;
`;

const Advertisement = ({ setModalOpen }) => {
  const [adList, setAdList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (adList && adList.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % adList.length);
      }, 5000); // 5초마다 이미지 변경

      return () => clearInterval(interval);
    }
  }, [adList]);

  const goToPreviousSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? adList.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % adList.length);
  };

  useEffect(() => {
    const now = new Date().getTime();
    const fetchAdList = async () => {
      try {
        const res = await AuthAxiosApi.adList(now);
        console.log(res.data);
        if (res.data) {
          setAdList(res.data);
        } else {
          console.log("광고 없음");
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchAdList();
  }, []);

  const onClickLink = () => {
    const link = adList[currentIndex]?.alink;
    const regex = /^https?:\/\//i;
    const formattedLink = regex.test(link) ? link : `https://${link}`;
    window.open(formattedLink, "_blank");
  };

  return (
    <>
      <SlideshowContainer
        style={{ backgroundImage: `url(${adList[currentIndex]?.aimage})` }}
        onClick={onClickLink}
      >
        <Indicator>
          {currentIndex + 1}/{adList.length}
        </Indicator>
      </SlideshowContainer>

      <SignupBox onClick={() => setModalOpen(true)}>광고문의</SignupBox>
    </>
  );
};

export default Advertisement;
