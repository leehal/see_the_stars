import { useState } from "react";
import styled from "styled-components";
import AuthAxiosApi from "../../api/AuthAxiosApi";
import { GoPerson, GoLock, GoMail, GoEye, GoEyeClosed } from "react-icons/go";

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

const EditEamil = ({
  input,
  setInput,
  message,
  setMessage,
  member,
  closeModal,
  onModify,
}) => {
  const [checkEmail, setCheckEmail] = useState("");
  const [isClickCert, setIsClickCert] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isCert, setIsCert] = useState(false);
  const [inputCert, setInputCert] = useState("");
  const [checkCert, setCheckCert] = useState("");

  const onChangeEmail = (e) => {
    // if (checkEmail !== e.target.value) {
    //   setIsClickCert(false);
    // }
    setInput(e.target.value);
  };

  const onClickEmail = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!input || !emailRegex.test(input)) {
      setMessage("이메일 주소가 정확한지 확인해 주세요.");
      setIsEmail(false);
    } else if (member?.email === input) {
      closeModal();
    } else {
      setMessage("");
      existEmail(input);
    }
  };

  const existEmail = async (email) => {
    try {
      const rsp = await AuthAxiosApi.existInfo(email, 2);
      console.log(`이메일:` + rsp.data);
      if (rsp.data) {
        setMessage("사용할 수 없는 이메일입니다. 다른 이메일을 입력해주세요");
        setIsEmail(false);
      } else {
        setMessage("");
        onCert(email);
        setIsEmail(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onCert = async (email) => {
    try {
      const rsp = await AuthAxiosApi.certEmail(email);
      console.log(`인증번호:` + rsp.data);
      if (rsp.data) {
        setCheckCert(rsp.data);
        setIsClickCert(true);
        setCheckEmail(email);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onClickModify = async () => {
    console.log(checkCert);
    if (checkCert != inputCert) {
      setMessage("인증번호가 일치하지 않습니다.");
    } else if (checkEmail !== input) {
      setMessage("이메일이 일치하지 않습니다.");
    } else {
      try {
        onModify(input, 4);
      } catch (e) {}
    }
  };

  return (
    <>
      <InputBox>
        <GoMail style={{ color: `gray` }} />
        <input
          type="text"
          placeholder="이메일"
          onChange={(e) => onChangeEmail(e)}
          // onKeyDown={(e) =>
          //   Common.onKeyDownEnter(e, isClickCert ? onClickJoin : onClickCert)
          // }
        />
      </InputBox>
      {isClickCert && (
        <>
          <InputBox>
            <GoLock style={{ color: `gray` }} />
            <input
              type="text"
              placeholder="인증번호"
              onChange={(e) => setInputCert(e.target.value)}
              maxLength={20}
            />
          </InputBox>
        </>
      )}
      <Error>{message}</Error>
      <button onClick={isClickCert ? onClickModify : onClickEmail}>
        {isClickCert ? `수정` : `인증`}
      </button>
    </>
  );
};
export default EditEamil;
