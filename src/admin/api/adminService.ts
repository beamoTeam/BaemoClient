import AxiosClient from "../../lib/api/config";

class AdminService extends AxiosClient {
  fetchOrderData(r_seq: any) {
    return super.get(`/api/order/restaurant/${r_seq}`);
  }

  changeOrderStatus(room_seq: any) {
    return super.get(`/api/order/accepted/${room_seq}`);
  }
}

const adminClient = new AdminService();
export default adminClient;

