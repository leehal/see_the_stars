import styled from "styled-components";

const Box = styled.div`
  border: 1px solid gray;
  padding: 80px;
  span {
    font-weight: bold;
  }
`;

const FindId = ({ id }) => {
  return (
    <>
      <p>이메일 정보와 일치하는 아이디입니다.</p>
      <Box>
        <span>아이디 : </span> {id}
      </Box>
    </>
  );
};
export default FindId;
