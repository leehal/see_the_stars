import styled from "styled-components";
import { GoPerson } from "react-icons/go";
import { useState } from "react";
import AuthAxiosApi from "../../api/AuthAxiosApi";
import Common from "../../utils/Common";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  button {
    background: #ff3f3f;
    padding: 10px 20px 0 20px;
    font-size: 25px;
    color: #fff;
    width: 200px;
    cursor: pointer;

    &:hover {
      background: #d64141;
    }
  }
`;
const InputBox = styled.div`
  display: flex;
  font-size: 20px;
  width: 80%;
  margin-bottom: 10px;
  height: 50px;
  padding: 10px;
  background: #fff;
  gap: 10px;
  input {
    border: none;
    outline: none;
    text-align: center;
    width: 100%;
  }
  ::placeholder {
    font-size: 22px;
    text-align: center;
  }
`;
const LockIcon = styled(GoPerson)`
  color: gray;
  font-size: 1.5em;
  height: 30px;
`;
const Binbox = styled.div`
  width: 25px;
  height: 30px;
`;
const Error = styled.div`
  color: #ff3f3f;
  width: 100%;
  font-size: 19px;
  justify-content: center;
  display: ${({ children }) => (children === "" ? `none` : `flex`)};
`;

const EditNick = ({
  input,
  setInput,
  message,
  setMessage,
  member,
  closeModal,
  onModify,
}) => {
  const [isNick, setIsNick] = useState(false);

  const onClickNick = () => {
    if (!input) {
      setMessage("닉네임을 입력해주세요.");
      setIsNick(false);
    } else if (member?.nick === input) {
      closeModal();
    } else {
      setMessage("");
      existNick(input);
    }
  };

  const existNick = async (nick) => {
    try {
      const rsp = await AuthAxiosApi.existInfo(nick, 3);
      console.log(`닉네임:` + rsp.data);
      if (rsp.data) {
        setMessage("사용할 수 없는 닉네임입니다. 다른 닉네임을 입력해주세요");
        setIsNick(false);
      } else {
        setMessage("");
        onModify(input, 3);
        setIsNick(true);
        alert("닉네임 변경이 완료되었습니다");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <InputBox>
        <LockIcon style={{ color: `gray` }} />
        <input
          style={{ fontSize: `25px`, paddingTop: `5px` }}
          type="text"
          placeholder="닉네임"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => Common.onKeyDownEnter(e, onClickNick)}
        />
        <Binbox></Binbox>
      </InputBox>
      <Error>{message}</Error>
      <button onClick={onClickNick}>수정</button>
    </Container>
  );
};
export default EditNick;
