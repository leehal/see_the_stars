import AxiosInstance from "./AxiosInstance";

const LOGO = "/friend";
const FriendAxiosApi = {
  //로그인 정보가 있으면 true
  friendApplication: async (nick) => {
    return await AxiosInstance.get(LOGO + `/application?nick=${nick}`);
  },
  friendAgree: async (nick) => {
    return await AxiosInstance.get(LOGO + `/friendagree?nick=${nick}`);
  },
  friendDelete: async (fno) => {
    return await AxiosInstance.get(LOGO + `/frienddelete?fno=${fno}`);
  },
  allFriends: async () => {
    return await AxiosInstance.get(LOGO + "/friendlist");
  },
  allIng: async () => {
    return await AxiosInstance.get(LOGO + "/friending");
  },
  allAccept: async () => {
    return await AxiosInstance.get(LOGO + "/friendaccept");
  },
};
export default FriendAxiosApi;
