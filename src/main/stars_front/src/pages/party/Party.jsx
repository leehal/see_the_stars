import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PartyList from "./PartyList";
import PartyView from "./PartyView";
import MyAxiosApi from "../../api/MyAxiosApi";
import Common from "../../utils/Common";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  /* margin-bottom: 1.5%; */
  width: 100%;
  height: 66vh;
  background-color: #f4eedd;
  display: flex; // Flexbox 활성화
  justify-content: space-between; // 양옆으로 배치
  align-items: stretch; // 세로로 꽉 차게 정렬
  @media (max-width: 1024px) {
    height: 66vh;
  }
  @media (max-width: 768px) {
    height: 70vh;
  }
`;

const Party = () => {
  const now = new Date();
  const navigate = useNavigate();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [writer, setWriter] = useState();
  const [pno, setPno] = useState();
  const [nowPname, setNowPname] = useState();
  const [lend, setLend] = useState(false);

  function formatNumber(number) {
    return number.toString().padStart(2, "0");
  }

  const onClickDay = (e, type) => {
    switch (type) {
      case `-`:
        setMonth(month === 0 ? 11 : month - 1);
        break;
      case `+`:
        setMonth(month === 0 ? 11 : month + 1);
        break;
      default:
        break;
    }

    console.log(`${year}-${formatNumber(month + 1)}-${formatNumber(e)}`);
  };
  useEffect(() => {
    !Common.getRefreshToken() && navigate("/login");
  }, []);

  return (
    <>
      <Container>
        <PartyList
          setPno={setPno}
          pno={pno}
          setNowPname={setNowPname}
          nowPname={nowPname}
          lend={lend}
          setLend={setLend}
        ></PartyList>
        <PartyView
          pno={pno}
          setNowPname={setNowPname}
          nowPname={nowPname}
          setLend={setLend}
          lend={lend}
        ></PartyView>
      </Container>
    </>
  );
};

export default Party;
