import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Common from "../../utils/Common";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const Year = styled.div`
  width: 100%;
  color: #f4eedd;
  /* border-radius: 0 10px 0 0; */
  background-color: #c33740;
  border-bottom: solid 4px #000;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const YearSpan = styled.span`
  font-size: 2rem;
  padding: 1rem;
  color: white;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 0.2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
    padding: 0.1rem;
  }
`;
const Box1 = styled.div`
  display: flex;
  justify-content: right;
  align-items: flex-end;
  padding-bottom: 2%;
  width: 20%;
  height: 100%;
  position: absolute;
  right: 1px;
  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 0.2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
    padding: 0.1rem;
  }
`;
const Week = styled.div`
  width: 14%;
  height: 20%;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  color: black;
  @media (max-width: 768px) {
    height: 0%;
  }
`;
const DayBox = styled.div`
  border: 2px solid #000000;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  /* border-radius: 60%; */
  font-size: 1.2rem;
  width: 14%;
  height: 35%;
  position: relative;
  cursor: pointer;
  &:hover {
    background-color: #dee2e6;
  }
  @media (max-width: 1024px) {
    height: 34%;
  }
  @media (max-width: 768px) {
    height: 20%;
  }
  @media (max-width: 480px) {
    height: 20%;
  }
`;
const Day = styled.div`
  padding-left: 0.7rem;
  padding-top: 0.5rem;
  user-select: none;
  color: black;
  /* @media (max-width: 768px) {
    background-color: red;
  } */
`;
const Box = styled.div`
  width: 96%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  @media (max-width: 768px) {
    position: absolute;
    right: 0;
    width: 70%;
    bottom: 0%;
    height: 90%;
    top: 10%;
  }
`;
const Head = styled.div`
  padding: 2%;
  display: flex;
  justify-content: center;
  /* background-color: tomato; */
  @media (max-width: 768px) {
    position: absolute;
    left: 0;
    width: 30%;
    bottom: 35%;
  }
  @media (max-width: 480px) {
    padding: 1%;
  }
`;
const CalendarDiv = styled.div`
  border-radius: 50%;
  width: 100%;
  height: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
const CalenContainer = styled.div`
  border: 6px solid #000;
  width: 80%;
  height: 100%;
  /* justify-content: center; */
  align-items: center;
  display: flex;
  flex-direction: column;
  box-shadow: 6px 6px 0 #aaa7a7, 14px 14px 0 #5f5d5d;
  background-color: #f4eedd;
  overflow-y: auto;
  /* border-radius: 10px 10px 10px 10px; */
  @media (max-width: 768px) {
    position: relative;
  }
`;
const Span = styled.span`
  font-size: 2rem;
  padding: 1rem;
  color: black;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 0.5rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
    /* padding: 0.1rem; */
  }
`;
const Button = styled.button`
  font-size: 2rem;
  padding-top: 0.3rem;
  font-weight: bold;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
const CalendarBox = ({ setTodate, setDivView, setAddView, plan, todate }) => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const formatDate = (date) => {
    // date 객체에서 연도, 월, 일을 추출
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1을 해줘야 함
    const day = date.getDate().toString().padStart(2, "0"); // 일이 한 자리 숫자일 경우 앞에 0을 추가

    // "yyyy-MM-dd" 형식으로 조합
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {}, [year, month]);

  const onClickDay = (e, type) => {
    switch (type) {
      case `-`:
        setMonth(month === 0 ? 11 : month - 1);
        break;
      case `+`:
        setMonth(month === 11 ? 0 : month + 1);
        break;
      default:
        break;
    }
  };

  const createCalendar = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInLastMonth = new Date(year, month, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    const calendar = [];

    for (let i = 0; i < daysInMonth + firstDayOfWeek; i++) {
      if (i < firstDayOfWeek) {
        // 이전 달의 날짜
        const preDay = daysInLastMonth - firstDayOfWeek + i + 1;
        const date = new Date(year, month - 1, preDay);
        const formattedDate = formatDate(date);
        if (plan.includes(formattedDate)) {
          console.log(plan.includes(formattedDate));
          calendar.push(
            <DayBox
              key={`last-${i + 1}`}
              style={{ color: `#fff`, backgroundColor: `#2c475a;` }}
              onClick={(e) => {
                setTodate(Common.formatDate(date));
                setDivView("calendar");
                setAddView("plan");
              }}
            >
              <Day>{preDay}</Day>
            </DayBox>
          );
        } else {
          calendar.push(
            <DayBox
              key={`last-${i + 1}`}
              style={{ color: `#707070` }}
              onClick={(e) => {
                setTodate(Common.formatDate(date));
                setDivView("navi");
                setAddView("save");
              }}
            >
              <Day>{preDay}</Day>
            </DayBox>
          );
        }
      } else {
        // 현재 달의 날짜
        const day = i - firstDayOfWeek + 1;
        const date = new Date(year, month, day);
        const formattedDate = formatDate(date);
        if (plan.includes(formattedDate)) {
          calendar.push(
            <DayBox
              key={`day-${day}`}
              style={{
                color: `#fff`,
                fontWeight: `bold`,
                backgroundColor: `#2c475a`,
              }}
              onClick={(e) => {
                setTodate(Common.formatDate(date));
                setDivView("calendar");
                setAddView("plan");
              }}
            >
              <Day>{day}</Day>
            </DayBox>
          );
        } else {
          calendar.push(
            <DayBox
              key={`day-${day}`}
              style={{ fontWeight: `bold` }}
              onClick={(e) => {
                setTodate(Common.formatDate(date));
                setDivView("navi");
                setAddView("save");
              }}
            >
              <Day>{day}</Day>
            </DayBox>
          );
        }
      }
    }

    // 다음 달의 날짜
    if ((daysInMonth + firstDayOfWeek) % 7 !== 0) {
      for (let i = 0; i < 7 - ((daysInMonth + firstDayOfWeek) % 7); i++) {
        const date = new Date(year, month + 1, i + 1);
        const formattedDate = formatDate(date);
        if (plan.includes(formattedDate)) {
          calendar.push(
            <DayBox
              key={`next-${i + 1}`}
              style={{ color: `#fff`, backgroundColor: `#2c475a` }}
              onClick={(e) => {
                setTodate(Common.formatDate(date));
                setDivView("calendar");
                setAddView("plan");
              }}
            >
              <Day>{i + 1}</Day>
            </DayBox>
          );
        } else {
          calendar.push(
            <DayBox
              key={`next-${i + 1}`}
              style={{ color: `#707070` }}
              onClick={(e) => {
                setTodate(Common.formatDate(date));
                setDivView("navi");
                setAddView("save");
              }}
            >
              <Day>{i + 1}</Day>
            </DayBox>
          );
        }
      }
    }
    return calendar;
  };
  const onClickPre = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };
  const onClickNext = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <>
      <CalenContainer>
        <Year>
          <YearSpan>{year}</YearSpan>
          <Box1>
            <FaMapMarkerAlt
              fontSize="30px"
              cursor="pointer"
              onClick={() => {
                if (todate === "") {
                } else {
                  setDivView("navi");
                }
              }}
            />
          </Box1>
        </Year>
        <Head>
          <Button onClick={onClickPre}>&lt;</Button>
          <div>
            <Span>{month + 1}월</Span>
          </div>
          <Button onClick={onClickNext}>&gt;</Button>
        </Head>
        <Box>
          <Week>Sun</Week>
          <Week>Mon</Week>
          <Week>Tue</Week>
          <Week>Wen</Week>
          <Week>Tur</Week>
          <Week>Fri</Week>
          <Week>Sat</Week>
          <CalendarDiv>{createCalendar()}</CalendarDiv>
        </Box>
      </CalenContainer>
    </>
  );
};

export default CalendarBox;
