import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: yellow;
`;

const BestComment = styled.div`
  position: relative;
  width: 100%;
  height: 60%;
  background: blue;
  overflow: hidden;
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  /* justify-content: space-between; Remove this line */
  width: ${({ numItems }) =>
    `${numItems * 20}%`}; /* Total width of all items */
  height: 100%;
  transition: transform 0.7s ease-in-out;
  transform: ${({ currentSlide }) =>
    `translateX(-${currentSlide * 100}%)`}; /* Slide transition */
`;

const ListItem = styled.li`
  /* margin: 0 5px; */
  list-style: none;
  border: 1px solid #ccc;
  width: calc(
    100% / ${({ numItems }) => numItems}
  ); /* Adjusted width calculation */
  min-width: 10%; /* Minimum width */
  height: 60%;
  background: red;
  color: white;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SlideBtn = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 20%;
  left: 0;
  bottom: 0;
`;

const SlideButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;

  svg {
    font-size: 40px;
  }
`;

const LastMain = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
  ];
  const items2 = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
  ];

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + items.length) % items.length
    );
  };

  useEffect(() => {
    const slideWrapper = document.querySelector(".list");
    if (slideWrapper) {
      slideWrapper.style.transform = `translateX(-${
        currentSlide * (100 / items.length)
      }%)`;
    }
  }, [currentSlide, items.length]);

  return (
    <Container>
      <BestComment>
        <List
          className="list"
          currentSlide={currentSlide}
          numItems={items.length}
        >
          {items.map((item, index) => (
            <ListItem key={index} numItems={items.length}>
              <p>{item}</p>
            </ListItem>
          ))}
          {/* Repeat the items to create the infinite loop effect */}
          {items.map((item2, index) => (
            <ListItem key={index + items.length} numItems={items.length}>
              <p>{item2}</p>
            </ListItem>
          ))}
        </List>
        <SlideBtn>
          <SlideButton onClick={handlePrev}>
            <IoMdArrowDropleft />
          </SlideButton>
          <SlideButton onClick={handleNext}>
            <IoMdArrowDropright />
          </SlideButton>
        </SlideBtn>
      </BestComment>
    </Container>
  );
};

export default LastMain;
