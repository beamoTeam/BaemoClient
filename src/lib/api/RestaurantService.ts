import AxiosClient from "./config";

class RestaurantService extends AxiosClient { 
  async fetchAllMenus(r_seq: string) {
    return super.get(`/api/restaurant/${r_seq}/menu`);
  }
}

const restaurantService = new RestaurantService();
export default restaurantService;