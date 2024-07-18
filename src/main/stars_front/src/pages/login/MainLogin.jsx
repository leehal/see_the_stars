import AfterLogin from "./AfterLogin";
import BeforLogin from "./BeforLogin";
import Common from "../../utils/Common";

const MainLogin = ({ setRefresh }) => {
  return (
    <>
      {Common.getRefreshToken() ? (
        <AfterLogin setRefresh={setRefresh} />
      ) : (
        <BeforLogin />
      )}
    </>
  );
};
export default MainLogin;
