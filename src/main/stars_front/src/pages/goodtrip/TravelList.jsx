import styled from "styled-components";
import Logo from "../../image/Logo.jpg";
import { useContext, useEffect, useState } from "react";
import MyAxiosApi from "../../api/MyAxiosApi";
import { UserContext } from "../../context/UserStore";
import HeartPixel from "../../image/New Piskel (2).gif";
import HeartUnClickPixel from "../../image/New Piskel (3).gif";
import Common from "../../utils/Common";
import { useLocation, useNavigate } from "react-router-dom";
import PrevBtnif from "../../image/prev_active.png";
import PrevBtn from "../../image/prev_inactive.png";
import NextBtnif from "../../image/next_active.png";
import NextBtn from "../../image/next_inactive.png";

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f4eedd;
  width: 100%;
  height: auto;
  @media (max-width: 375px) {
    min-width: 375px;
  }
  /* overflow: hidden;
  width: 100%;
  height: auto; */
  /* background: red; */
`;

const SectionContainer = styled.div`
  margin: 50px 0;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 50px;
  padding: 20px;
  box-shadow: 5px 5px 11px -2px #ccc;
  overflow: hidden;
  background-color: #aec6cf;
  border: 6px solid black;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TravelBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  /* position: relative; */
  flex: 0 0 30%;
  height: 390px;
  border: 6px solid black;
  padding-bottom: 10px;
  background-color: #f4eedd;
  box-shadow: 6px 14px 0 #000, 14px 14px 0 #000; /* 그림자 효과 추가 */

  @media (max-width: 425px) {
    flex: 0 0 25%;
  }
`;

const Heart = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  opacity: 0.5;
  right: 4%;
  &:hover {
    opacity: 1;
  }
`;

const Image = styled.div`
  display: flex;
  width: 250px;
  height: 220px;
  cursor: pointer;
  border: 3px solid black;
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
`;

const Line = styled.div`
  width: 100%;
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
`;

const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  &:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`;

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
  opacity: 0;
  transition: opacity 0.3s;
`;

const PageNum = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const PageButton = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 24px;
  padding: 5px;
  color: ${(props) => (props.active ? "white" : "black")};
  border-radius: 50%;
  width: 32px;
  height: 32px;
`;

const PrevButton = styled.button`
  width: 50px;
  height: 35px;
  background: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-image: url(${PrevBtn});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  text-transform: uppercase;
  outline: none;
  transition: all 0.3s ease;
`;

const NextButton = styled.button`
  width: 50px;
  height: 35px;
  background: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-image: url(${NextBtn});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  text-transform: uppercase;
  outline: none;
  transition: all 0.3s ease;
`;

const TravelList = () => {
  const location = useLocation();
  const context = useContext(UserContext);
  const [showNextInactive, setShowNextInactive] = useState(false);
  const [showPrevInactive, setShowPrevInactive] = useState(false);
  const {
    setCurrentPage,
    currentPage,
    setRefresh,
    tno,
    setTno,
    reviewClicked,
    setReviewClicked,
    category,
    setCategory,
  } = context;
  const navigate = useNavigate();
  const {
    travels = [],
    travelList = [],
    dibs = [],
    city = "",
    totalPages = 1,
  } = location.state || {};

  const handlePageChange = (number) => {
    setCurrentPage(number);
  };

  const prev = () => {
    setShowPrevInactive(true);
    setTimeout(() => setShowPrevInactive(false), 200);
    if (currentPage === 1) {
      alert("첫번째 페이지입니다.");
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const next = () => {
    setShowNextInactive(true);
    setTimeout(() => setShowNextInactive(false), 200);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      alert("마지막 페이지입니다.");
    }
  };

  const onClickDibs = async (tno) => {
    try {
      const res = await MyAxiosApi.dibs(tno);
      if (res.data) {
        setRefresh((prev) => !prev);
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
        setRefresh((prev) => !prev);
      } else {
        console.log("실패");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickTravel = (tno) => {
    setTno(tno);
    setReviewClicked(true);
    navigate(`review/${tno}`);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  return (
    <Container>
      <SectionContainer>
        {travels.map((travel) => (
          <TravelBox key={travel.tno} onClick={() => onClickTravel(travel.tno)}>
            <Name>
              {travel.tname.length < 20 ? (
                <div>{travel.tname}</div>
              ) : (
                <Tooltip>
                  <div>{Common.rpad(travel.tname.slice(0, 17), 20, `.`)}</div>
                  <TooltipText className="tooltiptext">
                    {travel.tname}
                  </TooltipText>
                </Tooltip>
              )}
            </Name>
            <Image>
              <img src={travel.timage || Logo} />
            </Image>
            <Line>
              <Tag
                onClick={(e) => {
                  e.stopPropagation();
                  setCategory(travel.tcategory);
                }}
              >{`#${travel.tcategory}`}</Tag>
            </Line>
            {travel.taddr.length < 20 ? (
              <div>{travel.taddr}</div>
            ) : (
              <Tooltip>
                <div>{Common.rpad(travel.taddr.slice(0, 17), 20, `.`)}</div>
                <TooltipText className="tooltiptext">
                  {travel.taddr}
                </TooltipText>
              </Tooltip>
            )}
            {Common.getRefreshToken() && (
              <Heart
                onClick={(e) => {
                  e.stopPropagation();
                  dibs.some((dib) => dib.tno === travel.tno)
                    ? onClickUndibs(travel.tno)
                    : onClickDibs(travel.tno);
                }}
              >
                {dibs.some((dib) => dib.tno === travel.tno) ? (
                  <img src={HeartPixel} alt="" />
                ) : (
                  <img src={HeartUnClickPixel} alt="" />
                )}
              </Heart>
            )}
          </TravelBox>
        ))}
        <PageNum>
          <PrevButton
            onClick={prev}
            style={{
              backgroundImage: `url(${showPrevInactive ? PrevBtnif : PrevBtn})`,
            }}
          ></PrevButton>
          {travels.length === 0 ? (
            <PageButton> 1 </PageButton>
          ) : (
            Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const startPage = Math.floor((currentPage-1) / 10) * 10 + 1;
              if (page >= startPage && page < startPage + 10) {
                return (
                  <PageButton
                    key={page}
                    onClick={() => handlePageChange(page)}
                    active={currentPage === page}
                  >
                    {page}
                  </PageButton>
                );
              } else {
                return null;
              }
            })
          )}
          <NextButton
            onClick={next}
            style={{
              backgroundImage: `url(${showNextInactive ? NextBtnif : NextBtn})`,
            }}
          ></NextButton>
        </PageNum>
      </SectionContainer>
    </Container>
  );
};

export default TravelList;
