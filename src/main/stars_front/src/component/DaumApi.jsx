import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";

// 스타일 정의
const PostStyle = styled.div`
  background: rgba(0, 0, 0, 0.25);
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 99;
  .postWrapper {
    width: 50%;
    height: 80%;
    margin: 0 auto;
    position: relative;
    top: 15%;
  }
  section {
    width: 90%;
    max-width: 550px;
    margin: 0 auto;
    border-radius: 0.3rem;
    background-color: #fff;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-show 0.3s;
    overflow: hidden;
    header {
      position: relative;
      height: 50px;
      padding: 16px 64px 16px 16px;
      background-color: #ff3366;
      font-weight: 700;
      button {
        position: absolute;
        cursor: pointer;
        top: 15px;
        right: 15px;
        width: 30px;
        font-size: 21px;
        font-weight: 700;
        text-align: center;
        color: #fff;
        background-color: transparent;
        border: none;
        &:hover {
          color: #000;
        }
      }
    }
    main {
      padding: 16px;
      border-bottom: 1px solid #dee2e6;
      border-top: 1px solid #dee2e6;
    }
    footer {
      padding: 12px 16px;
      text-align: right;
      button {
        padding: 6px 12px;
        color: #fff;
        background-color: #ff3366;
        font-weight: bold;
        border-radius: 5px;
        font-size: 13px;
      }
    }
  }

  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Button = styled.button`
  outline: none;
  cursor: pointer;
  margin-right: 10px;
  border: 0;
  width: 60px;
`;
const StyledDaumPostcode = styled(DaumPostcode)`
  width: 100%;
  height: 470px;
`;

const DaumPostPopup = (props) => {
  const { onClose, setAddr, setPlace } = props;
  const { kakao } = window;

  const placesSearchCB = (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      setPlace(data[0].place_name); // 검색 결과의 첫 번째 장소 이름을 place 상태에 저장
      console.log(data[0].place_name);
    }
  };

  const ps = new kakao.maps.services.Places(); // kakao maps Places 서비스 객체 생성

  // 검색 결과 콜백 함수

  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? `(${extraAddress})` : "";
    }
    // console.log(data.address);
    // console.log(fullAddress);
    // console.log(data.zoneCode);
    setAddr(data.address); // 선택된 주소를 상위 컴포넌트로 전달
    ps.keywordSearch(data.address, placesSearchCB); // caddr로 키워드 검색 수행
    onClose(); // 모달 닫기
  };

  return (
    <PostStyle>
      <div className="postWrapper">
        <section>
          <header>
            <h2>주소를 입력 해주세요</h2>
            <button onClick={onClose}>&times;</button>
          </header>
          <main>
            <DaumPostcode
              className="daumpost"
              onComplete={handlePostCode}
              style={{ width: `100%`, height: `470px` }}
            />
          </main>
          <footer>
            <Button onClick={onClose}>취소</Button>
          </footer>
        </section>
      </div>
    </PostStyle>
  );
};

export default DaumPostPopup;
