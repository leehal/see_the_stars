import styled from "styled-components";
import Dibs from "./Dibs";
import My from "./My";
import { useEffect, useState } from "react";
import Modal from "../../component/Modal";
import EditId from "./EditId";
import EditPw from "./EditPw";
import EditNick from "./EditNick";
import EditEamil from "./EditEmail";
import { UserContext } from "../../context/UserStore";
import { useNavigate } from "react-router-dom";
import MyAxiosApi from "../../api/MyAxiosApi";
import Common from "../../utils/Common";
import MyReview from "./MyReview";
import Modal2 from "../goodtrip/Modal";
import ReviewStyle from "../goodtrip/ReviewStyle";

const Container = styled.div`
  display: flex;
  height: 80vh;
  justify-content: center;
  align-items: center;
  background-color: #f4eedd;
`;
const BoxBox = styled.div`
  width: 80%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #aec6cf;
  border: 8px solid black;
`;
const Box = styled.div`
  width: 80%;
  height: 60vh;
  display: flex;
  border-radius: 40px;
  background-color: #dc7530;
  border: 5px solid black;
  box-shadow: 6px 14px 0 #000, 14px 14px 0 #000; /* 그림자 효과 추가 */
  padding: 15px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const Menu = styled.div`
  min-width: 250px;
  display: flex;
  font-weight: bold;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  @media screen and (max-width: 768px) {
    flex-direction: row;
    gap: 10px;
  }
`;
const Div = styled.div`
  display: flex;
  font-size: 50px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  height: 130px;
  background-color: ${({ active }) => (active ? `white` : "transparent")};
  border-radius: ${({ active }) => (active ? `30px 0 0 30px` : "0")};
  z-index: 1;
  color: ${({ active }) => (active ? `#bf00ff` : "black")};

  &:hover {
    color: #bf00ff;
  }
  @media screen and (max-width: 768px) {
    flex-direction: row;
    font-size: 30px;
    height: 70px;
    width: 80%;
    border-radius: ${({ active }) => (active ? `30px 30px 0 0` : "0")};
  }
`;
const MyInfor = styled.div`
  width: 100%;
  min-height: 95%;
  padding: 13px 0;
  padding-right: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: ${({ category }) =>
    category === `profile` ? ` 0 40px 40px 40px` : "40px"};
  background: #fff;
  @media screen and (max-width: 768px) {
    border-radius: ${({ category }) =>
      category === `profile`
        ? ` 0 40px 40px 40px`
        : category === `reviews`
        ? `  40px 0 40px 40px`
        : "40px"};
    min-height: 80%;
  }
`;

const MyPage = () => {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [delModalOpen, setDelModalOpen] = useState(false);
  const [category, setCategory] = useState(`profile`);
  const [header, setHeader] = useState();
  const [member, setMember] = useState();
  const [type, setType] = useState();
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const closeModal = () => {
    setModalOpen(false);
    setMessage("");
    setInput("");
  };
  const onEdit = (type) => {
    switch (type) {
      case 2:
        return (
          <EditPw
            input={input}
            setInput={setInput}
            message={message}
            setMessage={setMessage}
            onModify={onModify}
          />
        );
      case 3:
        return (
          <EditNick
            closeModal={closeModal}
            member={member}
            input={input}
            setInput={setInput}
            message={message}
            setMessage={setMessage}
            onModify={onModify}
          />
        );
      case 4:
        return (
          <EditEamil
            closeModal={closeModal}
            member={member}
            input={input}
            setInput={setInput}
            message={message}
            setMessage={setMessage}
            onModify={onModify}
          />
        );
      default:
    }
  };

  const onModify = async (info, inputType) => {
    try {
      const res = await MyAxiosApi.editInfo(info, inputType);
      if (res.data) {
        console.log("수정성공");
        closeModal();
      } else {
        console.log("수정실패");
      }
    } catch (e) {
      console.log(e, "수정 오류");
    }
  };

  const onMenu = () => {
    switch (category) {
      case "profile":
        return (
          <My
            setModalOpen={setModalOpen}
            setHeader={setHeader}
            setType={setType}
            member={member}
            onModify={onModify}
            setDelModalOpen={setDelModalOpen}
            category={category}
          />
        );
      case "dibs":
        return <Dibs refresh={refresh} setRefresh={setRefresh} />;
      case "reviews":
        return <MyReview refresh={refresh} setRefresh={setRefresh} />;
      default:
        return;
    }
  };
  const onClickDel = async () => {
    try {
      const res = await MyAxiosApi.withdraw();
      if (res.data) {
        alert("회원탈퇴가 완료되었습니다.");
        localStorage.clear();
        navigate("/");
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (!Common.getRefreshToken()) {
      navigate("/login");
    }
    const memberDetail = async () => {
      try {
        const res = await MyAxiosApi.memberDetail();
        console.log(res.data);
        if (res.data) {
          setMember(res.data);
        } else {
          console.log("데이터 없음");
        }
      } catch (e) {
        console.log(e);
      }
    };
    memberDetail();
  }, [modalOpen]);
  useEffect(() => {
    console.log(category);
  }, [category]);

  return (
    <>
      <Container>
        <BoxBox>
          <Box>
            <Menu>
              <Div
                active={category === "profile"}
                onClick={() => setCategory(`profile`)}
              >
                내 프로필
              </Div>
              <Div
                active={category === "dibs"}
                onClick={() => setCategory(`dibs`)}
              >
                찜목록
              </Div>
              <Div
                active={category === "reviews"}
                onClick={() => setCategory(`reviews`)}
              >
                내가 쓴 후기
              </Div>
            </Menu>
            <MyInfor category={category}>{onMenu()}</MyInfor>
          </Box>
        </BoxBox>
      </Container>
      <Modal open={modalOpen} close={closeModal} header={header}>
        {onEdit(type)}
      </Modal>
      <Modal2
        open={delModalOpen}
        close={() => setDelModalOpen(false)}
        header="회원탈퇴"
      >
        <ReviewStyle.DeleteContainer>
          정말로 탈퇴하시겠습니까?
        </ReviewStyle.DeleteContainer>
        <ReviewStyle.Line></ReviewStyle.Line>
        <ReviewStyle.Modal2Footer>
          <></>
          <ReviewStyle.DeleteYNButtonBox>
            <ReviewStyle.DeleteYNButton onClick={onClickDel}>
              예
            </ReviewStyle.DeleteYNButton>
          </ReviewStyle.DeleteYNButtonBox>
          <ReviewStyle.DeleteYNButtonBox>
            <ReviewStyle.DeleteYNButton onClick={() => setDelModalOpen(false)}>
              아니오
            </ReviewStyle.DeleteYNButton>
          </ReviewStyle.DeleteYNButtonBox>
        </ReviewStyle.Modal2Footer>
      </Modal2>
    </>
  );
};
export default MyPage;
