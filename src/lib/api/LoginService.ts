import AxiosClient from "./config";

class LoginService extends AxiosClient { 
<<<<<<< HEAD
  async getAccessToken(code: string | null) {
    return super.get(`/api/oauth/kakao?code=${code}`);
=======
  getAccessToken(code: string | null) {
    return super.get(`/oauth/kakao?code=${code}`);
  }

  logout() {
    return this.authClient.get("/oauth/me");
>>>>>>> 9893d184ae93da73f4b8e38806dd00762547c9b1
  }
}

const loginService = new LoginService();
export default loginService;