import React from "react";
import styled from "styled-components";

// 이미지 컨테이너 스타일
const ImageContainer = styled.div`
  position: relative;
  width: 100px; // 원하는 너비로 조정
  height: 100px; // 원하는 높이로 조정
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.2em;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ImageItem = styled.div`
  position: relative;
  width: 100px; // 원하는 크기로 조정
  height: 100px; // 원하는 크기로 조정

  &:not(:first-child) {
    display: none; // 첫 번째 이미지를 제외하고 숨기기
  }
`;

const ImagesGrid = ({ images }) => {
  return (
    <ImageWrapper>
      {images.map((image, index) => (
        <ImageItem key={index}>
          <MainImage src={image.src} alt={`Image ${index + 1}`} />
          {index === 0 && images.length > 1 && (
            <Overlay>{images.length > 999 ? "999+" : images.length}</Overlay>
          )}
        </ImageItem>
      ))}
    </ImageWrapper>
  );
};

export default ImagesGrid;
