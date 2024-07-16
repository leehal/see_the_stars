import AxiosInstance from "./AxiosInstance";

const ChatAxiosApi = {
  chatList: async () => {
    return await AxiosInstance.get("/chat/list");
  },
  // 채팅방 정보 보기
  chatDetail: async (roomId) => {
    return await AxiosInstance.get(`/chat/room/${roomId}`);
  },
  // 채팅방 생성
  chatCreate: async (name) => {
    const chat = {
      name: name,
    };
    return await AxiosInstance.post("/chat/new", chat);
  },
  chatMessageSave: async (roomId, sender, message) => {
    const chat = {
      roomId: roomId,
      sender: sender,
      message: message,
    };
    return await AxiosInstance.post("/chat/message", chat);
  },
  chatViewMesage: async (roomId) => {
    return await AxiosInstance.get(`/chat/message/${roomId}`);
  },
};
export default ChatAxiosApi;

