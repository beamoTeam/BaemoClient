import AxiosClient, {ChatClient} from "./config";

interface chatDataType {
  sender: String,
  roomNum: Number,
  msg: object[];
}

class ChatService extends AxiosClient { 
  sendMessage(chatData: chatDataType) {
    return ChatClient().post(`/chat`, chatData);
  }
}

const chatService = new ChatService();
export default chatService;