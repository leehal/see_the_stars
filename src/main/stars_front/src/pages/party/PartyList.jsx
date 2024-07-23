import styled from "styled-components";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaBars } from "react-icons/fa"; // FaBars 아이콘 import 확인
import PartyAxiosApi from "../../api/PartyAxiosApi";
import PartySave from "./PartySave";
import { useLocation, useNavigate } from "react-router-dom";
import { PiXSquare } from "react-icons/pi";
import Modal2 from "../goodtrip/Modal";
import Heart from "../../image/New Piskel (2).gif";
import Common from "../../utils/Common";

const Container = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  background-color: #2c475a;
  border-right: 6px solid black;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0.1, 0.1, 0.1);
  z-index: 1;
  transition: transform 0.3s ease;
  @media (max-width: 768px) {
    width: 30%;
    height: 66vh;
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")}; /* 가시성 제어 */
    z-index: 99;
    position: fixed;
  }
`;

const PnameBox = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  position: relative;
  overflow-y: auto;
  gap: 10px;
  @media (max-width: 768px) {
    height: 100%;
  }
`;

const ToggleButton = styled.div`
  position: absolute;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  width: 10%;
  height: 7%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 769px) {
    display: none;
  }
`;

const ToggleX = styled.button`
  top: 0;
  position: absolute;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  width: 100%;
  justify-content: end;
  display: flex;
  align-items: center;
  @media (min-width: 769px) {
    display: none;
  }
`;

const ListBox = styled.div`
  width: 100%;
  text-align: center;
  height: 8%;
  font-size: 1.5rem;
  color: white;
  background-color: #663399;
  border-bottom: 3px solid black;
  border-top: 3px solid black;
  position: relative;
  display: flex;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  @media (max-width: 1023px) {
    font-size: 1rem;
  }
  @media (max-width: 768px) {
    height: 10%;
    width: 100%;
    border: 3px solid black;
  }
`;

const ListNameBox = styled.div`
  position: relative;
  top: 10%;
  left: 5%;
`;

const ListIconBox = styled.div`
  width: 10%;
  position: relative;
  top: 8%;
  left: 25%;
  @media (max-width: 1469px) {
    left: 10%;
  }
`;

const PartyName = styled.div`
  position: relative;
  width: 80%;
  height: 50px;
  background-color: #aec6cf;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid black;
  border-radius: 10px;
  font-size: 1.7rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #b3e0ff;
  }
  svg {
    font-weight: bold;
    position: absolute;
    right: 2%;
  }
  /* @media (max-width: 1023px) {
    font-size: 1rem;
  } */
`;

const Div = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  cursor: pointer;
  width: 20%;
  background-color: #ff3366;
  color: #fff;
  padding: 5px;
  border: 3px black solid;
  margin: 5px;
  font-weight: bold;

  &:hover {
    color: #fff;
  }
`;

const DelText = styled.div`
  padding: 20px;
  border-bottom: 2px solid #000;
  width: 90%;
`;

const PartyList = ({
  setPno,
  myNick,
  pno,
  setNowPname,
  nowPname,
  lend,
  setLend,
}) => {
  const [pNameList, setPNameList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const closeModal = () => setModalOpen(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const PartyName = async () => {
      try {
        const rsp = await PartyAxiosApi.pnameList();
        setPNameList(rsp.data);
        if (rsp.data.length === 0) {
          alert("모임이 없습니다. 모임을 생성해주세요.");
        } else {
          if (pno === undefined && rsp.data.length > 0) {
            setPno(rsp.data[0].pno);
          }
          if (nowPname === undefined && rsp.data.length > 0) {
            setNowPname(rsp.data[0].pname);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    Common.getRefreshToken() && PartyName();
  }, [modalOpen, lend]);

  const deleteParty = async (partyno) => {
    try {
      await PartyAxiosApi.deletepno(partyno);
      setDeleteModal(false);
      setLend((prev) => !prev);
      setPno(undefined);
      closeModal();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ToggleButton onClick={() => setIsOpen((prev) => !prev)}>
        <img src={Heart} />
      </ToggleButton>
      <Container isOpen={isOpen}>
        <ListBox>
          <ToggleX onClick={() => setIsOpen(false)}>
            <PiXSquare fontSize={"1.5rem"} />
          </ToggleX>
          <ListNameBox>내모임 리스트</ListNameBox>
          <ListIconBox>
            <FaPlus
              color="white"
              onClick={() => {
                setModalOpen(true);
                setDeleteModal(false);
              }}
            />
          </ListIconBox>
        </ListBox>
        <PnameBox>
          {pNameList &&
            pNameList.map((p) =>
              pno === p.pno ? (
                <PartyName
                  key={p.pno}
                  onClick={() => {
                    setPno(p.pno);
                    setNowPname(p.pname);
                  }}
                  style={{ background: `#c33740` }}
                >
                  <p>{p.pname}</p>
                  <PiXSquare
                    onClick={() => {
                      setDeleteModal(true);
                      setModalOpen(true);
                    }}
                  />
                </PartyName>
              ) : (
                <PartyName
                  key={p.pno}
                  onClick={() => {
                    setPno(p.pno);
                    setNowPname(p.pname);
                    if (location.pathname !== "/party") {
                      navigate("/party");
                    }
                  }}
                >
                  <p>{p.pname}</p>
                </PartyName>
              )
            )}
        </PnameBox>
      </Container>

      {!deleteModal && modalOpen && (
        <Modal2 open={modalOpen} close={closeModal} header="내모임생성">
          <PartySave
            closeModal={closeModal}
            myNick={myNick}
            setPno={setPno}
          ></PartySave>
        </Modal2>
      )}
      {deleteModal && modalOpen && (
        <Modal2 open={modalOpen} close={closeModal} header="모임 나가기">
          <Div>
            <DelText>정말로 나가시겠습니까?</DelText>
            <ButtonBox>
              <Button onClick={() => deleteParty(pno)}>예</Button>
              <Button onClick={closeModal}>아니요</Button>
            </ButtonBox>
          </Div>
        </Modal2>
      )}
    </>
  );
};

export default PartyList;
