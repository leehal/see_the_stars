import styled from "styled-components";
import { GoLock, GoEye, GoEyeClosed } from "react-icons/go";
import { useState } from "react";

const InputBox = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  height: 50px;
  padding: 0 20px;
  border: 3px solid black;
  border-radius: 10px;

  input {
    text-align: center;
    border: none;
    font-size: 23px;
    width: 90%;
    padding: 4px;
    font-weight: bold;
    background-color: transparent;
    outline: none;
    padding-top: 10px;
  }
  input::placeholder {
    font-size: 24px;
  }
  svg {
    font-size: 24px;
  }
`;
const Error = styled.div`
  color: #ff3f3f;
  width: 280px;
  font-size: 12px;
  justify-content: flex-start;
  display: ${({ children }) => (children === "" ? `none` : `flex`)};
`;

const FindPw = ({ setIsPw, setInputPw, setCheckPw, message }) => {
  const [isEye, setIsEye] = useState(false);

  const onBlurPw = (e) => {
    const pwRegex = /^[a-zA-Z0-9]{5,20}$/;
    if (!pwRegex.test(e.target.value)) {
      setIsPw(false);
    } else {
      setIsPw(true);
    }
  };

  return (
    <>
      <InputBox>
        <GoLock style={{ color: `gray` }} />
        <input
          type={isEye ? `text` : `password`}
          placeholder="새 비밀번호"
          onChange={(e) => setInputPw(e.target.value)}
          onBlur={(e) => onBlurPw(e)}
          maxLength={20}
        />
        {isEye ? (
          <GoEye
            onClick={() => {
              setIsEye(false);
            }}
            style={{ color: `gray` }}
          />
        ) : (
          <GoEyeClosed
            onClick={() => {
              setIsEye(true);
            }}
            style={{ color: `gray` }}
          />
        )}
      </InputBox>
      <InputBox>
        <GoLock style={{ color: `gray` }} />
        <input
          type={isEye ? `text` : `password`}
          placeholder="새 비밀번호 확인"
          onChange={(e) => setCheckPw(e.target.value)}
          maxLength={20}
        />
        {isEye ? (
          <GoEye
            onClick={() => {
              setIsEye(false);
            }}
            style={{ color: `gray` }}
          />
        ) : (
          <GoEyeClosed
            onClick={() => {
              setIsEye(true);
            }}
            style={{ color: `gray` }}
          />
        )}
      </InputBox>
      <Error>{message}</Error>
    </>
  );
};
export default FindPw;
