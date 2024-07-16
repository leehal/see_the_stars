import styled from "styled-components";
import { GoPerson } from "react-icons/go";
import { useState } from "react";
import AuthAxiosApi from "../../api/AuthAxiosApi";
import Common from "../../utils/Common";

const InputBox = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
  font-size: 20px;
  width: 250px;
  padding: 10px;
  gap: 10px;
  input {
    border: none;
    outline: none;
  }
`;

const Error = styled.div`
  color: #ff3f3f;
  width: 280px;
  font-size: 12px;
  justify-content: flex-start;
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
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <InputBox>
        <GoPerson style={{ color: `gray` }} />
        <input
          type="text"
          placeholder="닉네임"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => Common.onKeyDownEnter(e, onClickNick)}
        />
      </InputBox>
      <Error>{message}</Error>
      <button onClick={onClickNick}>수정</button>
    </>
  );
};
export default EditNick;
