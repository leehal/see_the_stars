import { useState } from "react";
import styled from "styled-components";
import { GoLock, GoEye, GoEyeClosed } from "react-icons/go";
import MyAxiosApi from "../../api/MyAxiosApi";

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
const LockIcon = styled(GoLock)`
  color: gray;
  font-size: 1.5em;
  height: 30px;
`;

const EyeIcon = styled(GoEye)`
  color: gray;
  font-size: 1.5em;
  cursor: pointer;
  height: 30px;
`;

const EyeClosedIcon = styled(GoEyeClosed)`
  color: gray;
  font-size: 1.5em;
  cursor: pointer;
  height: 30px;
`;
const InputBox = styled.div`
  display: flex;
  font-size: 20px;
  width: 100%;
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
const Error = styled.div`
  color: #ff3f3f;
  width: 100%;
  font-size: 20px;
  justify-content: center;
  display: ${({ children }) => (children === "" ? `none` : `flex`)};
`;

const EditPw = ({ input, setInput, message, setMessage, onModify }) => {
  const [isEye, setIsEye] = useState(false);
  const [isEye1, setIsEye1] = useState(false);
  const [isEye2, setIsEye2] = useState(false);
  const [curPw, setCurPw] = useState("");
  const [checkPw, setCheckPw] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [isCurPw, setIsCurPw] = useState(false);

  const onClickPw = () => {
    const pwRegex = /^[a-zA-Z0-9]{5,20}$/;
    if (!(input === checkPw)) {
      setMessage("비밀번호가 일치하지 않습니다");
    } else if (!input || !pwRegex.test(input)) {
      setMessage("5~20자의 숫자,영문자를 사용해주세요.");
    } else {
      onModify(input, 2);
      alert("비밀번호 변경이 완료되었습니다");
    }
  };

  const onClickCheck = async () => {
    try {
      const res = await MyAxiosApi.checkPw(curPw);
      if (res.data) {
        // console.log("비밀번호 일치");
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
      <Container>
        <InputBox>
          <LockIcon style={{ color: `gray` }} />
          <input
            type={isEye ? `text` : `password`}
            placeholder="현재 비밀번호"
            onChange={(e) => setCurPw(e.target.value)}
            disabled={isCurPw}
            maxLength={20}
            style={{ fontSize: `25px`, paddingTop: `5px` }}
          />
          {isEye ? (
            <EyeIcon
              onClick={() => {
                setIsEye(false);
              }}
              style={{ color: `gray` }}
            />
          ) : (
            <EyeClosedIcon
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
              <LockIcon style={{ color: `gray` }} />
              <input
                type={isEye1 ? `text` : `password`}
                placeholder="새 비밀번호"
                onChange={(e) => setInput(e.target.value)}
                maxLength={20}
                style={{ fontSize: `25px`, paddingTop: `5px` }}
              />
              {isEye1 ? (
                <EyeIcon
                  onClick={() => {
                    setIsEye1(false);
                  }}
                  style={{ color: `gray` }}
                />
              ) : (
                <EyeClosedIcon
                  onClick={() => {
                    setIsEye1(true);
                  }}
                  style={{ color: `gray` }}
                />
              )}
            </InputBox>
            <InputBox>
              <LockIcon style={{ color: `gray` }} />
              <input
                type={isEye2 ? `text` : `password`}
                placeholder="새 비밀번호 확인"
                onChange={(e) => setCheckPw(e.target.value)}
                maxLength={20}
                style={{ fontSize: `25px`, paddingTop: `5px` }}
              />
              {isEye2 ? (
                <EyeIcon
                  onClick={() => {
                    setIsEye2(false);
                  }}
                  style={{ color: `gray` }}
                />
              ) : (
                <EyeClosedIcon
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
      </Container>
    </>
  );
};
export default EditPw;
