import { useEffect } from "react";
import { useHistory } from "react-router";
import loginService from "../lib/api/LoginService";
import AccessToken from "../hooks/useToken";
import { useLoginState } from "../lib/recoil/loginState";
import useApis from "../lib/api/User/UserApi";
import Spinner from "../components/spinner/Spinner";

export default function KakaoRedirect() {
  const history = useHistory();
  const [isLogin, setIsLogin] = useLoginState();

  useEffect(() => {
    if (!isLogin) {
      const code = new URL(window.location.href).searchParams.get("code");
      (async () => {
        const res = await loginService.getAccessToken(code);
        console.log(" 로그인 응답 :: ", res);
        if (typeof res === "string") {
          AccessToken.set(res);
          setIsLogin(true);
        }
        const { data } = await useApis.fetchUserProfile();
        window.localStorage.setItem("CHAT_SENDER", data.name);
      })();
    }
    console.log("로그인 완료 후 :: ", isLogin);
    history.push("/");
  }, [isLogin, history, setIsLogin]);

  return (
    <div style={bgStyle}>
      <div>
        <Spinner message={"로그인 처리중 입니다."} />
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
