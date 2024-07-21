import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Maparea from "./maparea";

const MapContainer = styled.div`
  width: 40%;
  @media screen and (max-width: 768px) {
    width: 90%;
    order: 1;
  }
`;
const MapBox = styled.div`
  border: 4px solid black;
  width: 80%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 6px 14px 0 #000, 14px 14px 0 #000; /* 그림자 효과 추가 */
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
  @media screen and (max-width: 425px) {
    height: 300px;
  }
`;
const { kakao } = window;

const Kakao = ({ setCity, taddr, reviewClicked }) => {
  const [overlayContent, setOverlayContent] = useState(null);
  const [overlayPosition, setOverlayPosition] = useState({ x: 0, y: 0 });
  const [places, setPlaces] = useState([]);
  const [isRoadView, setIsRoadView] = useState(false);
  const [map, setMap] = useState(null);
  const [roadview, setRoadview] = useState(null);
  const [roadviewClient, setRoadviewClient] = useState(null);
  const mapRef = useRef(null);
  const RoadViewRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 720) {
        const mapOption = {
          center: new kakao.maps.LatLng(36.34, 127.77),
          level: 12,
        };
      } else {
      }
    };

    window.addEventListener("resize", handleResize);
    // 초기 실행을 위해 호출
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const mapContainer = mapRef.current;
    const roadviewContainer = RoadViewRef.current;

    const mapOption = {
      center: new kakao.maps.LatLng(36.34, 127.77),
      level: 13,
    };

    const mapInstance = new kakao.maps.Map(mapContainer, mapOption);
    const roadviewInstance = new kakao.maps.Roadview(roadviewContainer);
    const roadviewClientInstance = new kakao.maps.RoadviewClient();

    setMap(mapInstance);
    setRoadview(roadviewInstance);
    setRoadviewClient(roadviewClientInstance);

    function displayArea(area) {
      const polygon = new kakao.maps.Polygon({
        map: mapInstance,
        path: area.path,
        strokeWeight: 2,
        strokeColor: "#004c80",
        strokeOpacity: 0.8,
        fillColor: "#fff",
        fillOpacity: 0.7,
      });

      kakao.maps.event.addListener(polygon, "mouseover", function () {
        polygon.setOptions({ fillColor: "#09f" });
        setOverlayContent(area.name);
      });

      kakao.maps.event.addListener(polygon, "mouseout", function () {
        polygon.setOptions({ fillColor: "#fff" });
        setOverlayContent(null);
      });

      kakao.maps.event.addListener(polygon, "click", function (e) {
        // searchPlaces(area.cities.map((city) => `${city} 맛집`)); // 도시 이름을 이용해 장소 검색
        setCity(area.name);
      });
    }
    Maparea.areas.forEach(displayArea);
  }, []);

  const searchPlaces = (keywords) => {
    if (!keywords || keywords.length === 0) {
      alert("키워드를 입력 해주세요!");
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    let results = [];

    keywords.forEach((keyword, index) => {
      ps.keywordSearch(keyword, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          results = results.concat(data);
        }

        if (index === keywords.length - 1) {
          setPlaces(results);
        }
      });
    });
  };

  const handleMouseMove = (event) => {
    const mapContainer = mapRef.current;
    const rect = mapContainer.getBoundingClientRect();
    setOverlayPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  useEffect(() => {
    const handleRoadViewClick = () => {
      if (!roadviewClient || !roadview) {
        console.error("Roadview client or roadview is not initialized");
        return;
      }

      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(
        taddr || "경기도 성남시 분당구 판교역로 166 카카오 판교아지트 A동 3층",
        function (result, status) {
          if (status === kakao.maps.services.Status.OK && result[0]) {
            const position = new kakao.maps.LatLng(result[0].y, result[0].x);
            roadviewClient.getNearestPanoId(position, 50, function (panoId) {
              if (panoId) {
                roadview.setPanoId(panoId, position);
                roadview.setViewpoint({ pan: 0, tilt: 0, zoom: 0 });
              } else {
                console.error(
                  "No panorama ID found near the specified position."
                );
              }
            });
          } else {
            console.error("Geocoding failed or no result found.");
          }
        }
      );
      setIsRoadView(reviewClicked);
    };
    handleRoadViewClick();
  }, [reviewClicked, roadviewClient, taddr, roadview]);

  return (
    <MapContainer>
      <div>
        <MapBox onMouseMove={handleMouseMove} onTouchMove={handleMouseMove}>
          <div
            ref={mapRef}
            style={{
              display: isRoadView ? "none" : "block",
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            {overlayContent && (
              <div
                style={{
                  position: "absolute",
                  top: overlayPosition.y - 50,
                  left: overlayPosition.x,
                  border: "1px solid green",
                  zIndex: 1,
                  borderRadius: "4px",
                  transform: "translate(-50%, 0%)",
                  pointerEvents: "none",
                  padding: "5px",
                  backgroundColor: "white",
                }}
              >
                {overlayContent}
              </div>
            )}
          </div>
          <div
            ref={RoadViewRef}
            style={{
              display: isRoadView ? "block" : "none",
              width: "100%",
              height: "100%",
            }}
          ></div>
        </MapBox>
        <div>
          <div id="menu_wrap" className="bg_white">
            <ul id="placesList">
              {places.map((place, index) => (
                <li key={index} className="item">
                  <span className={`markerbg marker_${index + 1}`}></span>
                  <div className="info">
                    <h5>{place.place_name}</h5>
                    {place.road_address_name ? (
                      <>
                        <span>{place.road_address_name}</span>
                        <span className="jibun gray">{place.address_name}</span>
                      </>
                    ) : (
                      <span>{place.address_name}</span>
                    )}
                    <span className="tel">{place.phone}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </MapContainer>
  );
};

export default Kakao;
