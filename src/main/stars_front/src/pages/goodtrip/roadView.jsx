import React, { useEffect, useRef } from "react"; // React와 useEffect 훅을 가져옵니다.
import styled from "styled-components"; // styled-components 라이브러리를 가져옵니다.

const MapContainer = styled.div`
  // 지도 컨테이너의 스타일을 정의합니다.
  width: 50%;
  height: 50vh;
  position: relative;
`;

const RoadviewContainer = styled.div`
  // 로드뷰 컨테이너의 스타일을 정의합니다.
  width: 8%;
  height: 15vh;
  position: relative;
`;

const { kakao } = window; // 전역 객체 kakao를 사용합니다.

const Navi = () => {
  const mapContainerRef = useRef(null);
  const rvContainerRef = useRef(null);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 한 번만 실행됩니다.
    const mapContainer = mapContainerRef.current; // 지도를 표시할 div의 ID를 지정합니다.
    const mapCenter = new kakao.maps.LatLng(33.5563, 126.7958); // 지도의 중심 좌표를 설정합니다.
    const mapOption = {
      // 지도 옵션을 설정합니다.
      center: mapCenter, // 지도의 중심 좌표
      level: 3, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(mapContainer, mapOption); // 지도 객체를 생성합니다.

    // 커스텀 오버레이에 표시할 내용입니다
    const content = `
      <div class="overlay_info">
        <a href="https://place.map.kakao.com/17600274" target="_blank"><strong>월정리 해수욕장</strong></a>
        <div class="desc">
          <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/place_thumb.png" alt="">
          <span class="address">제주특별자치도 제주시 구좌읍 월정리 33-3</span>
        </div>
      </div>
    `; // 커스텀 오버레이의 HTML 콘텐츠를 정의합니다.

    const position = new kakao.maps.LatLng(33.55635, 126.795841); // 커스텀 오버레이가 표시될 위치를 설정합니다.

    const mapCustomOverlay = new kakao.maps.CustomOverlay({
      position: position, // 오버레이의 위치
      content: content, // 오버레이의 내용
      xAnchor: 0.5, // 오버레이의 x축 위치
      yAnchor: 1.1, // 오버레이의 y축 위치
    }); // 커스텀 오버레이 객체를 생성합니다.

    mapCustomOverlay.setMap(map); // 커스텀 오버레이를 지도에 표시합니다.

    const rvContainer = rvContainerRef.current; // 로드뷰를 표시할 div의 ID를 지정합니다.
    const rv = new kakao.maps.Roadview(rvContainer); // 로드뷰 객체를 생성합니다.
    const rvClient = new kakao.maps.RoadviewClient(); // 좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper 객체를 생성합니다.

    rvClient.getNearestPanoId(mapCenter, 50, (panoId) => {
      // 지도의 중심 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 설정합니다.
      rv.setPanoId(panoId, mapCenter); // panoId와 중심 좌표를 통해 로드뷰를 실행합니다.
    });

    kakao.maps.event.addListener(rv, "init", () => {
      // 로드뷰가 초기화되었을 때 이벤트 리스너를 추가합니다.
      const rvCustomOverlay = new kakao.maps.CustomOverlay({
        position: position, // 오버레이의 위치
        content: content, // 오버레이의 내용
        xAnchor: 0.5, // 오버레이의 x축 위치
        yAnchor: 0.5, // 오버레이의 y축 위치
      }); // 로드뷰에 표시할 커스텀 오버레이 객체를 생성합니다.

      const projection = rv.getProjection(); // viewpoint(화면 좌표) 값을 추출할 수 있는 projection 객체를 가져옵니다.
      const viewpoint = projection.viewpointFromCoords(
        rvCustomOverlay.getPosition(), // 커스텀 오버레이의 위치
        rvCustomOverlay.getAltitude() // 커스텀 오버레이의 고도값
      ); // 커스텀 오버레이의 위치와 고도값을 통해 viewpoint 값을 추출합니다.

      rv.setViewpoint(viewpoint); // 커스텀 오버레이를 로드뷰의 가운데에 오도록 로드뷰의 시점을 변경합니다.
    });
  }, []); // 빈 배열을 의존성으로 설정하여 컴포넌트가 마운트될 때 한 번만 실행합니다.

  return (
    <div style={{ display: "flex" }}>
      {" "}
      {/* 지도와 로드뷰 컨테이너를 나란히 배치합니다. */}
      <MapContainer ref={mapContainerRef} /> {/* 지도를 표시할 div입니다. */}
      <RoadviewContainer ref={rvContainerRef} />{" "}
      {/* 로드뷰를 표시할 div입니다. */}
    </div>
  );
};

export default Navi; // Navi 컴포넌트를 내보냅니다.
