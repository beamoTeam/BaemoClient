import AxiosClient, { AuthClient } from "./config";
import { MenuModel } from "../../types/menu";

class GroupOrderService extends AxiosClient { 
  fetchGroupList() {
    return super.get("/api/room");  
  }

  createGroup(data: object) {
    return AuthClient().post(`/api/room`, data)
  }

  mutateToCart(room_seq: any, data: MenuModel) {
    return AuthClient().post(`/api/basket/${room_seq}`, data);
  }

  enterGroup(room_seq: any) {
    return AuthClient().post(`/api/room/${room_seq}`);
  }

  fetchCartItems(room_seq :any) {
    return AuthClient().get(`/api/basket/${room_seq}`);
  }

  mutateOrder(room_seq: any) {
    return AuthClient().get(`/api/order/${room_seq}`);
  }
}

const groupOrderService = new GroupOrderService();
export default groupOrderService;