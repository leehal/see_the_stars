import AxiosInstance from "./AxiosInstance";

const LOGO = "/friend";
const FriendAxiosApi = {
  //로그인 정보가 있으면 true
  friendApplication: async (nick) => {
    const member = {
      nick: nick,
    };
    return await AxiosInstance.post(LOGO + `/application`, member);
  },
  friendAgree: async (nick) => {
    const member = {
      nick: nick,
    };
    return await AxiosInstance.post(LOGO + `/friendagree`, member);
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
