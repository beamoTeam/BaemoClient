import SheetModal from "./common/SheetModal";
import { IonImg } from "@ionic/react";

export default function LoginModal() {
  return (
    <SheetModal type="login">
      <IonImg
        src="assets/images/kakao_login_medium.png"
        title="kakao-login"
        style={{ width: "150px", height: "50px" }}
      />
    </SheetModal>
  );
}
