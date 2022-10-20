import { ChatClient } from "./config";

interface chatBodyType {
  sender: String,
  roomNum: Number,
  msg: object[];
}

class ChatService { 
  sendMessage(chatData: chatBodyType) {
    return ChatClient().post(`/chat`, chatData);
  }

  test() {
    return ChatClient().get(`/chat/roomNum/1`);
  }
}

const chatClient = new ChatService();
export default chatClient;