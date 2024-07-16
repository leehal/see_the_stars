import AxiosInstance from "./AxiosInstance";

const LOGO = "/my";
const MyAxiosApi = {
  //로그인 정보가 있으면 true
  memberDetail: async () => {
    return await AxiosInstance.get(LOGO + `/detail`);
  },
  dibs: async (tno) => {
    return await AxiosInstance.get(LOGO + `/dibs?tno=${tno}`);
  },
  undibs: async (tno) => {
    return await AxiosInstance.get(LOGO + `/undibs?tno=${tno}`);
  },
  dibsList: async () => {
    return await AxiosInstance.get(LOGO + "/dibslist");
  },
  checkPw: async (pwd) => {
    const member = {
      pwd: pwd,
    };
    return await AxiosInstance.post(LOGO + `/checkpw`, member);
  },
  //수정되면 true, 1:profile, 2:pw, 3:nick, 4:email
  editInfo: async (info, type) => {
    const member = {
      info: info,
      type: type,
    };
    return await AxiosInstance.post(LOGO + `/editinfo`, member);
  },
  myTravelList: async () => {
    return await AxiosInstance.get(LOGO + `/mytravellist`);
  },
  myReviewList: async () => {
    return await AxiosInstance.get(LOGO + `/myreviewlist`);
  },
};
export default MyAxiosApi;