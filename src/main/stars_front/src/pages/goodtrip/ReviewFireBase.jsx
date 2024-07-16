import firebase from "firebase/compat/app";
import React, { useRef, useState } from "react";
import { storage } from "../../api/Firebase";
import styled from "styled-components";
import { FaImages } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DragArea = styled.div`
  height: 20%;
  border: 3px dashed #e0eafc;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 10px auto;
  &.active {
    border: 2px solid #1683ff;
  }
`;

const Header = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: #34495e;
`;

const SupportText = styled.span`
  font-size: 0.8rem;
  color: gray;
  margin: 10px 0 15px 0;
`;

const BrowseButton = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #1683ff;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
`;
const ImageBox = styled.div``;

const ImagePreviewContainer = styled.div`
  width: 150px;
  height: 150px;
  border: 1px solid #ddd;
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ReviewFireBase = ({ onUploadComplete, getFiles }) => {
  const fileInput = useRef();
  const [files, setFiles] = useState([]);

  getFiles(files); // 현재 파일 리스트를 부모 컴포넌트로 전달

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(droppedFiles)]);
    }
  };

  const displayFiles = () => {
    return files.map((file, index) => {
      const fileType = file.type;
      const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
      if (validExtensions.includes(fileType)) {
        const fileURL = URL.createObjectURL(file);
        return (
          <ImagePreviewContainer key={index}>
            <ImagePreview
              src={fileURL}
              alt=""
              onClick={() => removeFile(index)}
            />
          </ImagePreviewContainer>
        );
      } else {
        alert("This is not an Image File");
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
        return null;
      }
    });
  };

  const onChangeFile = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(selectedFiles)]);
    }
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <DragArea onDragOver={handleDragOver} onDrop={handleDrop}>
        {files.length > 0 ? (
          <ImageContainer>{displayFiles()}</ImageContainer>
        ) : (
          <>
            <FaImages style={{ color: `#1683ff`, fontSize: `40px` }} />
            <Header>여기로 이미지를 드래그하거나</Header>
            <Header>
              <BrowseButton onClick={() => fileInput.current.click()}>
                업로드하세요
              </BrowseButton>
            </Header>
            <input
              type="file"
              ref={fileInput}
              onChange={onChangeFile}
              multiple
              style={{ display: "none" }}
            />
            <SupportText>Supports: JPEG, JPG, PNG</SupportText>
          </>
        )}
      </DragArea>
    </Container>
  );
};

export default ReviewFireBase;
