import { useEffect, useState } from "react";
import styled from "styled-components";
import DaumPostPopup from "../../component/DaumApi";
import DibsParty from "./DibsParty";
import Modal2 from "../goodtrip/Modal";

const InputBox = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-bottom: 2%;
  padding: 5%;
`;

const Input = styled.input`
  color: white;
  background-color: #ff3366; /* 레트로 핑크 */
  border-radius: 5px;
  border: 3px solid black;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 2%;
  text-align: center;
  padding: 2%;
  &:focus {
    border-color: #333;
    outline: none;
  }
  &::placeholder {
    color: white;
  }
`;

const CosTravelList = ({
  idx,
  setFields,
  memberList,
  fields,
  setPlace,
  place,
}) => {
  const [modalOpen, setModalOpen] = useState(false); // 모달 열림/닫힘 상태 관리
  const [popTrue, setPopTrue] = useState(false);
  const [cos, setCos] = useState({
    caddr: "", // 장소 주소
    caContent: "", // 메모 내용
    cplace: "",
  });

  const closeModal = () => {
    setModalOpen(false); // 모달 닫기
    setPopTrue(false);
    // setCos();
  };

  const updateFieldIdx = () => {
    setFields((prevFieldList) => {
      const newFieldList = [...prevFieldList];
      newFieldList[idx] = cos;
      return newFieldList;
    });
  };

  const handleAddrChange = (value) => {
    setCos((prevCos) => ({ ...prevCos, caddr: value, cplace: place })); // 주소 변경 시 cos 상태 업데이트
    console.log(cos);
  };

  const handleContentChange = (value) => {
    setCos((prevCos) => ({ ...prevCos, caContent: value })); // 메모 변경 시 cos 상태 업데이트
  };

  // cos 상태가 변경될 때마다 updateFieldIdx 호출
  useEffect(() => {
    updateFieldIdx();
  }, [cos]);

  return (
    <>
      <InputBox>
        <Input
          type="text"
          value={cos.caddr} // 장소 주소 값을 보여줌
          onFocus={() => setModalOpen(true)} // 주소 필드에 포커스할 때 모달 열기
          placeholder="장소"
        />
        <Input
          type="text"
          onChange={(e) => handleContentChange(e.target.value)} // 메모 입력 처리
          placeholder="메모"
        />
      </InputBox>
      {/* DaumPostPopup 모달을 열기 위해 modalOpen 상태를 사용 */}
      {popTrue && modalOpen && (
        <DaumPostPopup
          setPlace={setPlace}
          open={modalOpen} // 모달 열림/닫힘 상태
          setAddr={handleAddrChange} // 주소 선택 완료 시 호출될 함수
          onClose={closeModal} // 모달 닫기 함수
        />
      )}
      {!popTrue && modalOpen && (
        <Modal2 open={modalOpen} close={closeModal} header="내모임생성">
          <Input
            type="text"
            onFocus={() => setPopTrue(true)}
            placeholder="주소로 검색"
          />
          <DibsParty
            setPlace={setPlace}
            memberList={memberList}
            closeModal={closeModal}
            handleAddrChange={handleAddrChange}
          />
        </Modal2>
      )}
    </>
  );
};

export default CosTravelList;
