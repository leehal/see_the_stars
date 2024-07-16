import { useEffect, useState } from "react";
import styled from "styled-components";
import PartyAxiosApi from "../../api/PartyAxiosApi";
import { FaStar } from "react-icons/fa6";
import MyAxiosApi from "../../api/MyAxiosApi";
import Basic from "../../image/로고.png";

const Container = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
  /* border: 1px solid green; */
  overflow-y: auto;
  background-color: #fff;
`;

// const DibBox = styled.div`
//   border: 1px solid green;
// `;

const DivBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DivHeader = styled.div`
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 6px solid #000;
  background-color: #ff3366; /* 레트로 보라색 */
  width: 100%;
  margin-bottom: 10px;
  color: #000; /* 텍스트 색상 */
  font-weight: bold;
`;

const Div = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 70%;
  border: 6px solid #000; /* 레트로 핑크 */
  color: black;
  margin-top: 20px;
  box-shadow: 6px 6px 0 #000; /* 그림자 효과 추가 */
  background-color: white;
`;
const TextBox = styled.div`
  position: relative;
  left: 8%;
`;

// const Heart = styled.div`
//   position: relative;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
//   width: 16%;
//   height: 70%;
//   border-radius: 50%;
//   background-color: black;
//   opacity: 0.5;
//   right: 2%;
//   &:hover {
//     opacity: 1;
//   }
// `;
const DivFooter = styled.div`
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 6px solid #000;
  background-color: #663399; /* 레트로 보라색 */
  width: 100%;
  color: #000; /* 텍스트 색상 */
  padding: 0% 8%;
`;

// const FooterTextBox = styled.div`
//   padding: 0% 5%;
// `;

const Image = styled.div`
  width: 200px;
  height: 200px;
  margin-bottom: 4%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DibsParty = ({ closeModal, handleAddrChange, memberList, setPlace }) => {
  const [dibList, setDibList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const onClickUndibs = async (tno) => {
    try {
      const res = await MyAxiosApi.undibs(tno);
      if (res.data) {
        console.log("성공");
        setRefresh(!refresh);
      } else {
        console.log("실패");
      }
    } catch (e) {}
  };

  useEffect(() => {
    const memberDivs = async () => {
      try {
        const rsp = await PartyAxiosApi.partyMemDibs(memberList);
        setDibList(rsp.data);
        console.log(rsp.data);
      } catch (e) {
        console.log(e);
      }
    };
    console.log(`member : ${memberList}`);
    memberDivs();
  }, [refresh]);

  return (
    <>
      <Container>
        <DivBox>
          {dibList &&
            dibList.map((dib) => (
              <Div
                key={dib.tno}
                onClick={() => {
                  handleAddrChange(dib.taddr);
                  closeModal();
                  setPlace(dib.tname);
                }}
              >
                <DivHeader>
                  <TextBox>{dib.tname}</TextBox>

                  <FaStar
                    style={{
                      color: `#ffcc00`,
                      fontSize: "24px",
                      position: "relative",
                      right: "4%",
                    }}
                    onClick={() => {
                      onClickUndibs(dib.tno);
                    }}
                  />
                </DivHeader>
                <Image>
                  <img src={dib.timage || Basic}></img>
                </Image>
                <DivFooter>{dib.taddr}</DivFooter>
              </Div>
              // <DibBox
              //   key={exdata.index}
              //   onClick={() => {
              //     handleAddrChange(ex.dibsAddress);
              //     closeModal();
              //   }}
              // >
              //   <p>{ex.dibsAddress}</p>
              //   <p>{ex.dibsNick}</p>
              // </DibBox>
            ))}
        </DivBox>
      </Container>
    </>
  );
};
export default DibsParty;
