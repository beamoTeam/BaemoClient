import AxiosClient from "./config";

class GroupOrderService extends AxiosClient { 
  async fetchGroupList() {
    return super.get("/api/chatroom");  
  }

  async getAllChattingRoomByAddress(data: string) {
    return super.post(`/api/chatroom`, data)
  }
}

const Test = new GroupOrderService();
export default Test;