import AxiosClient, {AuthClient} from "../config";

class UserApis extends AxiosClient { 
  fetchUserProfile() {
    return AuthClient().get("/api/user/info");
  }
}

const userApis = new UserApis();
export default userApis;