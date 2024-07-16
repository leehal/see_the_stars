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

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f4eedd;
`;
const Box = styled.div`
  width: 80%;
  display: flex;
  border: 5px solid black;
  background-color: #aec6cf;
`;
const Menu = styled.div`
  min-width: 300px;
  display: flex;
  font-size: 50px;
  font-weight: bold;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 40px 15px;
  border-right: 5px solid black;
`;
const Div = styled.div`
  cursor: pointer;
  color: ${({ active }) => (active ? `#bf00ff` : "black")};
  &:hover {
    color: #bf00ff;
  }
`;

const MyPage = () => {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
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

  useEffect(() => {
    if (!Common.getAccessToken()) {
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
          {onMenu()}
        </Box>
      </Container>
      <Modal open={modalOpen} close={closeModal} header={header}>
        {onEdit(type)}
      </Modal>
    </>
  );
};
export default MyPage;
