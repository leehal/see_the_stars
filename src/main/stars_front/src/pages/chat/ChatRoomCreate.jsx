import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatAxiosApi from "../../api/ChatAxiosApi";
import Kakao from "../goodtrip/map";

// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px; // 버튼 사이의 간격
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
const Citys = styled.div`
  width: 50%;
`;

function ChatRoomCreate() {
  const [chatRoomTitle, setChatRoomTitle] = useState("");
  const [city, setCity] = useState("ex");
  const [area, setArea] = useState("");
  const [chatName, setChatName] = useState([]);
  const navigate = useNavigate();
  const data = {
    강원도: [
      "춘천",
      "원주",
      "강릉",
      "동해시",
      "태백",
      "속초",
      "삼척",
      "홍천",
      "횡성",
      "영월",
      "평창",
      "정선",
      "철원",
      "화천",
      "양구",
      "인제",
      "고성",
      "양양",
    ],
    경기도: [
      "가평",
      "고양",
      "과천",
      "광명",
      "경기도 광주",
      "구리",
      "군포",
      "김포",
      "남양주",
      "동두천",
      "부천",
      "성남",
      "수원",
      "시흥",
      "안산",
      "안성",
      "안양",
      "양주",
      "양평",
      "여주",
      "연천군",
      "오산시",
      "용인",
      "의왕",
      "의정부",
      "이천",
      "파주",
      "평택",
      "포천",
      "하남",
      "화성",
    ],
    경상남도: [
      "창원",
      "김해",
      "양산",
      "진주",
      "거제",
      "통영",
      "사천",
      "밀양",
      "함안",
      "거창",
      "창녕",
      "고성",
      "하동군",
      "합천",
      "경남 남해",
      "함양",
      "경남 산천",
      "경남 의령",
    ],
    경상북도: [
      "포항",
      "경주",
      "김천",
      "안동",
      "구미",
      "영주",
      "영천",
      "상주",
      "문경",
      "경산",
      "의성",
      "청송",
      "경북 영양",
      "영덕",
      "청도",
      "고령",
      "성주",
      "칠곡",
      "예천",
      "봉화",
      "울진",
      "울릉도",
    ],
    광주광역시: [
      "광주 광산구",
      "광주 동구",
      "광주 서구",
      "광주 남구",
      "광주 북구",
    ],
    전라남도: [
      "목포",
      "여수",
      "순천",
      "나주",
      "광양",
      "담양",
      "전남 곡성",
      "전남 구례",
      "고흥",
      "전남 보성",
      "전남 화순",
      "전남 장흥",
      "전남 강진",
      "해남",
      "전남 영암",
      "전남 무안",
      "전남 함평",
      "전남 영광",
      "전남 장성",
      "전남 완도",
      "전남 진도",
      "전남 신안",
    ],
    전북특별자치도: [
      "전주",
      "전북 완산",
      "전북 덕진",
      "군산",
      "익산",
      "전북 정읍",
      "전북 남원",
      "김제",
      "전북 완주",
      "전북 진안",
      "전북 무주",
      "전북 장수",
      "임실",
      "전북 순창",
      "전북 고창",
      "전북 부안",
    ],
    충청북도: [
      "청주",
      "충주",
      "제천",
      "보은",
      "옥천",
      "영동",
      "증평",
      "충북 진천",
      "괴산",
      "음성",
      "단양",
    ],
    충청남도: [
      "천안",
      "충남 공주",
      "보령",
      "아산",
      "서산",
      "논산",
      "계룡",
      "당진",
      "충남 금산",
      "충남 부여",
      "서천",
      "충남 청양",
      "충남 홍성",
      "충남 예산",
      "태안",
    ],
    대구광역시: [
      "대구 중구",
      "대구 동구",
      "대구 서구",
      "대구 남구",
      "대구 북구",
      "대구 수성구",
      "대구 달서구",
      "대구 달성군",
    ],
    대전광역시: [
      "대전 유성구",
      "대전 대덕구",
      "대전 서구",
      "대전 중구",
      "대전 동구",
      "대전 대덕구",
    ],
    서울특별시: [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "서울 중구",
      "중랑구",
    ],
    세종특별자치시: [""],
    울산광역시: [
      "울산 중구",
      "울산 남구",
      "울산 동구",
      "울산 북구",
      "울산 울주군",
    ],
    인천광역시: [
      "인천 중구",
      "인천 동구",
      "인천 미추홀구",
      "인천 연수구",
      "인천 남동구",
      "인천 부평구",
      "인천 계양구",
      "인천 서구",
      "강화도",
      "인천 옹진",
    ],
    제주특별자치도: ["제주 제주시", "제주 서귀포시"],
    부산광역시: [
      "부산 기장",
      "부산 금정",
      "해운대구",
      "부산 북구",
      "부산 동래",
      "부산 연제",
      "부산 수영",
      "부산진구",
      "부산 사상구",
      "부산 동구",
      "부산 서구",
      "부산 중구",
      "부산 사하구",
      "부산 영도구",
      "부산 남구",
      "부산 강서구",
    ],
  };

  const handleCreateChatRoom = async () => {
    const response = await ChatAxiosApi.chatCreate(chatRoomTitle);
    console.log(response.data);
    navigate(`/chatting/${response.data}`);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const newChatName = () => {
    // const newname = [area, city];
    // setChatName(newname);
    const title = area + " " + city;
    setChatRoomTitle(title);
  };
  useEffect(() => {
    newChatName();
    console.log(chatRoomTitle);
  }, [area]);

  return (
    <Container>
      <Kakao
        setCity={setArea}
        // taddr={selectedTravel?.taddr}
        // reviewClicked={reviewClicked}
      ></Kakao>
      <Citys>
        {area && data.area.map((mini) => <div key={mini.index}>{mini}</div>)}
      </Citys>

      <Title>채팅방 생성</Title>
      <Input
        type="text"
        value={chatRoomTitle}
        readOnly
        onChange={(e) => setChatRoomTitle(e.target.value)}
      />
      <ButtonContainer>
        <Button onClick={handleCreateChatRoom}>확인</Button>
        <Button onClick={handleCancel}>취소</Button>
      </ButtonContainer>
    </Container>
  );
}

export default ChatRoomCreate;
