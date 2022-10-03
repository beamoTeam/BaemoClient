import AxiosClient from "./config";
import { MenuModel } from "../../types/menu";

class GroupOrderService extends AxiosClient { 
  fetchGroupList() {
    return super.get("/api/room");  
  }

  getAllChattingRoomByAddress(data: string) {
    return super.post(`/api/room`, data)
  }

  mutateToCart(room_seq: any, data: MenuModel) {
    return this.authClient.post(`/api/basket/${room_seq}`, data);
  }

  enterGroup(room_seq: any) {
    return this.authClient.post(`/api/room/${room_seq}`);
  }
}

const groupOrderService = new GroupOrderService();
export default groupOrderService;