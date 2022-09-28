import { useEffect } from "react";
import { useNavigate } from "../hooks/useNavigate";
import loginService from "../lib/api/LoginService";
import AccessToken from "../hooks/useToken";

export default function KakaoRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    (async () => {
      const res = await loginService.getAccessToken(code);
      AccessToken.set(res);
      navigate("/");
    })();
  }, [navigate]);

  return <h3>로그인중..</h3>;
}
