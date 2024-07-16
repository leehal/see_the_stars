import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PartyList from "./PartyList";
import PartyView from "./PartyView";
import MyAxiosApi from "../../api/MyAxiosApi";

const Container = styled.div`
  /* margin-bottom: 1.5%; */
  width: 100vw;
  height: 70vh;
  background-color: #f4eedd;
  display: flex; // Flexbox 활성화
  justify-content: space-between; // 양옆으로 배치
  align-items: stretch; // 세로로 꽉 차게 정렬
  @media (max-width: 768px) {
    height: 70vh;
  }
`;

const Party = () => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [writer, setWriter] = useState();
  const [pno, setPno] = useState();
  const [myNick, setMyNick] = useState();
  const [nowPname, setNowPname] = useState();
  const [lend, setLend] = useState(false);

  // useEffect(() => {}, [lend]);

  const memberDetail = async () => {
    try {
      const res = await MyAxiosApi.memberDetail();
      console.log(res.data);
      setMyNick(res.data.nick);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    memberDetail();
  }, []);

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

  //달력생성
  const createCalendar = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 그달 일수
    const daysInLastMonth = new Date(year, month, 0).getDate(); // 전달 일수
    const firstDayOfWeek = new Date(year, month, 1).getDay(); //그달 1일의 요일

    const calendar = [];

    for (let i = 0; i < daysInMonth + firstDayOfWeek; i++) {
      if (i < firstDayOfWeek) {
        const preDay = daysInLastMonth - firstDayOfWeek + i + 1;
        calendar.push(
          <div
            key={`last-${i + 1}`}
            onClick={() => onClickDay(preDay, `-`)}
            style={{ color: `#707070` }}
          >
            <div>{preDay}</div>
          </div>
        );
      } else {
        const day = i - firstDayOfWeek + 1;
        calendar.push(
          <div
            key={`day-${day}`}
            style={{ fontWeight: `bold` }}
            onClick={() => onClickDay(day)}
          >
            <div>{day}</div>
            <div>
              {writer
                ?.filter(
                  (e) =>
                    e.sdate ===
                    `${year}-${formatNumber(month + 1)}-${formatNumber(day)}`
                )
                ?.map((e) => (
                  <div id={e.id} />
                ))}
            </div>
          </div>
        );
      }
    }

    if ((daysInMonth + firstDayOfWeek) % 7 !== 0) {
      for (let i = 0; i < 7 - ((daysInMonth + firstDayOfWeek) % 7); i++) {
        calendar.push(
          <div
            key={`next-${i + 1}`}
            onClick={(e) => onClickDay(i + 1, `+`)}
            style={{ color: `#707070` }}
          >
            <div>{i + 1}</div>
          </div>
        );
      }
    }
    return calendar;
  };

  return (
    <>
      <Container>
        <PartyList
          setPno={setPno}
          myNick={myNick}
          pno={pno}
          setNowPname={setNowPname}
          nowPname={nowPname}
          lend={lend}
          setLend={setLend}
        ></PartyList>
        <PartyView
          pno={pno}
          setNowPname={setNowPname}
          myNick={myNick}
          nowPname={nowPname}
          setLend={setLend}
          lend={lend}
        ></PartyView>
      </Container>
    </>
  );
};

export default Party;
