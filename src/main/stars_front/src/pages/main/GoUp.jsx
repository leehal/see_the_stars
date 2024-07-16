import React, { useState, useEffect } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import styled from "styled-components";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 스크롤 이벤트 리스너 등록
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0, // 왼쪽으로 스크롤 위치 지정 (기본 0)
    });
  };

  const Button = styled.button`
    z-index: 999;
    position: fixed;
    bottom: 3%;
    right: 3%;
    background: none;
    border: none;
    cursor: pointer;
  `;

  const IconUp = styled.div`
    font-size: 60px;
    color: #c7c7c7;
    display: ${isVisible ? "block" : "none"};
    &:hover {
      color: #a0a0a0;
    }
  `;

  return (
    <Button onClick={scrollToTop}>
      <IconUp>
        <FaArrowAltCircleUp />
      </IconUp>
    </Button>
  );
};

export default ScrollToTopButton;
