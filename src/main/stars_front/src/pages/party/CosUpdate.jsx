import { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "../../component/Modal";
import DaumPostPopup from "../../component/DaumApi";
import DibsParty from "./DibsParty";

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  font-size: 1.25rem;
  box-sizing: border-box;
  background-color: #ff3366;
  border: 4px solid black;
  color: white;
  text-align: center;

  &:focus {
    border-color: #333;
    outline: none;
  }
  &::placeholder {
    color: white;
  }
`;

const CosUpdate = ({
  caddr,
  setcaContent,
  memberList,
  setCaddr,
  caContent,
  setPlace,
  place,
}) => {
  const [modalOpen, setModalOpen] = useState(false); // 모달 열림/닫힘 상태 관리
  const [popTrue, setPopTrue] = useState(false);

  const closeModal = () => {
    setModalOpen(false); // 모달 닫기
    setPopTrue(false);
    // setCos();
  };

  return (
    <>
      <InputBox>
        <Input
          type="text"
          value={caddr} // 장소 주소 값을 보여줌
          onFocus={() => setModalOpen(true)} // 주소 필드에 포커스할 때 모달 열기
          placeholder="장소"
        />
        <Input
          type="text"
          onChange={(e) => setcaContent(e.target.value)} // 메모 입력 처리
          value={caContent}
          placeholder="메모"
        />
        <p>{place}</p>
      </InputBox>
      {/* DaumPostPopup 모달을 열기 위해 modalOpen 상태를 사용 */}
      {popTrue && modalOpen && (
        <DaumPostPopup
          setPlace={setPlace}
          open={modalOpen} // 모달 열림/닫힘 상태
          setAddr={setCaddr} // 주소 선택 완료 시 호출될 함수
          onClose={closeModal} // 모달 닫기 함수
        />
      )}
      {!popTrue && modalOpen && (
        <Modal open={modalOpen} close={closeModal} header="내모임생성">
          <Input
            type="text"
            onFocus={() => setPopTrue(true)}
            placeholder="주소로 검색하기"
          />
          <DibsParty
            setPlace={setPlace}
            memberList={memberList}
            closeModal={closeModal}
            handleAddrChange={setCaddr}
          />
        </Modal>
      )}
    </>
  );
};

export default CosUpdate;
