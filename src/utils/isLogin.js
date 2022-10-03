import AccessToken from "../hooks/useToken"

export default function isLogin() {
  const TOKEN = AccessToken.get();
  return TOKEN !== null;
}
