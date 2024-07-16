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

const EditId = ({
  input,
  setInput,
  message,
  setMessage,
  member,
  closeModal,
}) => {
  const onClickId = () => {
    const idRegex = /^[a-zA-Z0-9]{5,20}$/;
    if (!input || !idRegex.test(input)) {
      setMessage("아이디: 5~20자의 숫자,영문자만 사용 가능합니다.");
    } else if (member?.mid === input) {
      closeModal();
    } else {
      setMessage("");
      existId(input);
    }
  };

  const existId = async (id) => {
    try {
      const rsp = await AuthAxiosApi.existInfo(id, 1);
      console.log(`아이디:` + rsp.data);
      if (rsp.data) {
        setMessage("사용할 수 없는 아이디입니다. 다른 아이디를 입력해주세요");
      } else {
        setMessage("");
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
          placeholder="아이디"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={20}
          onKeyDown={(e) => Common.onKeyDownEnter(e, onClickId)}
        />
      </InputBox>
      <Error>{message}</Error>
      <button onClick={onClickId}>확인</button>
    </>
  );
};
export default EditId;
