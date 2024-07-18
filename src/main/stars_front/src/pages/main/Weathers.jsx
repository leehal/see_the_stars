import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import {
  TiWeatherSunny,
  TiWeatherCloudy,
  TiWeatherDownpour,
  TiWeatherPartlySunny,
  TiWeatherSnow,
} from "react-icons/ti";
import { MdOutlineNightlight } from "react-icons/md";
import { WiRainMix, WiShowers, WiDaySunny } from "react-icons/wi";

const City = styled.div`
  position: absolute;
  right: 3%;
  top: 6%;
  font-size: 25px;
  @media screen and (max-width: 768px) {
    position: absolute;
    display: flex;
    justify-content: end;
    top: 5%;
    right: 3%;
    font-size: 18px;
  }
`;
const Sky = styled.div`
  position: absolute;
  bottom: 25%;
  left: 38%;
  font-size: 25px;

  @media screen and (max-width: 768px) {
    position: absolute;
    display: flex;
    justify-content: end;
    bottom: 0;
    right: 3%;
    font-size: 18px;
  }
`;
const Pty = styled.div`
  position: absolute;
  bottom: 5%;
  right: 3%;
  font-size: 20px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const Tmp = styled.div`
  position: absolute;
  top: 40%;
  left: 40%;
  font-size: 40px;

  @media screen and (max-width: 768px) {
    position: absolute;
    display: flex;
    left: 50%;
    transform: translate(-50%);
  }
`;
const Hum = styled.div`
  position: absolute;
  bottom: 5%;
  left: 25%;
  font-size: 20px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const MaxMin = styled.div`
  position: absolute;
  bottom: 5%;
  left: 6%;
  font-size: 20px;

  @media screen and (max-width: 768px) {
    position: absolute;
    bottom: 0;
    left: 3%;
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const WeatherImg = styled.div`
  /* position: absolute; */

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  font-size: 100px; /* 아이콘 크기 */
  left: 2%;
  top: 20%;
  color: ${({ weather }) => {
    switch (weather) {
      case "맑음":
        return "#ffc107";
      case "구름 많음":
        return "#e3e7d2";
      case "흐림":
        return "#b8b8b8d2";
      default:
        return "#333333"; // 기본 색상
    }
  }};
`;
const IconTime = styled.div`
  position: absolute;
  left: 0;
  font-size: 40px;
  color: #ffc107;
`;
const IconPre = styled.div`
  position: absolute;
  bottom: 10%;
  right: 5%;
  font-size: 40px;
  color: ${({ weather }) => {
    switch (weather) {
      case "":
        return null;
      case "비":
        return "#bebebe";
      case "비/눈":
        return "#dddddd";
      case "눈":
        return "#e0e0e0";
      case "소나기":
        return "#a5a5a5";
      default:
        return "#000000"; // 기본 색상
    }
  }};
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const Clock = styled.div`
  position: absolute;
  left: 13%;
  top: 6%;
  font-size: 20px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const RE = 6371.00877; // 지구 반경(km)
const GRID = 5.0; // 격자 간격(km)
const SLAT1 = 30.0; // 투영 위도1(degree)
const SLAT2 = 60.0; // 투영 위도2(degree)
const OLON = 126.0; // 기준점 경도(degree)
const OLAT = 38.0; // 기준점 위도(degree)
const XO = 43; // 기준점 X좌표(GRID)
const YO = 136; // 기준점 Y좌표(GRID)

const Weather = () => {
  const [location, setLocation] = useState({ lat: 0, long: 0 });
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState({});
  const [region1, setRegion1] = useState("");
  const [region2, setRegion2] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const getGeocodeKakao = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
        {
          headers: {
            Authorization: `KakaoAK 2dda918f299fb6e8325412499bf9a08a`,
          },
        }
      );
      setRegion1(response.data.documents[0].address.region_1depth_name);
      setRegion2(response.data.documents[0].address.region_2depth_name);
      setAddress(response.data.documents[0].address.address_name);
      console.log(response.data);
    } catch (error) {
      console.error("Kakao Geocoding error:", error);
    }
  };

  const onSuccess = (position) => {
    setLocation({
      lat: position.coords.latitude,
      long: position.coords.longitude,
    });
  };

  const onError = (error) => {
    console.error(error);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  useEffect(() => {
    if (location.lat !== 0 && location.long !== 0) {
      getGeocodeKakao(location.lat, location.long);
      dfs_xy_conv("toXY", location.lat, location.long);
    }
  }, [location]);

  useEffect(() => {
    const getWeather = async () => {
      if (coords) {
        try {
          const response = await axios.get(
            `http://127.0.0.1:5000/api/weather2?x=${coords.x}&y=${coords.y}`
          );
          setWeather(response.data);
          console.log(response.data);
          console.log(coords.x, coords.y);
        } catch (error) {
          console.error("Weather error:", error);
        }
      }
    };
    getWeather();
  }, [coords]);

  const dfs_xy_conv = (code, v1, v2) => {
    const DEGRAD = Math.PI / 180.0;
    const RADDEG = 180.0 / Math.PI;

    const re = RE / GRID;
    const slat1 = SLAT1 * DEGRAD;
    const slat2 = SLAT2 * DEGRAD;
    const olon = OLON * DEGRAD;
    const olat = OLAT * DEGRAD;

    let sn =
      Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
      Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
    let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = (re * sf) / Math.pow(ro, sn);
    let rs = {};
    if (code === "toXY") {
      rs["lat"] = v1;
      rs["lng"] = v2;
      let ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
      ra = (re * sf) / Math.pow(ra, sn);
      let theta = v2 * DEGRAD - olon;
      if (theta > Math.PI) theta -= 2.0 * Math.PI;
      if (theta < -Math.PI) theta += 2.0 * Math.PI;
      theta *= sn;
      rs["x"] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
      rs["y"] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
    } else {
      rs["x"] = v1;
      rs["y"] = v2;
      let xn = v1 - XO;
      let yn = ro - v2 + YO;
      let ra = Math.sqrt(xn * xn + yn * yn);
      if (sn < 0.0) ra = -ra;
      let alat = Math.pow((re * sf) / ra, 1.0 / sn);
      alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

      let theta = 0.0;
      if (Math.abs(xn) <= 0.0) {
        theta = 0.0;
      } else {
        if (Math.abs(yn) <= 0.0) {
          theta = Math.PI * 0.5;
          if (xn < 0.0) theta = -theta;
        } else theta = Math.atan2(xn, yn);
      }
      let alon = theta / sn + olon;
      rs["lat"] = alat * RADDEG;
      rs["lng"] = alon * RADDEG;
    }
    setCoords({ x: rs.x, y: rs.y });
  };

  const formatTemperature = (temp) => {
    if (temp === "N/A") return temp;
    const floatTemp = parseFloat(temp);
    if (floatTemp % 1 === 0) {
      return `${parseInt(floatTemp, 10)}°`;
    } else {
      return `${floatTemp}℃`;
    }
  };

  const getWeatherIcon = () => {
    if (weather.sky !== undefined) {
      switch (weather.sky) {
        case "맑음":
          return <TiWeatherSunny />;
        case "구름 많음":
          return <TiWeatherPartlySunny />;
        case "흐림":
          return <TiWeatherCloudy />;
        default:
          return null;
      }
    }
    return null;
  };

  const getTimeIcon = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 18 || currentHour < 5) {
      return <MdOutlineNightlight />;
    } else if (currentHour >= 5 || currentHour < 18) {
      return <WiDaySunny />;
    }
    return null;
  };

  const getPreIcon = () => {
    if (weather.pty !== undefined) {
      switch (weather.pty) {
        case "":
          return null;
        case "비":
          return <TiWeatherDownpour />;
        case "비/눈":
          return <WiRainMix />;
        case "눈":
          return <TiWeatherSnow />;
        case "소나기":
          return <WiShowers />;
        default:
          return null;
      }
    }
    return null;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // 1초마다 갱신

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 clearInterval
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <Container>
      <WeatherImg>
        <IconTime>{getTimeIcon()}</IconTime>
        <IconWrapper weather={weather.sky}>{getWeatherIcon()}</IconWrapper>
        <IconPre weather={weather.pty}>{getPreIcon()}</IconPre>
      </WeatherImg>
      <City>
        {region1} {region2}
      </City>
      <Sky>{weather.sky}</Sky>
      <Pty>강수량 : {weather.pty}</Pty>
      <Tmp>{weather.tmp}</Tmp>
      <Hum>습도 : {weather.hum}</Hum>
      <MaxMin>
        {formatTemperature(weather.max_temp)}/
        {formatTemperature(weather.min_temp)}
      </MaxMin>
      <Clock>{formattedTime}</Clock>
    </Container>
  );
};

export default Weather;
