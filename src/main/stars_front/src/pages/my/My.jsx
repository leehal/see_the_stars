import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { GoPerson, GoLock, GoMail } from "react-icons/go";
import Profile from "../../component/Profile";
import { storage } from "../../api/Firebase";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 7%;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  width: 90%;
  height: 90%;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  background: #fff;
  justify-content: center;

  @media screen and (max-width: 1024px) {
    width: 90%;
    justify-content: space-evenly;
  }
  @media screen and (max-width: 425px) {
    width: 90%;
    justify-content: space-between;
  }
`;

const ProFileBox = styled.div`
  width: 40%;
  height: 80%;
  /* background-color: red; */
  display: flex;
  /* background: red; */
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;

  @media screen and (max-width: 768px) {
    width: 30%;
    align-items: center;
  }
  @media screen and (max-width: 425px) {
    width: 30%;
    justify-content: center;
    gap: 20px;
  }
`;
const Column = styled.div`
  display: flex;
  width: 50%;
  height: 80%;
  flex-direction: column;
  /* background: #fff; */
  justify-content: space-evenly;
  align-items: center;
  gap: 2%;

  @media screen and (max-width: 425px) {
    width: 65%;
  }
`;
const InputBox = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 15%;
  padding: 0 20px;
  background: #f3f3f3;
  justify-content: space-between;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  /* border: 2px solid black; */
  border-radius: 10px;

  @media screen and (max-width: 1024px) {
    width: 90%;
  }
  @media screen and (max-width: 425px) {
    width: 100%;
    padding: 0 10px;
  }

  div {
    width: 50%;
    height: 25px;
    /* background: yellow; */
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      display: inline-block;
      width: 50%;
      height: 75%;
      font-size: 25px;

      @media screen and (max-width: 1024px) {
        font-size: 20px;
      }
      @media screen and (max-width: 425px) {
        font-size: 18px;
      }
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
`;
const Button = styled.button`
  width: 80px;
  height: 30px;
  font-size: 25px;
  /* margin-top: 20px; */
  padding-top: 5px;
  color: #fff;
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
    width: 60px;
    font-size: 20px;
  }
`;
const ButtonF = styled.button`
  width: 100px;
  /* height: 30px; */
  font-size: 25px;
  /* margin-top: 20px; */
  padding-top: 10px;
  color: #fff;
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
  @media screen and (max-width: 425px) {
    width: 80px;
    font-size: 20px;
  }
  @media screen and (max-width: 375px) {
    font-size: 18px;
  }
`;

const BinBox = styled.button`
  width: 80px;
  height: 30px;
  background: none;
  border: none;
`;

const ProfileButtonBox = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-around;

  @media screen and (max-width: 1024px) {
    width: 80%;
  }
`;

const My = ({ setModalOpen, setHeader, setType, member, onModify }) => {
  const inputFile = useRef(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState();
  const [size, setSize] = useState("9rem");

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSize("10rem");
      } else if (window.innerWidth > 425) {
        setSize("7rem");
      } else {
        setSize("5rem");
      }
    };

    window.addEventListener("resize", handleResize);
    // 초기 실행을 위해 호출
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      <Box>
        <ProFileBox>
          {/* <div> */}
          <Profile
            size={size}
            onClick={onClickInputFile}
            // border={`1px solid black`}
            src={previewUrl || member?.image}
          >
            <input type="file" onChange={onChangFile} ref={inputFile} hidden />
          </Profile>
          <ProfileButtonBox>
            {member?.social === "COMMON" && (
              <ButtonF onClick={onClickProfile}>프로필수정</ButtonF>
            )}
            {/* </div> */}
          </ProfileButtonBox>
        </ProFileBox>
        <Column>
          <InputBox>
            <GoPerson style={{ color: `gray` }} />
            <div>
              <p>ID</p>
            </div>
            <BinBox></BinBox>
          </InputBox>
          {member?.social === "COMMON" && (
            <InputBox>
              <GoLock style={{ color: `gray` }} />
              <div>
                <p>PassWord</p>
              </div>
              <Button onClick={() => onClickEdit(2)}>수정</Button>
            </InputBox>
          )}
          <InputBox>
            <GoPerson style={{ color: `gray` }} />
            <div>
              <p>닉네임</p>
            </div>
            {member?.social === "COMMON" && (
              <Button onClick={() => onClickEdit(3)}>수정</Button>
            )}
          </InputBox>
          {member?.social === "COMMON" && (
            <InputBox>
              <GoMail style={{ color: `gray` }} />
              <div>
                <p>Email</p>
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
