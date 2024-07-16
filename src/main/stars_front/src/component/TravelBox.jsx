import styled from "styled-components";
import { FaStar } from "react-icons/fa6";
import Common from "../utils/Common";

const StyledTravelBox = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  position: relative;
  flex: 0 0 300px;
  height: 400px;
  border: 1px solid black;
  border-radius: 10px;
  padding: 20px;
`;

const Heart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  cursor: pointer;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: black;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;
const Image = styled.div`
  width: 100%;
  height: 300px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TravelBox = (travel, dibs, onClickUndibs, onClickDibs, onClickTravel) => {
  return (
    <StyledTravelBox key={travel.tno} onClick={() => onClickTravel(travel.tno)}>
      {Common.getAccessToken() && (
        <Heart
          onClick={() =>
            dibs.some((dib) => dib.tno === travel.tno)
              ? onClickUndibs(travel.tno)
              : onClickDibs(travel.tno)
          }
        >
          <FaStar
            style={{
              color: dibs?.some((dib) => dib.tno === travel.tno)
                ? "red"
                : `gray`,
              fontSize: "30px",
            }}
          />
        </Heart>
      )}
      <Image>
        <img src={travel.timage}></img>
      </Image>
      <div>{travel.tname}</div>
      <div>{travel.taddr}</div>
    </StyledTravelBox>
  );
};
export default TravelBox;
