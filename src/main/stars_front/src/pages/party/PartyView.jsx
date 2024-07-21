import styled from "styled-components";
import CalendarBox from "./CalendarBox";
import { useEffect, useState } from "react";
import Navi from "../goodtrip/navi";
import AddCalendar from "./AddCalendar";
import PartyAxiosApi from "../../api/PartyAxiosApi";
import Profile from "../../component/Profile";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import Modal from "../../component/Modal";
import PartyUpdate from "./PartyUpdate";
import Chat from "../../image/chatWhite.png";

// 레트로 스타일 폰트 지정

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85%;
  height: 100%;
  background-color: #f4eedd;
  color: #fff; /* 레트로 색상 */
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 480px) {
    width: 100%;
    height: 100%;
  }
`;

const Profiles = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainFun = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  align-items: center;
  background-color: #aec6cf;
  border: 6px solid black;

  @media (max-width: 768px) {
    width: 90%;
    height: 90%;
    flex-direction: column-reverse;
    overflow: hidden;
    overflow-y: auto;
    gap: 30px;
  }
`;

const LeftBox = styled.div`
  flex-direction: column;
  width: 50%;
  height: 90%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    height: 60%;
    flex-direction: column;
  }
`;

const RightBox = styled.div`
  flex-direction: column;
  width: 50%;
  height: 90%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
    flex-direction: column;
    position: relative;
  }
`;

const Map = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  width: 80%;
  /* margin-bottom: 2%; */
  height: 15%;
  background-color: #333;
  padding: 0 2%;
  box-shadow: 6px 6px 0 #000, 14px 14px 0 #000; /* 그림자 효과 */
  border: 3px solid #000;
  @media (max-width: 768px) {
    order: 1;
    width: 100%;
    top: 0;
    height: 20%;
    border-radius: 0%;
    box-shadow: none;
    overflow-y: auto;
  }
`;

const Input = styled.input`
  width: 40%;
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
  display: flex;
  font-size: 1.5rem;
  @media (max-width: 830px) {
    width: 75%;
  }
`;

const MemberBox = styled.div`
  width: 80%;
  display: flex;
  justify-content: right;
  align-items: center;
  @media (max-width: 768px) {
    top: 49px;
    order: 3;
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 1;
    left: -35%;
  }
`;

const Chatting = styled.div`
  width: 22%;
  display: flex;
  justify-content: flex-end;
  img {
    width: 85px;
  }
  @media screen and (max-width: 768px) {
    img {
      width: 50px;
    }
  }
`;

const PartyView = ({ pno, nowPname, setLend, lend, setNowPname }) => {
  const [divView, setDivView] = useState("calendar");
  const [todate, setTodate] = useState();
  const [fields, setFields] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [addView, setAddView] = useState("select");
  const [plan, setPlan] = useState([]); // 이미 저장된 날짜들 파란색으로 칠해주기 위함
  const [roomId, setRoomId] = useState("");
  const [newName, setNewName] = useState("");
  const [focus, setFocus] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const closeModal = () => setModalOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (pno === undefined) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [pno]);

  const goUpdate = async (e) => {
    if (e.key === "Enter") {
      try {
        console.log("확인 : " + pno + " " + newName);
        const rsp = await PartyAxiosApi.updatePname(pno, newName);
        setFocus(true);
        setNowPname(newName);
        setLend((prev) => !prev);
        setNewName("");
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    const pMemberList = async () => {
      try {
        const res = await PartyAxiosApi.pnoMemberList(pno);
        setMemberList(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    pMemberList();
    setFields([]);
    setDivView("calendar");
    // setTodate();
  }, [pno, lend]);

  useEffect(() => {
    setFields([]);
  }, [pno, addView, divView]);

  useEffect(() => {
    setTodate();
  }, [pno]);

  useEffect(() => {
    const clickDayPlan = async () => {
      try {
        const res = await PartyAxiosApi.oneDayView(pno, todate);

        setFields(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    clickDayPlan();
  }, [todate, lend]);

  // 해당 pno에 따른 계획날짜 배열
  useEffect(() => {
    const calendatWithPno = async () => {
      try {
        const rsp = await PartyAxiosApi.calendarPno(pno);
        setPlan(rsp.data.dates);
        setRoomId(rsp.data.roomId);
      } catch (e) {
        console.log(e);
      }
    };
    calendatWithPno();
    setFocus(true);
  }, [pno, divView, lend]);

  const leftBoxChange = () => {
    if (divView === "calendar") {
      return (
        <CalendarBox
          pno={pno}
          setTodate={setTodate}
          setDivView={setDivView}
          setAddView={setAddView}
          plan={plan}
          todate={todate}
        ></CalendarBox>
      );
    } else {
      return (
        <Navi
          cosList={fields}
          todate={todate}
          setDivView={setDivView}
          setcosList={setFields}
        ></Navi>
      );
    }
  };

  return (
    <>
      <Container disabled={isDisabled}>
        <MainFun>
          <LeftBox>{leftBoxChange()}</LeftBox>
          <RightBox>
            <MemberBox>
              <Profiles>
                {memberList &&
                  memberList.map((member) => (
                    <Profile size={`2rem`} src={member.image} />
                  ))}
              </Profiles>
              <FaPlus color="#584ec2" onClick={() => setModalOpen(true)} />
            </MemberBox>
            <Map>
              {focus ? (
                <Input
                  readOnly={true}
                  type="text"
                  value={nowPname}
                  defaultValue={nowPname}
                  onFocus={() => setFocus(false)}
                />
              ) : (
                <Input
                  readOnly={false}
                  type="text"
                  placeholder={"모임 이름을 입력하세요."}
                  onChange={(e) => {
                    setNewName(e.target.value);
                  }}
                  onKeyDown={goUpdate}
                />
              )}
              <Chatting
                onClick={() => {
                  setAddView("chat");
                  navigate(`chat/${roomId}`);
                }}
              >
                <img src={Chat} alt="" />
              </Chatting>
            </Map>
            <AddCalendar
              roomId={roomId}
              memberList={memberList}
              pno={pno}
              todate={todate}
              setFields={setFields}
              setTodate={setTodate}
              fields={fields}
              addView={addView}
              setAddView={setAddView}
              setDivView={setDivView}
              setLend={setLend}
            />
          </RightBox>
        </MainFun>
      </Container>
      <Modal open={modalOpen} close={closeModal} header="파티 멤버 추가">
        <PartyUpdate
          closeModal={closeModal}
          pno={pno}
          memberList={memberList}
          setLend={setLend}
        ></PartyUpdate>
      </Modal>
    </>
  );
};
export default PartyView;
