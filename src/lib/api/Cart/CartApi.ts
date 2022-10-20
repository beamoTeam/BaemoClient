import AxiosClient, {AuthClient} from "../config";

class CartService extends AxiosClient { 
  fetchCartItems(room_seq: any) {
    return AuthClient().get(`/api/basket/${room_seq}`);
  }
}

const cartService = new CartService();
export default cartService;