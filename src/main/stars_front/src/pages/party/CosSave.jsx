import { useEffect, useState } from "react";
import styled from "styled-components";
import CosTravelList from "./CosTravelList";
import PartyAxiosApi from "../../api/PartyAxiosApi";

const Container = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-bottom: 10px;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const Button = styled.button`
  font-size: 1.5rem;
  font-weight: bold;
  border: none;
  background-color: #c33740;
  padding: 0% 2%;
  margin-top: 3%;
  text-align: center;
  border: 3px solid #000;
  cursor: pointer;

  &:hover {
    background-color: #ff3366;
  }
`;

const CosSave = ({
  setFields,
  fields,
  date,
  pno,
  setTodate,
  memberList,
  myNick,
  setDivView,
  setPlace,
  place,
}) => {
  useEffect(() => {}, [fields]);
  // useEffect(() => {
  //   setFields([]);
  // }, []);

  const addField = () => {
    setFields([...fields, ""]);
  };

  const saveCalendar = async () => {
    try {
      const rsp = await PartyAxiosApi.calendarCreate(pno, myNick, date, fields);
      console.log(`캘린더 성공 여부 : ${rsp.data}`);
      setFields([]);
      setDivView("calendar");
    } catch (e) {
      console.log(e);
    }
    console.log("확인");
    console.log(fields);
  };

  // const handleFieldChange = (index, field, value) => {
  //   const newFields = fields.map((f, i) =>
  //     i === index ? { ...f, [field]: value } : f
  //   );
  //   setFields(newFields);
  // };
  // useEffect(()=>{

  // },[])

  return (
    <>
      <Container>
        {fields.map((field, idx) => (
          <CosTravelList
            setPlace={setPlace}
            place={place}
            idx={idx}
            setFields={setFields}
            memberList={memberList}
            fields={fields}
          />
        ))}
        <ButtonBox>
          {fields.length > 0 && <Button onClick={saveCalendar}>확인</Button>}
          <Button onClick={addField}>추가</Button>
        </ButtonBox>
      </Container>
    </>
  );
};

export default CosSave;
