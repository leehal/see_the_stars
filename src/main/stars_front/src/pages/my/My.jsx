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
import MyBack from "../../image/내가만든배경2.png";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 7%;
  justify-content: center;
`;

const Box = styled.div`
  width: 90%;
  height: 90%;
  background-image: url(${MyBack});
  /* border: 4px solid black; */
  /* border: 6px solid black; */
  /* background-position: center; */
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: space-around;
`;

const ProFileBox = styled.div`
  width: 40%;
  /* background-color: red; */

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  justify-content: space-evenly;
  align-items: center;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 7%;
`;
const InputBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 10%;
  padding: 0 20px;
  justify-content: space-between;
  border: 3px solid black;
  border-radius: 10px;

  div {
    width: 60%;
    height: 40px;
    background: yellow;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;

    p {
      display: inline-block;
      width: 100%;
      height: 50%;
      font-size: 1.4rem;
      text-align: center;
    }
  }

  input {
    text-align: center;
    border: none;
    font-size: 23px;
    width: 30%;
    padding: 4px;
    font-weight: bold;
    background-color: transparent;
    outline: none;
    padding-top: 10px;

    &::placeholder {
      font-size: 10px;
    }
  }

  svg {
    font-size: 40px;
  }
  button {
    padding: 1%;
    font-size: 1.4rem;
  }
`;
const NoneButton = styled.button`
  background: none;
  border: none;
  color: rgba(0, 0, 0, 0);
  & > * {
    visibility: hidden;
  }
`;

const ProfileButtonBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-around;
  /* background-color: blue; */
`;
const Button = styled.button`
  width: 100px;
  height: 30px;
  font-size: 1.25rem;
  /* margin-top: 20px; */
  color: #000;
  background: linear-gradient(to bottom, #f0f0f0, #dcdcdc);
  /* background: linear-gradient(to top left, red, transparent 50%),
    linear-gradient(to top right, blue, transparent 50%),
    linear-gradient(to bottom left, violet, transparent 50%),
    linear-gradient(to bottom right, orange, transparent 50%),
    radial-gradient(circle, white 0%, yellow 25%, green 50%, transparent 75%); */
  /* radial-gradient(circle, white 0%, transparent 50%); */
  border: 2px solid #fff;
  border-top-color: #ccc;
  border-left-color: #ccc;
  border-right-color: #333;
  border-bottom-color: #333;
  padding-top: 8px;
  box-shadow: 1px 1px 0 0 #000;
  cursor: pointer;
  outline: none;
  &:active {
    border-top-color: #333;
    border-left-color: #333;
    border-right-color: #ccc;
    border-bottom-color: #ccc;
    background: linear-gradient(to bottom, #dcdcdc, #f0f0f0);
  }
`;

const My = ({
  setModalOpen,
  setHeader,
  setType,
  member,
  onModify,
  setDelModalOpen,
  category,
}) => {
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
    if (file) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file?.name);
      try {
        await fileRef.put(file);
        const url = await fileRef.getDownloadURL();
        console.log("저장경로 확인 : " + url);
        onModify(url, 1);
        alert("프로필 수정이 완료");
      } catch (e) {
        console.log(e, "파이어베이스 오류");
      }
    }
  };

  return (
    <Container>
      <Box>
        <ProFileBox>
          {/* <div> */}
          <Profile
            size="9rem"
            onClick={onClickInputFile}
            border={`3px solid black`}
            src={previewUrl || member?.image}
          >
            <input type="file" onChange={onChangFile} ref={inputFile} hidden />
          </Profile>
          <ProfileButtonBox>
            <Button onClick={onClickProfile}>프로필수정</Button>
            {/* </div> */}
            <Button onClick={() => setDelModalOpen(true)}>회원탈퇴</Button>
          </ProfileButtonBox>
        </ProFileBox>
        <Column>
          <InputBox>
            <GoPerson style={{ color: `gray` }} />
            <div>
              <p>{member?.mid}</p>
            </div>

            <Button>수정</Button>
          </InputBox>
          {member?.social === "COMMON" && (
            <InputBox>
              <GoLock style={{ color: `gray` }} />
              <div>
                <p>비밀번호</p>
              </div>
              <Button onClick={() => onClickEdit(2)}>수정</Button>
            </InputBox>
          )}
          <InputBox>
            <GoPerson style={{ color: `gray` }} />
            <div>
              <p>{member?.nick}</p>
            </div>
            <Button onClick={() => onClickEdit(3)}>수정</Button>
          </InputBox>
          {member?.social === "COMMON" && (
            <InputBox>
              <GoMail style={{ color: `gray` }} />
              <div>
                <p>{member?.email}</p>
              </div>
              <Button onClick={() => onClickEdit(4)}>수정</Button>
            </InputBox>
          )}
        </Column>
      </Box>
    </Container>
  );
};
export default My;
