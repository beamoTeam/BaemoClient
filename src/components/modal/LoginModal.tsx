import SheetModal from "./common/SheetModal";
import { IonImg } from "@ionic/react";
import { useNavigate } from "../../hooks/useNavigate";

export default function LoginModal() {
  const navigate = useNavigate();

  const kakaoLogin = () => {
    console.log(1);
    navigate(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URL}&response_type=code`
    );
  };

  return (
    <SheetModal type="login">
      <div>
        <IonImg
          src="assets/images/kakao_login_medium.png"
          style={{ width: "150px", height: "50px" }}
          alt="kakao-login"
          onClick={kakaoLogin}
        />
      </div>
    </SheetModal>
  );
}
