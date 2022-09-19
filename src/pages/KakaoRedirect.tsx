import { useEffect } from "react";
import loginService from "../lib/api/LoginService";

export default function KakaoRedirect() {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    (async () => {
      const data = await loginService.getAccessToken(code);
      // data를 받아서 client단 어딘가에 저장.
      // localStorage.setItem("access_token", data);
    })();
  }, []);

  return <h3>로그인중..</h3>;
}
