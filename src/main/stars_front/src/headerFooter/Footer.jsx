import { useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledFooter = styled.div`
  display: flex;
  justify-content: center;

  background-size: cover;
  background-repeat: no-repeat;
  align-items: center;
  background: #1b2046;
  /* background-color: lightgreen; */
  color: #fff;
  width: 100%;
  height: 20vh;
  text-align: center;
  font-size: 25px;

  img {
  }
  @media screen and (max-width: 375px) {
    min-width: 375px;
  }
`;

const Footer = () => {
  const location = useLocation();
  if (location.pathname.includes("/login")) {
    return null;
  }

  return (
    <StyledFooter>
      <p>
        저작권 ©<span style={{ fontWeight: "bold" }}>Anna와 아이들들</span> 에게
        모든 권한이 있습니다.
      </p>
    </StyledFooter>
  );
};
export default Footer;
