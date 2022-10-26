import { ChatClient } from "./config";

class ChatService { 
  sendMessage(chatData: any) {
    return ChatClient().post(`/chat`, chatData);
  }

  test() {
    return ChatClient().get(`/chat/roomNum/1`);
  }
}

const chatClient = new ChatService();
export default chatClient;