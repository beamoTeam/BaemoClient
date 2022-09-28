import AxiosClient from "./config";

class GroupOrderService extends AxiosClient { 
  fetchGroupList() {
    return super.get("/api/chatroom");  
  }

  getAllChattingRoomByAddress(data: string) {
    return super.post(`/api/chatroom`, data)
  }
}

const Test = new GroupOrderService();
export default Test;