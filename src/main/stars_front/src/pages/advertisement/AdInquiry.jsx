import { useEffect, useRef, useState } from "react";
import { FaImages } from "react-icons/fa";
import styled from "styled-components";
import MyAxiosApi from "../../api/MyAxiosApi";
import AuthAxiosApi from "../../api/AuthAxiosApi";
import { storage } from "../../api/Firebase";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const DragArea = styled.div`
  height: 300px;
  width: 100%;
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
  font-size: 20px;
  font-weight: 500;
  color: #34495e;
`;
const SupportText = styled.span`
  font-size: 12px;
  color: gray;
  margin: 10px 0 15px 0;
`;
const BrowseButton = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: #1683ff;
  cursor: pointer;
`;
const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const Input = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 40px;
  padding: 0 5px;
  border: 3px solid black;
  border-radius: 10px;

  input {
    text-align: center;
    border: none;
    font-size: 23px;
    width: 100%;
    padding: 4px;
    font-weight: bold;
    background-color: transparent;
    outline: none;
  }
  input::placeholder {
    font-size: 24px;
  }
`;

const Line = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  span {
    font-size: 23px;
  }
`;

const Select = styled.select`
  text-align: center;
  font-size: 23px;
  width: 30px;
  border: none;
  border-bottom: 3px solid black;
  font-weight: bold;
  background-color: transparent;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  option {
    font-size: 18px;
    color: black;
    background-color: transparent;
  }
`;

const AdInquiry = ({ setModalOpen }) => {
  const now = new Date();
  const fileInput = useRef();

  const [file, setFile] = useState(null);
  const [price, setPrice] = useState("1000");
  const [link, setLink] = useState("");
  const [expiration, setExpiration] = useState(now.setDate(now.getDate() + 1));
  const [inputNick, setInputNick] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const displayFile = () => {
    if (file) {
      const fileType = file.type;
      const validExtensions = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (validExtensions.includes(fileType)) {
        const fileURL = URL.createObjectURL(file);
        return <ImagePreview src={fileURL} alt="" />;
      } else {
        alert("This is not an Image File");
        setFile(null);
      }
    }
  };

  const onChangeFile = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const onChangeDate = (e) => {
    setPrice(e.target.value * 1000);
    const now = new Date();
    now.setDate(now.getDate() + Number(e.target.value));
    setExpiration(now);
  };
  const onChangeLink = (e) => {
    setLink(e.target.value);
  };

  const onClickPay = () => {
    window.IMP.init("262d385cf93555bb7abf3ee6769ddeea");
    window.IMP.request_pay(
      {
        pg: "kakaopay",
        pay_method: "card",
        merchant_uid: `merchant_${new Date().getTime()}`,
        name: "결제테스트",
        amount: price,
        buyer_email: inputEmail,
        buyer_name: inputNick,
      },
      function (rsp) {
        if (rsp.success) {
          handleUpload();
        } else {
          alert("결제에 실패하였습니다.");
        }
      }
    );
  };

  const handleUpload = async () => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    try {
      await fileRef.put(file);
      const url = await fileRef.getDownloadURL();
      console.log("저장경로 확인 : " + url);
      try {
        console.log(url, link, expiration);
        const res = await AuthAxiosApi.adPublished(url, link, expiration);
        console.log(res.data);
        if (res.data) {
          alert("결제가 완료되었습니다.");
          setModalOpen(false);
        } else {
          console.log("데이터 없음");
        }
      } catch (e) {
        console.log("저장오류");
      }
    } catch (error) {
      console.error("파이어베이스 오류", error);
    }
  };

  useEffect(() => {
    const memberDetail = async () => {
      try {
        const res = await MyAxiosApi.memberDetail();
        console.log(res.data);
        if (res.data) {
          setInputNick(res.data.nick);
          setInputEmail(res.data.email);
        } else {
          console.log("데이터 없음");
        }
      } catch (e) {
        console.log(e);
      }
    };
    memberDetail();
  }, []);

  return (
    <Container>
      <DragArea onDragOver={handleDragOver} onDrop={handleDrop}>
        {file ? (
          displayFile()
        ) : (
          <>
            <FaImages style={{ color: `#1683ff`, fontSize: `40px` }} />
            <Header>여기로 이미지를 드래그하거나</Header>
            <Header>
              <BrowseButton onClick={() => fileInput.current.click()}>
                업로드하세요
              </BrowseButton>
            </Header>
            <input type="file" ref={fileInput} hidden onChange={onChangeFile} />
            <SupportText>Supports: JPEG, JPG, PNG, Webp</SupportText>
          </>
        )}
      </DragArea>
      <Input>
        <input
          type="text"
          placeholder="링크 주소 기입"
          onChange={(e) => onChangeLink(e)}
        />
      </Input>
      <Line>
        <div>
          <span>기간 </span>
          <Select onChange={(e) => onChangeDate(e)}>
            <option value={1}>1일</option>
            <option value={3}>3일</option>
            <option value={7}>7일</option>
          </Select>
        </div>
        <span>가격: {price}원</span>
      </Line>
      <button onClick={onClickPay}>광고 게재</button>
    </Container>
  );
};
export default AdInquiry;
