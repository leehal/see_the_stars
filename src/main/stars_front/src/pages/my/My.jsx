import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MyAxiosApi from "../../api/MyAxiosApi";
import Common from "../../utils/Common";
import LoginAxiosApi from "../../api/AuthAxiosApi";
import { GoPerson, GoLock, GoMail, GoEye, GoEyeClosed } from "react-icons/go";
import { UserContext } from "../../context/UserStore";
import { useNavigate } from "react-router-dom";
import Profile from "../../component/Profile";
import AuthAxiosApi from "../../api/AuthAxiosApi";
import { storage } from "../../api/Firebase";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Button = styled.button`
  border-radius: 20px;
  padding: 10px;
  width: 150px;
  cursor: pointer;
  background-color: #eafccd;
  border: none;
  &:hover {
    background-color: #d6f5a3;
  }
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  height: 50px;
  padding: 0 20px;
  border: 3px solid black;
  border-radius: 10px;

  input {
    text-align: center;
    border: none;
    font-size: 23px;
    width: 90%;
    padding: 4px;
    font-weight: bold;
    background-color: transparent;
    outline: none;
    padding-top: 10px;
  }
  input::placeholder {
    font-size: 24px;
  }
  svg {
    font-size: 24px;
  }
`;

const My = ({ setModalOpen, setHeader, setType, member, onModify }) => {
  const inputFile = useRef(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState();

  const onChangFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      console.error("파일이 선택 안됨");
    }
  };

  const onClickInputFile = () => {
    inputFile.current.click();
  };

  const onClickEdit = (type) => {
    setModalOpen(true);
    setType(type);
    switch (type) {
      case 1:
        setHeader("프로필 수정");
        break;
      case 2:
        setHeader("비밀번호 수정");
        break;
      case 3:
        setHeader("닉네임 수정");
        break;
      case 4:
        setHeader("이메일 수정");
        break;
      default:
        setHeader("오류");
        break;
    }
  };

  // if (isLoading) {
  //   return <div>Initializing...</div>;
  // }
  const onClickProfile = async () => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file?.name);
    try {
      await fileRef.put(file);
      const url = await fileRef.getDownloadURL();
      console.log("저장경로 확인 : " + url);
      onModify(url, 1);
    } catch (e) {
      console.log(e, "파이어베이스 오류");
    }
  };

  return (
    <Container>
      <Profile
        size="9rem"
        onClick={onClickInputFile}
        border={`3px solid black`}
        src={previewUrl || member?.image}
      >
        <input type="file" onChange={onChangFile} ref={inputFile} hidden />
      </Profile>
      <button onClick={onClickProfile}>프로필수정</button>
      <InputBox>
        <GoPerson style={{ color: `gray` }} />
        <div>{member?.mid}</div>
      </InputBox>
      {member?.social === "COMMON" && (
        <InputBox>
          <GoLock style={{ color: `gray` }} />
          <div>비밀번호</div>
          <button onClick={() => onClickEdit(2)}>수정</button>
        </InputBox>
      )}
      <InputBox>
        <GoPerson style={{ color: `gray` }} />
        <div>{member?.nick}</div>
        <button onClick={() => onClickEdit(3)}>수정</button>
      </InputBox>
      {member?.social === "COMMON" && (
        <InputBox>
          <GoMail style={{ color: `gray` }} />
          <div>{member?.email}</div>
          <button onClick={() => onClickEdit(4)}>수정</button>
        </InputBox>
      )}
    </Container>
  );
};
export default My;
