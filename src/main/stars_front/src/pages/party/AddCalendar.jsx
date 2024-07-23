import styled from "styled-components";
import CosSave from "./CosSave";
import { useEffect, useRef, useState } from "react";
import PartyAxiosApi from "../../api/PartyAxiosApi";
import { FaPlus } from "react-icons/fa";
import CosUpdate from "./CosUpdate";
import { FaMinus } from "react-icons/fa";
import Modal2 from "../goodtrip/Modal";
import MyAxiosApi from "../../api/MyAxiosApi";
import { Outlet } from "react-router-dom";
import Common from "../../utils/Common";

const Container = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  background: #f4eedd;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 6px solid #000;
  box-shadow: 6px 6px 0 #000, 14px 14px 0 #000;
  color: #000;
  position: relative;
  @media (max-width: 768px) {
    width: 80%;
    order: 2;
    box-shadow: none;
    margin-top: 5px;
  }
`;

const Plan = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 10px;
  padding: 20px;
`;

const TodateBox = styled.div`
  width: 100%;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2c475a;
  border-bottom: 4px solid #000;
  @media (max-width: 768px) {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;
const Save = styled.div`
  overflow-y: auto;
`;

const OnePlan = styled.div`
  width: 100%;
  height: 100%;
  margin: 5px;
  background-color: #fff;
  border: 4px solid #000;
  font-size: 1.5rem;
  font-weight: bold;
  box-sizing: border-box;
  color: #000;
  @media (max-width: 1023px) {
    font-size: 1rem;
  }
`;
const OnePlanHead = styled.div`
  border-bottom: 4px solid #000;
  width: 100%;
  height: 20%;
  background-color: #000a5c;
  justify-content: space-between;
  display: flex;
`;

const OnePlanBody = styled.div`
  position: relative;
  left: 4%;
  top: 8%;
`;

const OnePlanFoot = styled.div`
  width: 100%;
  justify-content: right;
  display: flex;
`;

const InsertButton = styled.button`
  padding: 3px;
  position: relative;
  right: 2%;
  margin-bottom: 2%;
  color: white;
  background-color: #ff3366; /* 레트로 핑크 */
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  border: 3px solid black;
  cursor: pointer;
  @media (max-width: 1023px) {
    font-size: 1rem;
    font-weight: normal;
  }
`;

const CouseUpdateButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const CouseUpdateButton = styled.button`
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  background-color: white;
  padding: 0% 2%;
  margin-top: 3%;
  text-align: center;
`;

const PNick = styled.span`
  color: #fff;
  @media (max-width: 1023px) {
    font-size: 1rem;
    font-weight: normal;
  }
`;

const AddCalendar = ({
  fields,
  todate,
  setFields,
  pno,
  memberList,
  addView,
  setDivView,
  setLend,
  setAddView,
  roomId,
}) => {
  const [modalOpen, setModalOpen] = useState(false); // 모달 열림/닫힘 상태 관리
  const [caddr, setCaddr] = useState("");
  const [caContent, setcaContent] = useState("");
  const [cano, setCano] = useState(0);
  const [modalIsSaUp, setModalIsSaUP] = useState(false);
  const [place, setPlace] = useState(""); // 장소 이름 상태 추가

  const ws = useRef(null);
  const [sender, setSender] = useState("");

  useEffect(() => {
    // 이메일로 회원 정보 가져 오기
    const getMember = async () => {
      try {
        const rsp = await MyAxiosApi.memberDetail();
        // console.log(rsp.data.nick);
        setSender(rsp.data);
      } catch (error) {
        console.log(error);
      }
    };
    Common.getRefreshToken() && getMember();
  }, []);

  const onClickMsgClose = () => {
    ws.current.send(
      JSON.stringify({
        type: "CLOSE",
        roomId: roomId,
        sender: sender.nick,
        message: "종료 합니다.",
      })
    );
    ws.current.close();
  };

  const closeModal = () => {
    setModalOpen(false); // 모달 닫기
    setModalIsSaUP(false);
  };

  useEffect(() => {
    if (ws.current) {
      if (addView !== "chat") {
        console.log("연결끊음");
        onClickMsgClose();
      }
    }
  }, [addView]);

  useEffect(() => {
    setAddView("select");
  }, [pno]);

  const updateCos = async () => {
    if (place !== "") {
      try {
        console.log("place : " + place);
        const rsp = await PartyAxiosApi.updateCos(
          cano,
          caddr,
          caContent,
          place
        );
        setLend((prev) => !prev);
        setCaddr("");
        setcaContent("");
        setPlace("");
        closeModal();
      } catch (e) {
        console.log(e);
      }
    } else {
      closeModal();
    }
  };

  const addCosOne = async () => {
    if (caddr !== "") {
      try {
        console.log("place : " + place);
        const rsp = await PartyAxiosApi.cosOneSave(
          caddr,
          caContent,
          pno,
          todate,
          place
        );
        setLend((prev) => !prev);
        closeModal();
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("장소를 선택해주세요");
    }
  };

  const deleteCos = async (cano) => {
    try {
      const rsp = await PartyAxiosApi.cosDelete(cano);
      setLend((prev) => !prev);
      closeModal();
    } catch (e) {
      console.log(e);
    }
  };
  const onClickPlus = () => {
    if (todate === undefined) {
      alert("날짜를 선택해주세요.");
      // closeModal();
    } else {
      setModalOpen(true);
      setModalIsSaUP(true);
      setCaddr("");
      setcaContent("");
    }
  };
  if (addView === "save") {
    return (
      <Container>
        <Plan>
          <TodateBox>{todate}</TodateBox>
          <Save>
            <CosSave
              memberList={memberList}
              pno={pno}
              setFields={setFields}
              date={todate}
              fields={fields}
              setDivView={setDivView}
              setPlace={setPlace}
              place={place}
              setLend={setLend}
              setAddView={setAddView}
            />
          </Save>
        </Plan>
      </Container>
    );
  } else if (addView === "chat") {
    // {
    //   setSocketConnected(true);
    // }
    return (
      <Container>
        <Outlet />
      </Container>
    );
  } else {
    // console.log(addView + " addView");
    return (
      <>
        <Container>
          <TodateBox>
            {todate}
            <FaPlus color="#dbd5d5" onClick={onClickPlus} />
          </TodateBox>
          <Plan>
            {todate &&
              fields &&
              fields.map((one) => (
                <>
                  <OnePlan>
                    <OnePlanHead>
                      <PNick>{one.calenderNick}</PNick>
                      <FaMinus
                        color="#dbd5d5"
                        onClick={() => deleteCos(one.cano)}
                      />
                    </OnePlanHead>
                    <OnePlanBody>
                      <p>{one.cplace}</p>
                      <p>{one.caddr}</p>
                      <p>{one.caContent}</p>
                      {/* <img src={one.timage}></img> */}
                    </OnePlanBody>

                    <OnePlanFoot>
                      <InsertButton
                        onClick={() => {
                          setModalOpen(true);
                          setCaddr(one.caddr);
                          setcaContent(one.caContent);
                          setCano(one.cano);
                          //여기도 setPlace로 여행지 이름 넣어주기
                        }}
                      >
                        수정하기
                      </InsertButton>
                    </OnePlanFoot>
                  </OnePlan>
                </>
              ))}
          </Plan>
        </Container>
        {!modalIsSaUp && modalOpen && (
          <Modal2 open={modalOpen} close={closeModal} header="계획 수정">
            <CosUpdate
              caddr={caddr}
              setcaContent={setcaContent}
              memberList={memberList}
              setCaddr={setCaddr}
              caContent={caContent}
              place={place}
              setPlace={setPlace}
            ></CosUpdate>
            <CouseUpdateButtonBox>
              <CouseUpdateButton onClick={updateCos}>수정</CouseUpdateButton>
            </CouseUpdateButtonBox>
          </Modal2>
        )}
        {modalIsSaUp && modalOpen && (
          <Modal2 open={modalOpen} close={closeModal} header="계획 추가">
            <CosUpdate
              caddr={caddr}
              setcaContent={setcaContent}
              memberList={memberList}
              setCaddr={setCaddr}
              caContent={caContent}
              setPlace={setPlace}
              todate={todate}
            ></CosUpdate>
            <CouseUpdateButtonBox>
              <CouseUpdateButton onClick={addCosOne}>추가</CouseUpdateButton>
            </CouseUpdateButtonBox>
          </Modal2>
        )}
      </>
    );
  }
};

export default AddCalendar;
