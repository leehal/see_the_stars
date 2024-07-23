import React, { useContext, useEffect, useRef, useState } from "react";
import Kakao from "./map";
import styled, { keyframes } from "styled-components";
import TravelAxiosApi from "../../api/TravelAxiosApi";
import MyAxiosApi from "../../api/MyAxiosApi";
import Common from "../../utils/Common";
import HeartPixel from "../../image/New Piskel (2).gif";
import HeartUnClickPixel from "../../image/New Piskel (3).gif";
import Basic from "../../image/Logo.jpg";
import { PiXSquare } from "react-icons/pi";
import { IoSearchSharp } from "react-icons/io5";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserStore";

const slideUpIn = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;
const slideDownIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 450px;
  width: 100%;
  border: 4px solid black;
  background-color: #aec6cf;
  @media (max-width: 768px) {
    height: 100vh;
  }
  @media (max-width: 375px) {
    min-width: 375px;
  }
`;
const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 60px;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    width: 95%;
    height: 100%;
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }
`;
const Div = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  border: 5px solid black;
  height: 400px;
  width: 25%;
  min-width: 300px;
  box-shadow: 6px 14px 0 #000, 14px 14px 0 #000; /* 그림자 효과 추가 */
  background-color: #f4eedd;
  @media (max-width: 768px) {
    order: 2;
    width: 100%;
  }
`;
const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  animation: ${slideDownIn} 0.4s ease-out forwards;
`;
const Title = styled.div`
  font-size: 50px;
  font-weight: bold;
`;

const Input = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 40px;
  padding: 0 5px;
  border: 3px solid black;
  border-radius: 10px;

  select {
    text-align: center;
    border: none;
    font-size: 23px;
    width: auto;
    padding: 4px;
    font-weight: bold;
    background-color: transparent;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  select option {
    font-size: 18px;
    color: black;
    background-color: white;
  }

  input {
    text-align: center;
    border: none;
    border-left: 3px solid black;
    border-right: 3px solid black;
    font-size: 23px;
    width: 90%;
    padding: 4px;
    font-weight: bold;
    background-color: transparent;
    outline: none;
  }
  input::placeholder {
    font-size: 24px;
  }
  svg {
    transition: transform 0.2s ease;
    font-size: 23px;
    cursor: pointer;
  }
  svg:hover {
    transform: scale(1.2);
  }
`;
const TravelBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  border-radius: 10px;
  animation: ${slideUpIn} 0.4s ease-out forwards;
`;
const HeartBox = styled.div`
  position: absolute;
  bottom: 1%;
  right: 4%;
`;

const Heart = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`;
const Image = styled.div`
  border: 4px, solid black;
  width: 80%;
  height: 220px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    width: 40%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Close = styled.div`
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 5px;
`;

const StyledPiXSquere = styled(PiXSquare)`
  font-size: 30px;
  color: #000;
`;

const Name = styled.div`
  font-size: 25px;
  display: flex;
  padding-top: 10px;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  border-bottom: 2px solid black;
  background-color: #c33740;
  color: white;
`;

const Tag = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;
  color: skyblue;
  font-size: 25px;
  visibility: ${({ children }) => (children === "#" ? `hidden` : `visible`)};
`;

const Line = styled.div`
  width: 80%;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;

  @media (max-width: 768px) {
    width: 40%;
  }
`;

const TaddrBox = styled.div`
  padding: 0 4%;
  font-size: 23px;
`;

const Goodtrip = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const context = useContext(UserContext);
  const {
    refresh,
    setRefresh,
    category,
    setCategory,
    currentPage,
    tno,
    setTno,
    reviewClicked,
    setReviewClicked,
  } = context;

  const [option, setOption] = useState("이름");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [travels, setTravels] = useState([]);
  const [dibs, setDibs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedTravel, setSelectedTravel] = useState();

  const onClickClose = () => {
    setReviewClicked(false);
    setTno("");
    navigate(".");
    travel();
  };

  const onClickDibs = async (tno) => {
    try {
      const res = await MyAxiosApi.dibs(tno);
      if (res.data) {
        // console.log("성공");
        setRefresh(!refresh);
      } else {
        console.log("실패");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickUndibs = async (tno) => {
    try {
      const res = await MyAxiosApi.undibs(tno);
      if (res.data) {
        // console.log("성공");
        setRefresh(!refresh);
      } else {
        console.log("실패");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickSearch = () => {
    if (inputRef.current) {
      setName(inputRef.current.value);
    }
  };

  useEffect(() => {
    const travel = {
      totalPages,
      travels,
      dibs,
      city,
    };
    navigate("", { state: travel });
  }, [travels, dibs, city, category, currentPage, refresh]);

  const travel = async () => {
    try {
      const res = await TravelAxiosApi.travelList(
        currentPage,
        category,
        city,
        name
      );
      if (res.data) {
        setTotalPages(res.data.totalPages);
        setTravels(res.data.travels);
      } else {
        console.log("여행정보를 못불러옴");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    travel();
  }, [currentPage, category, city, name]);

  useEffect(() => {
    const dibsList = async () => {
      try {
        const res = await MyAxiosApi.dibsList();
        if (res.data) {
          setDibs(res.data);
        } else {
          console.log("찜정보를 못불러옴");
        }
      } catch (e) {
        console.log(e);
      }
    };
    Common.getRefreshToken() && dibsList();
  }, [refresh]);

  useEffect(() => {
    const select = async () => {
      try {
        const res = await TravelAxiosApi.travel(tno);
        if (res.data) {
          setSelectedTravel(res.data);
        } else {
          console.log("tno에 따른 여행지가 없음");
        }
      } catch (e) {
        console.log(e);
      }
    };
    tno && select();
  }, [reviewClicked]);

  return (
    <>
      <SearchContainer>
        <SearchBox>
          <Div>
            {reviewClicked ? (
              <TravelBox
                key={selectedTravel?.tno}
                reviewClicked={reviewClicked}
              >
                <Close onClick={onClickClose}>
                  <StyledPiXSquere />
                </Close>
                <Name>{selectedTravel?.tname}</Name>{" "}
                <Image>
                  <img src={selectedTravel?.timage || Basic} alt="travel" />
                </Image>
                <Line>
                  <Tag
                    onClick={(e) => {
                      e.stopPropagation();
                      setCategory(selectedTravel?.tcategory);
                    }}
                  >
                    {`#${selectedTravel?.tcategory}`}
                  </Tag>
                </Line>
                <TaddrBox>{selectedTravel?.taddr}</TaddrBox>
                <HeartBox>
                  {Common.getRefreshToken() && (
                    <Heart
                      onClick={() =>
                        dibs.some((dib) => dib.tno === selectedTravel?.tno)
                          ? onClickUndibs(selectedTravel?.tno)
                          : onClickDibs(selectedTravel?.tno)
                      }
                    >
                      {dibs.some((dib) => dib.tno === selectedTravel?.tno) ? (
                        <img src={HeartPixel} alt="heart" />
                      ) : (
                        <img src={HeartUnClickPixel} alt="empty heart" />
                      )}
                    </Heart>
                  )}
                </HeartBox>
              </TravelBox>
            ) : (
              <Box reviewClicked={reviewClicked}>
                <Title>여행지 추천</Title>
                <Input>
                  <select onChange={(e) => setOption(e.target.value)}>
                    <option value="이름">이름</option>
                    <option value="카테고리">카테고리</option>
                  </select>
                  {option === "이름" ? (
                    <>
                      <input
                        type="text"
                        ref={inputRef}
                        onKeyDown={(e) =>
                          Common.onKeyDownEnter(e, onClickSearch)
                        }
                      />
                      <IoSearchSharp onClick={onClickSearch} />
                    </>
                  ) : (
                    <select
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    >
                      <option value="관광">관광</option>
                      <option value="맛집">맛집</option>
                      <option value="숙박">숙박</option>
                      <option value="축제">축제</option>
                    </select>
                  )}
                </Input>
                <Line>
                  <Tag onClick={() => setCity("")}>{`#${city}`}</Tag>
                  <Tag onClick={() => setCategory("")}>{`#${category}`}</Tag>
                  <Tag
                    onClick={() => {
                      setName("");
                      if (inputRef.current) {
                        inputRef.current.value = "";
                      }
                    }}
                  >{`#${name}`}</Tag>
                </Line>
              </Box>
            )}
          </Div>
          <Kakao
            setCity={setCity}
            taddr={selectedTravel?.taddr}
            reviewClicked={reviewClicked}
          />
        </SearchBox>
      </SearchContainer>
      <Outlet />
    </>
  );
};

export default Goodtrip;
