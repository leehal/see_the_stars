import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  justify-content: center;
  z-index: 999;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
`;

const ModalFriend = ({
  content,
  isOpen,
  onRequestClose,
  onAgree,
  onReject,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  if (!modalOpen) return null;

  return (
    <ModalBackground>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>친구 요청 도착!</h2>
        <p>{content.from} 님으로부터 친구 요청이 도착했습니다.</p>
        <button onClick={onAgree}>수락</button>
        <button onClick={onReject}>거절</button>
      </ModalContent>
    </ModalBackground>
  );
};

export default ModalFriend;
