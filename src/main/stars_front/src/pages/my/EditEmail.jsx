import { useState } from "react";
import styled from "styled-components";
import AuthAxiosApi from "../../api/AuthAxiosApi";
import { GoLock, GoMail } from "react-icons/go";
import emailjs from "@emailjs/browser";

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
const EmailIcon = styled(GoMail)`
  color: gray;
  font-size: 1.5em;
  height: 30px;
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
    const certification = Math.floor(Math.random() * 900000) + 100000;
    setCheckCert(certification);
    const templateParams = {
      email: email,
      certification: certification,
    };
    try {
      await emailjs.send(
        "service_kr7pxmb",
        "template_lrutw4m",
        templateParams,
        "WQbPpTPtl4ML1Reqd"
      );
      setIsClickCert(true);
      setCheckEmail(email);
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
    <Container>
          <InputBox>
            <input placeholder={member.email} disabled={true} />
          </InputBox>
      <InputBox>
        <EmailIcon style={{ color: `gray` }} />
        <input
          style={{ fontSize: `25px`, paddingTop: `5px` }}
          type="text"
          placeholder="새 이메일"
          onChange={(e) => onChangeEmail(e)}
          // onKeyDown={(e) =>
          //   Common.onKeyDownEnter(e, isClickCert ? onClickJoin : onClickCert)
          // }
          disabled={isClickCert}
        />
        <Binbox></Binbox>
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
    </Container>
  );
};
export default EditEamil;
