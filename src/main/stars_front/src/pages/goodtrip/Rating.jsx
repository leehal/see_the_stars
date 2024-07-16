import { useState } from "react";
import styled from "styled-components";

const LeftStar = styled.input.attrs({ type: "checkbox" })`
  clip-path: polygon(50% 0%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  width: 20px;
  height: 20px;
  background: ${({ hovered }) => (hovered ? "gold" : "gray")};
  -webkit-appearance: none;
  position: absolute;
`;

const RightStar = styled.input.attrs({ type: "checkbox" })`
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%);
  width: 20px;
  height: 20px;
  background: ${({ hovered }) => (hovered ? "gold" : "gray")};
  -webkit-appearance: none;
`;

const StarBox = styled.div`
  position: relative;
`;

const StarContainer = styled.div`
  display: flex;
`;

const Star = ({ value, onChange }) => {
  const [current, setCurrent] = useState(0);
  const [rate, setRate] = useState(value);

  const focus = (e) => {
    setCurrent(e.target.value);
  };

  const focusOut = () => {
    setTimeout(() => {
      setCurrent(rate);
    }, 1000);
  };

  const onClickRate = (e) => {
    setRate(e.target.value);
    onChange(e.target.value);
  };

  return (
    <>
      <StarContainer>
        <StarBox>
          <LeftStar
            value={0.5}
            hovered={current >= 0.5}
            onMouseEnter={focus}
            onMouseLeave={focusOut}
            onClick={onClickRate}
          />
          <RightStar
            value={1.0}
            hovered={current >= 1.0}
            onMouseEnter={focus}
            onMouseLeave={focusOut}
            onClick={onClickRate}
          />
        </StarBox>
        <StarBox>
          <LeftStar
            value={1.5}
            hovered={current >= 1.5}
            onMouseEnter={focus}
            onMouseLeave={focusOut}
            onClick={onClickRate}
          />
          <RightStar
            value={2.0}
            hovered={current >= 2.0}
            onMouseEnter={focus}
            onMouseLeave={focusOut}
            onClick={onClickRate}
          />
        </StarBox>
        <StarBox>
          <LeftStar
            value={2.5}
            hovered={current >= 2.5}
            onMouseEnter={focus}
            onMouseLeave={focusOut}
            onClick={onClickRate}
          />
          <RightStar
            value={3.0}
            hovered={current >= 3.0}
            onMouseEnter={focus}
            onMouseLeave={focusOut}
            onClick={onClickRate}
          />
        </StarBox>
        <StarBox>
          <LeftStar
            value={3.5}
            hovered={current >= 3.5}
            onMouseEnter={focus}
            onMouseLeave={focusOut}
            onClick={onClickRate}
          />
          <RightStar
            value={4.0}
            hovered={current >= 4.0}
            onMouseEnter={focus}
            onMouseLeave={focusOut}
            onClick={onClickRate}
          />
        </StarBox>
        <StarBox>
          <LeftStar
            value={4.5}
            hovered={current >= 4.5}
            onMouseEnter={focus}
            onMouseLeave={focusOut}
            onClick={onClickRate}
          />
          <RightStar
            value={5.0}
            hovered={current >= 5.0}
            onMouseEnter={focus}
            onMouseLeave={focusOut}
            onClick={onClickRate}
          />
        </StarBox>
        <span>평점: {rate}</span>
      </StarContainer>
    </>
  );
};

export default Star;
