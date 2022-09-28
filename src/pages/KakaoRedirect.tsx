import { useEffect } from "react";
import { useNavigate } from "../hooks/useNavigate";
import loginService from "../lib/api/LoginService";

export default function KakaoRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    (async () => {
      const res = await loginService.getAccessToken(code);
      console.log(res);
      alert(JSON.stringify(res));
      // data를 받아서 client단 어딘가에 저장.
      // localStorage.setItem("access_token", data);
      navigate("/");
    })();
  }, [navigate]);

  return <h3>로그인중..</h3>;
}
