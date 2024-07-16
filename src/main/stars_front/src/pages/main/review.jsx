import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: red;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;
const Line = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 30%;
  background: violet;
  overflow: hidden;
`;

const ReviewShow = styled.div`
  position: absolute;
  width: 80%;
  height: 70%;
  background: blue;
`;

const ReviewLine = styled.div`
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 200%;
  height: 40%;
  background: yellow;

  left: ${(props) => props.slideIndex * -20}%;
  transition: left 0.5s ease;
  display: flex;
`;

const ReviewItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 200px;
  background: green;
  margin: 0 10px;
`;

const ButtonBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 10%;
  bottom: 0;
  right: 10%;
  background: yellow;
`;

const ButtonBack = styled.button`
  font-size: 24px;
  cursor: pointer;
  z-index: 1;
`;
const BtnG = styled.div`
  width: 30%;
  height: 100%;
`;
const ButtonGo = styled.button`
  font-size: 24px;
  cursor: pointer;
  z-index: 1;
`;

const ReviewPage = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => {
    setSlideIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <Container>
      <ReviewShow></ReviewShow>
      <Line>
        <ReviewLine slideIndex={slideIndex}>
          {[...Array(10)].map((_, index) => (
            <ReviewItem key={index}></ReviewItem>
          ))}
        </ReviewLine>
      </Line>
      <ButtonBox>
        {slideIndex > 0 && <ButtonBack onClick={prevSlide}>뒤로</ButtonBack>}
        <BtnG></BtnG>
        {slideIndex < 5 && (
          <ButtonGo direction="next" onClick={nextSlide}>
            앞으로
          </ButtonGo>
        )}
      </ButtonBox>
    </Container>
  );
};

export default ReviewPage;
