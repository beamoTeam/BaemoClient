import AxiosClient from "./config";

class LoginService extends AxiosClient { 
  getAccessToken(code: string | null) {
    return super.get(`/oauth/kakao?code=${code}`);
  }

  logout() {
    return this.authClient.get("/oauth/me");
  }
}

const loginService = new LoginService();
export default loginService;