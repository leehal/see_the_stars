import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import MarkerImg from "../../image/카카오맵마커.png";

const MapContainer = styled.div`
  width: 75%;
  height: 100%;
  border: 6px solid #000;
  align-items: center;
  display: flex;
  flex-direction: column;
  background-color: #c33740;
  box-shadow: 6px 6px 0 #000, 14px 14px 0 #000; /* 그림자 효과 추가 */
  @media (max-width: 768px) {
    width: 80%;
    height: 80%;
  }
`;
const MapHeader = styled.div`
  width: 100%;
  height: 11.5%;
  background-color: #c33740;
  display: flex;
  justify-content: flex-end;
  position: relative;
  align-items: flex-end;
  color: #f4eedd;
  @media (max-width: 768px) {
    font-size: 1.5rem;
    /* padding: 0.2rem; */
    height: 15%;
  }
`;

const Div = styled.div`
  border-bottom: solid 4px #000;
  border-top: solid 4px #000;
`;

const { kakao } = window;

const Navi = ({ cosList, setDivView, setcosList }) => {
  const mapRef = useRef(null);
  const boundsRef = useRef(null);
  const mapContainerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const mapContainer = mapContainerRef.current; // 지도를 표시할 div의 ID를 지정
    const mapOption = {
      center: new kakao.maps.LatLng(36.34, 127.77), // 지도 중심 좌표
      level: 14, // 지도 확대 레벨
    };

    if (!mapRef.current) {
      // map이 처음 생성될 때만 실행
      const mapInstance = new kakao.maps.Map(mapContainer, mapOption); // 지도 객체 생성
      mapRef.current = mapInstance;
      boundsRef.current = new kakao.maps.LatLngBounds(); // 지도 범위 객체 생성
    }
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const bounds = boundsRef.current;

    // Polyline 경로를 저장할 배열
    const linePath = [];

    // 주소를 검색하여 좌표를 반환하는 비동기 함수
    const getCoordinates = async (address) => {
      const geocoder = new kakao.maps.services.Geocoder();
      return new Promise((resolve, reject) => {
        geocoder.addressSearch(address, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            resolve(coords);
          } else {
            reject(new Error("No results found"));
          }
        });
      });
    };

    // 모든 주소에 대해 좌표 검색 및 마커와 오버레이 추가
    const addMarkersAndOverlays = async () => {
      for (const position of cosList) {
        if (cosList.length === 0) {
          setcosList([
            {
              caddr: "서울특별시 강남구 강남구 테헤란로14길 6",
              caContent: "입력값 X",
            },
          ]);
        }
        try {
          const coords = await getCoordinates(position.caddr);

          const customOverlay = new kakao.maps.CustomOverlay({
            position: coords,
            content: `
              <div class="label"
                style="
                margin-bottom: 70px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding-top: 5px;
                width: 70px;
                height: 20px;
                font-weight: bold;
                border: 3px solid black;
                border-radius: 5px;
                background-color: #ffbb00;
                color: black;">
                ${position.caContent}
              </div>
            `,
          });
          const markerImage = new kakao.maps.MarkerImage(
            MarkerImg,
            new kakao.maps.Size(15, 20),
            { offset: new kakao.maps.Point(8, 20) }
          );
          const marker = new kakao.maps.Marker({
            position: coords,
            image: markerImage,
          });

          marker.setMap(map);
          customOverlay.setMap(map);
          bounds.extend(coords); // 범위에 좌표 추가

          // Polyline 경로에 좌표 추가
          linePath.push(coords);
        } catch (error) {
          console.error("Error adding marker and overlay:", error, position);
        }
      }

      // 모든 마커가 추가된 후에 범위 설정
      map.setBounds(bounds);

      // Polyline 생성
      const polyline = new kakao.maps.Polyline({
        path: linePath, // Polyline 경로
        strokeWeight: 2, // 선의 두께
        strokeColor: "#c33740", // 선의 색
        strokeOpacity: 1, // 선의 불투명도
        strokeStyle: "solid", // 선의 스타일
      });

      // Polyline을 지도에 표시
      polyline.setMap(map);
    };

    addMarkersAndOverlays();
  }, [cosList]);

  return (
    <MapContainer>
      <MapHeader>
        {/* <Box1> */}
        <FaCalendarAlt
          fontSize="30px"
          cursor="pointer"
          onClick={() => {
            setDivView("calendar");
            if (location.pathname !== "/party") {
              navigate("/party");
            }
          }}
        />
      </MapHeader>
      {console.log(cosList)}
      <Div style={{ width: "100%", height: "400px" }}>
        <div
          ref={mapContainerRef}
          style={{ position: "relative", width: "100%", height: "100%" }}
        ></div>
      </Div>
      {/* <MapFooter></MapFooter> */}
    </MapContainer>
  );
};

export default Navi;
