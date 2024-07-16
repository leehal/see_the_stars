import { useState } from "react";
import styled from "styled-components";
import { GoLock, GoEye, GoEyeClosed } from "react-icons/go";
import AuthAxiosApi from "../../api/AuthAxiosApi";
import MyAxiosApi from "../../api/MyAxiosApi";

const InputBox = styled.div`
  display: flex;
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

const EditPw = ({ input, setInput, message, setMessage, onModify }) => {
  const [isEye, setIsEye] = useState(false);
  const [isEye1, setIsEye1] = useState(false);
  const [isEye2, setIsEye2] = useState(false);
  const [curPw, setCurPw] = useState("");
  const [checkPw, setCheckPw] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [isPw, setIsPw] = useState(false);
  const [isCurPw, setIsCurPw] = useState(false);

  const onClickPw = () => {
    const pwRegex = /^[a-zA-Z0-9]{5,20}$/;
    if (!(input === checkPw)) {
      setMessage("비밀번호가 일치하지 않습니다");
    } else if (!input || !pwRegex.test(input)) {
      setMessage("5~20자의 숫자,영문자를 사용해주세요.");
    } else {
      onModify(input, 2);
    }
  };

  const onClickCheck = async () => {
    try {
      const res = await MyAxiosApi.checkPw(curPw);
      if (res.data) {
        console.log("비밀번호 일치");
        setPwMessage("");
        setIsCurPw(true);
      } else {
        console.log("비밀번호 불일치");
        setPwMessage("정확한 비밀번호를 입력해 주세요");
        setIsCurPw(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <InputBox>
        <GoLock style={{ color: `gray` }} />
        <input
          type={isEye ? `text` : `password`}
          placeholder="현재 비밀번호"
          onChange={(e) => setCurPw(e.target.value)}
          disabled={isCurPw}
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
      <Error>{pwMessage}</Error>
      {isCurPw && (
        <>
          <InputBox>
            <GoLock style={{ color: `gray` }} />
            <input
              type={isEye1 ? `text` : `password`}
              placeholder="새 비밀번호"
              onChange={(e) => setInput(e.target.value)}
              maxLength={20}
            />
            {isEye1 ? (
              <GoEye
                onClick={() => {
                  setIsEye1(false);
                }}
                style={{ color: `gray` }}
              />
            ) : (
              <GoEyeClosed
                onClick={() => {
                  setIsEye1(true);
                }}
                style={{ color: `gray` }}
              />
            )}
          </InputBox>
          <InputBox>
            <GoLock style={{ color: `gray` }} />
            <input
              type={isEye2 ? `text` : `password`}
              placeholder="새 비밀번호 확인"
              onChange={(e) => setCheckPw(e.target.value)}
              maxLength={20}
            />
            {isEye2 ? (
              <GoEye
                onClick={() => {
                  setIsEye2(false);
                }}
                style={{ color: `gray` }}
              />
            ) : (
              <GoEyeClosed
                onClick={() => {
                  setIsEye2(true);
                }}
                style={{ color: `gray` }}
              />
            )}
          </InputBox>
          <Error>{message}</Error>
        </>
      )}

      <button onClick={isCurPw ? onClickPw : onClickCheck}>
        {isCurPw ? `수정` : `확인`}
      </button>
    </>
  );
};
export default EditPw;
