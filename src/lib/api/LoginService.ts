import AxiosClient from "./config";

class LoginService extends AxiosClient { 
  async getAccessToken(code: string | null) {
    return super.get(`/api/oauth/kakao?code=${code}`);
  }
}

const loginService = new LoginService();
export default loginService;