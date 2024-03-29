import AxiosClient, {AuthClient} from "../config";

class UserApis extends AxiosClient { 
  fetchUserProfile() {
    return AuthClient().get("/api/user/info");
  }

  fetchUserOrderHistory() {
    return AuthClient().get("/api/order");
  }

  fetchUserChatList() {
    return AuthClient().get("/api/room/user");
  }
}

const userApis = new UserApis();
export default userApis;