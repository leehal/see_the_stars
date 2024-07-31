import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserStore";
import AuthAxiosApi from "../../api/AuthAxiosApi";
import Common from "../../utils/Common";
import styled from "styled-components";
import Kakao from "../../image/kakao-talk.png";

const Circle = styled.div`
  display: flex;
  width: 13%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 425px) {
    width: 18%;
  }
`;
const KaKaoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 10px;
  border-top: 2px solid #000;
  border-bottom: 2px solid #000;
  background: #fddc3f;
  font-size: 25px;
  cursor: pointer;
  border-radius: ${({ radius }) => (radius ? radius : "0")};

  @media screen and (max-width: 425px) {
    border-bottom: none;
  }

  &:hover {
    background: #dac24a;
  }

  span {
    font-weight: bold;
    padding-top: 10px;
    @media screen and (max-width: 425px) {
      font-size: 20px;
    }
  }
`;

const KakaoLogin = ({ radius }) => {
  const navigate = useNavigate();

  const kakaoLogin = () => {
    window.Kakao.Auth.login({
      success: function (obj) {
        console.log(obj);
        getInfo(obj.access_token);
      },
    });
  };

  const getInfo = async (token) => {
    try {
      const res = await AuthAxiosApi.kakao(token);
      if (res.data.grantType === "Bearer") {
        Common.setAccessToken(res.data.accessToken);
        Common.setExpiresIn(res.data.accessTokenExpiresIn);
        Common.setRefreshToken(res.data.refreshToken);
        Common.setRefreshExpiresIn(res.data.refreshTokenExpiresIn);
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <KaKaoBox onClick={kakaoLogin} radius={radius}>
      <Circle>
        <img src={Kakao} alt="" />
      </Circle>
      <span>카카오 로그인</span>
    </KaKaoBox>
  );
};
export default KakaoLogin;
