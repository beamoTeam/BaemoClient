import { useEffect } from "react";
import { useNavigate } from "../hooks/useNavigate";
import { IonSpinner } from "@ionic/react";
import loginService from "../lib/api/LoginService";
import AccessToken from "../hooks/useToken";
import { useLoginState } from "../lib/recoil/loginState";

export default function KakaoRedirect() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useLoginState();

  useEffect(() => {
    if (!isLogin) {
      const code = new URL(window.location.href).searchParams.get("code");
      (async () => {
        const res = await loginService.getAccessToken(code);
        console.log("****** : ", res);
        AccessToken.set(res);
        setIsLogin(true);
      })();
    }
    navigate("/");
  }, [navigate]);

  return (
    <div style={bgStyle}>
      <div>
        <IonSpinner></IonSpinner>
        <p style={para1Style}>로그인 처리중 입니다.</p>
      </div>
    </div>
  );
}

const bgStyle = {
  background: "white",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  color: "black",
  fontWeight: "bold",
};

const para1Style = {
  marginTop: "10px",
  marginBottom: "10px",
  display: "flex",
  justifyContent: "center",
};
