import React, { useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import Fastival1 from "../../image/에버랜드.jpg";
import Fastival2 from "../../image/광명동굴.jpg";
import Fastival3 from "../../image/중동성당.jpg";
import Fastival4 from "../../image/한국민속촌1.jpg";
import Fastival5 from "../../image/지중해마을.jpg";
import Fastival6 from "../../image/행주산성.jpg";
import { BiWindow } from "react-icons/bi";
import { FaWindowMinimize } from "react-icons/fa6";
import { RiCloseLine } from "react-icons/ri";
import PrevBtnif from "../../image/prev_active.png";
import PrevBtn from "../../image/prev_inactive.png";
import NextBtnif from "../../image/next_active.png";
import NextBtn from "../../image/next_inactive.png";

const animate = keyframes`
  from {
    opacity: 0;
    transform: translate(0, 100px);
    filter: blur(33px);
  }
  to {
    opacity: 1;
    transform: translate(0);
    filter: blur(0);
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Slide = styled.div`
  position: relative;
  top: 10%;
  left: 50%;
  transform: translate(-50%);
  width: 95%;
  height: 70%;
`;

const Item = styled.div`
  width: 20%;
  height: 40%;
  position: absolute;
  bottom: 3%;
  background-size: cover;
  transition: 0.5s;
  border: 3px solid #000;
  min-width: 200px;
  min-width: 230px;

  @media screen and (max-width: 1024px) {
    min-width: 150px;
    min-height: 200px;

    @media screen and (max-width: 425px) {
      min-width: 100px;
      min-height: 150px;
    }
  }

  &:nth-child(2) {
    box-shadow: none;
  }
  &:nth-child(1),
  &:nth-child(2) {
    top: 0;
    right: 0;
    transform: translate(0, 0);
    border-radius: 0;
    width: 100%;
    height: 100%;
  }

  &:nth-child(3) {
    right: 11%;
  }

  &:nth-child(4) {
    right: 3%;
    bottom: 2%;
  }

  &:nth-child(5) {
    right: -5%;
    bottom: 1%;
  }

  &:nth-child(n + 6) {
    right: -20%;
    opacity: 0;
  }
`;

const Indicator = styled.div`
  display: flex;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: 5%;
`;

const IndicatorDot = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#777" : "#ddd")};
  margin: 0 5px;
`;

const Name = styled.div`
  display: flex;
  justify-content: center;
  font-size: 50px;
  margin-top: 10px;
  text-transform: uppercase;
  font-weight: bold;
  opacity: 0;
  animation: ${animate} 1s ease-in-out 1 forwards;

  @media screen and (max-width: 425px) {
    font-size: 25px;
  }
`;

const Description = styled.div`
  font-size: 25px;
  opacity: 0;
  text-align: center;
  animation: ${animate} 1s ease-in-out 0.3s 1 forwards;

  @media screen and (max-width: 425px) {
    font-size: 20px;
  }
`;
const BinBox = styled.div`
  width: 100%;
  height: 15%;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  bottom: 12%;
`;

const PrevButton = styled.button`
  width: 50px;
  height: 35px;
  background: #f4eedd;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-image: url(${PrevBtn});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  text-transform: uppercase;
  outline: none;
  transition: all 0.3s ease;
`;

const NextButton = styled.button`
  width: 50px;
  height: 35px;
  background: #f4eedd;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-image: url(${NextBtn});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  text-transform: uppercase;
  outline: none;
  transition: all 0.3s ease;
`;

const Window = styled.div`
  position: absolute;
  top: 50%;
  border: 2px solid #fff;
  box-shadow: 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000;
  left: 100px;
  height: 45%;
  width: 30%;
  min-width: 270px;
  min-height: 230px;
  background: #ccc;
  color: #333;
  transform: translate(0, -50%);
  /* font-family: system-ui; */
  display: none;

  ${Item}:nth-child(2) & {
    display: block;
  }

  @media screen and (max-width: 1024px) {
    position: absolute;
    top: 75%;
    left: 0;
  }
  @media screen and (max-width: 425px) {
    min-width: 150px;
    min-height: 130px;
  }
`;
const TitleBar = styled.div`
  background: linear-gradient(to right, #000080, #0000a0);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  box-shadow: inset -1px -1px 0 #000, inset 1px 1px 0 #808080;
`;

const Title = styled.span`
  padding-left: 5px;
`;

const Controls = styled.div`
  display: flex;
`;

const ControlButton = styled.button`
  background-color: #c0c0c0;
  border: 1px solid #808080;
  width: 17px;
  height: 17px;
  gap: 2px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  line-height: 12px;
  box-shadow: inset -1px -1px 0 #000, inset 1px 1px 0 #fff;
`;

const Content1 = styled.div`
  padding: 10px;
  background-color: white;
  box-shadow: inset -1px -1px 0 #fff, inset 1px 1px 0 #000;
  height: 90%;
  overflow: scroll;

  scrollbar-width: thin;
  scrollbar-color: #808080 #c0c0c0;

  &::-webkit-scrollbar {
    width: 25px;
    height: 25px;
  }

  &::-webkit-scrollbar-track {
    background: #c0c0c0;
    border: 1px solid #fff;
    box-shadow: inset -1px -1px 0 #808080, inset 1px 1px 0 #fff;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #808080;
    border: 1px solid #fff;
    box-shadow: inset -1px -1px 0 #000, inset 1px 1px 0 #000;
  }
`;

const Festival = () => {
  const [currentItem, setCurrentItem] = useState(0);
  const itemsRefs = useRef([]);
  // const [isActive, setIsActive] = useState(false);
  const [showNextInactive, setShowNextInactive] = useState(false);
  const [showPrevInactive, setShowPrevInactive] = useState(false);

  const handleNext = () => {
    const nextItemIndex = (currentItem + 1) % itemsRefs.current.length;
    const nextItem = itemsRefs.current[nextItemIndex];
    const currentSlide = nextItem.parentElement;
    currentSlide.appendChild(nextItem);
    setCurrentItem(nextItemIndex);
    setShowNextInactive(true);
    setTimeout(() => setShowNextInactive(false), 200);
  };

  const handlePrev = () => {
    const prevItemIndex =
      (currentItem - 1 + itemsRefs.current.length) % itemsRefs.current.length;
    const prevItem = itemsRefs.current[prevItemIndex];
    const currentSlide = prevItem.parentElement;
    currentSlide.prepend(prevItem);
    setCurrentItem(prevItemIndex);
    setShowPrevInactive(true);
    setTimeout(() => setShowPrevInactive(false), 200);
  };

  return (
    <Container>
      <Slide>
        <Item
          style={{ backgroundImage: `url(${Fastival1})` }}
          ref={(el) => (itemsRefs.current[0] = el)}
        >
          <Window>
            <TitleBar>
              <Title></Title>
              <Controls>
                <ControlButton>
                  <FaWindowMinimize />
                </ControlButton>
                <ControlButton>
                  <BiWindow />
                </ControlButton>
                <ControlButton>
                  <RiCloseLine />
                </ControlButton>
              </Controls>
            </TitleBar>
            <Content1>
              <Name>에버랜드</Name>
              <BinBox />
              <Description>
                함께 행복에너지를 만드는
                <br /> 현실속의 에버토피아
              </Description>
            </Content1>
          </Window>
        </Item>
        <Item
          style={{
            backgroundImage: `url(${Fastival2})`,
          }}
          ref={(el) => (itemsRefs.current[1] = el)}
        >
          <Window>
            <TitleBar>
              <Title></Title>
              <Controls>
                <ControlButton>
                  <FaWindowMinimize />
                </ControlButton>
                <ControlButton>
                  <BiWindow />
                </ControlButton>
                <ControlButton>
                  <RiCloseLine />
                </ControlButton>
              </Controls>
            </TitleBar>
            <Content1>
              <Name>광명동굴</Name>
              <BinBox />
              <Description>
                폐광의 기적을 만들다 창조의 메카,
                <br /> 광명동굴
              </Description>
            </Content1>
          </Window>
        </Item>
        {/* Add more items similarly */}
        <Item
          style={{ backgroundImage: `url(${Fastival3})` }}
          ref={(el) => (itemsRefs.current[2] = el)}
        >
          <Window>
            <TitleBar>
              <Title></Title>
              <Controls>
                <ControlButton>
                  <FaWindowMinimize />
                </ControlButton>
                <ControlButton>
                  <BiWindow />
                </ControlButton>
                <ControlButton>
                  <RiCloseLine />
                </ControlButton>
              </Controls>
            </TitleBar>
            <Content1>
              <Name>공주중동성당</Name>
              <BinBox />
              <Description>
                서양 중세기의 고딕건축양식으로 지어진
                <br />
                공주지역 최초의 천주교 성당
              </Description>
            </Content1>
          </Window>
        </Item>
        <Item
          style={{ backgroundImage: `url(${Fastival4})` }}
          ref={(el) => (itemsRefs.current[3] = el)}
        >
          <Window>
            <TitleBar>
              <Title></Title>
              <Controls>
                <ControlButton>
                  <FaWindowMinimize />
                </ControlButton>
                <ControlButton>
                  <BiWindow />
                </ControlButton>
                <ControlButton>
                  <RiCloseLine />
                </ControlButton>
              </Controls>
            </TitleBar>
            <Content1>
              <Name>한국민속촌</Name>
              <BinBox />
              <Description>
                선조들의 지혜와 슬기를 체험할 수 있는
                <br /> 국내 유일의 전통문화 테마파크!
              </Description>
            </Content1>
          </Window>
        </Item>
        <Item
          style={{ backgroundImage: `url(${Fastival5})` }}
          ref={(el) => (itemsRefs.current[4] = el)}
        >
          <Window>
            <TitleBar>
              <Title></Title>
              <Controls>
                <ControlButton>
                  <FaWindowMinimize />
                </ControlButton>
                <ControlButton>
                  <BiWindow />
                </ControlButton>
                <ControlButton>
                  <RiCloseLine />
                </ControlButton>
              </Controls>
            </TitleBar>
            <Content1>
              <Name>지중해 마을</Name>
              <BinBox />
              <Description>
                이국적인 유럽풍 건물이 모여 <br />
                지중해의 작은 시골 마을을 <br />
                연상시키는 마을
              </Description>
            </Content1>
          </Window>
        </Item>
        <Item
          style={{ backgroundImage: `url(${Fastival6})` }}
          ref={(el) => (itemsRefs.current[5] = el)}
        >
          <Window>
            <TitleBar>
              <Title></Title>
              <Controls>
                <ControlButton>
                  <FaWindowMinimize />
                </ControlButton>
                <ControlButton>
                  <BiWindow />
                </ControlButton>
                <ControlButton>
                  <RiCloseLine />
                </ControlButton>
              </Controls>
            </TitleBar>
            <Content1>
              <Name>행주산성</Name>
              <BinBox />
              <Description>
                권율 장군의 행주대첩으로 <br /> 널리 알려진 곳으로
                <br /> 흙을 이용하여 쌓은 토축산성
              </Description>
            </Content1>
          </Window>
        </Item>
      </Slide>
      <Indicator>
        {[...Array(6)].map((_, index) => (
          <IndicatorDot key={index} active={index === currentItem} />
        ))}
      </Indicator>
      <ButtonWrapper>
        <PrevButton
          onClick={handlePrev}
          style={{
            backgroundImage: `url(${showPrevInactive ? PrevBtnif : PrevBtn})`,
          }}
        ></PrevButton>
        <NextButton
          onClick={handleNext}
          style={{
            backgroundImage: `url(${showNextInactive ? NextBtnif : NextBtn})`,
          }}
        ></NextButton>
      </ButtonWrapper>
    </Container>
  );
};

export default Festival;
