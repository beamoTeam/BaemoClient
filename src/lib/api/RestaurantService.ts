import AxiosClient from "./config";

class RestaurantService extends AxiosClient { 
  fetchAllMenus(r_seq: string | number) {
    return super.get(`/api/restaurant/${r_seq}/menu`);
  }

  fetchDetailMenus(m_seq: string) {
    return super.get(`/api/menu/${m_seq}`);
  }
}

const restaurantService = new RestaurantService();
export default restaurantService;