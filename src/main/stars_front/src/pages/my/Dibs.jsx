import styled from "styled-components";
import { FaHeart } from "react-icons/fa6";
import { useEffect, useState } from "react";
import TravelAxiosApi from "../../api/TravelAxiosApi";
import MyAxiosApi from "../../api/MyAxiosApi";
import Common from "../../utils/Common";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  padding: 30px;
  display: flex;
  gap: 70px;
  flex-wrap: wrap;
  overflow-y: auto;
  align-items: center;
  justify-content: center;
`;

const TravelBox = styled.div`
  margin: 30px 0;
  width: 80%;
  display: flex;
  /* cursor: pointer; */
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  flex: 0 0 300px;
  height: 390px;
  border: 6px solid black;
  box-shadow: 6px 14px 0 #000, 14px 14px 0 #000; /* 그림자 효과 추가 */
  background-color: #f4eedd;
  right: 10px;
`;

const Heart = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  margin: 20px 0;
  opacity: 0.5;
  right: 4%;
  &:hover {
    opacity: 1;
  }
`;
const Image = styled.div`
  display: flex;
  width: 80%;
  height: 220px;
  cursor: pointer;
  border: 3px solid black;
  margin: 20px 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Name = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  font-weight: bold;
  margin: 0 auto;
  width: 100%;
  height: 14%;
  font-size: 24px;
  background: #c33740;
  border-bottom: 3px solid black;
`;

const Tag = styled.div`
  cursor: pointer;
  position: relative;
  left: 12%;
  font-size: 25px;
  color: skyblue;
  display: ${({ children }) => (children === "#" ? `none` : `flex`)};
`;
const Line = styled.div`
  width: 100%;
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
`;
// Tooltip 스타일 컴포넌트
const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  &:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`;

// TooltipText 스타일 컴포넌트
const TooltipText = styled.span`
  visibility: hidden;
  width: 100%;
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: -125%;
  transform: translateX(-50%);
  left: 50%;
  /* margin-left: -150px; */
  opacity: 0;
  transition: opacity 0.3s;
`;

const Dibs = ({ refresh, setRefresh }) => {
  const navigate = useNavigate();
  const [dibs, setDibs] = useState([]);

  const onClickUndibs = async (e, tno) => {
    e.stopPropagation();
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
    const dibslList = async () => {
      try {
        const res = await MyAxiosApi.dibsList();
        if (res.data) {
          console.log(res.data);
          setDibs(res.data);
        } else {
          console.log("찜정보를 못불러옴");
        }
      } catch (e) {}
    };
    dibslList();
  }, [refresh]);

  return (
    <Container>
      {dibs.map((dib) => (
        <TravelBox
          key={dib.tno}
          onClick={() => navigate(`/goodtrip/review/${dib.tno}`)}
        >
          <Name>{dib.tname}</Name>
          <Image>
            <img src={dib.timage} />
          </Image>
          <Line>
            <Tag>{`#${dib.tcategory}`}</Tag>
          </Line>
          {dib.taddr.length < 20 ? (
            <div>{dib.taddr}</div>
          ) : (
            <Tooltip>
              <div>{Common.rpad(dib.taddr.slice(0, 17), 20, `.`)}</div>
              <TooltipText className="tooltiptext">{dib.taddr}</TooltipText>
            </Tooltip>
          )}
          <Heart onClick={(e) => onClickUndibs(e, dib.tno)}>
            <FaHeart style={{ color: `red`, fontSize: "30px" }} />
          </Heart>
        </TravelBox>
      ))}
    </Container>
  );
};
export default Dibs;
