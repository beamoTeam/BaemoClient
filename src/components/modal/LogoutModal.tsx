import { useCallback } from "react";
import AccessToken from "../../hooks/useToken";
import CardModal from "./common/CardModal";
import css from "./LogoutModal.module.css";
import { useLoginState } from "../../lib/recoil/loginState";
import { useModalState } from "../../lib/recoil/modalState";
import { useChatMenuState } from "../../lib/recoil/chatMenuState";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function LogoutModal() {
  const [isLogin, setIsLogin] = useLoginState();
  const [, setModal] = useModalState();
  const [, setChatMenu] = useChatMenuState();

  const close = useCallback(() => {
    setModal(null);
  }, [setModal]);

  const logout = async () => {
    if (isLogin) {
      // reset localStorage
      AccessToken.remove();
      useLocalStorage.remove("ADDR");
      useLocalStorage.remove("CHAT_SEQ");
      useLocalStorage.remove("CHAT_SENDER");

      // reset global State
      setIsLogin(false);
      setChatMenu([]);
      //
      close();
      // navigate("/home");
      window.location.href = "/home";
    }
  };

  return (
    <CardModal>
      <p className={css.logoutText}>로그아웃 하시겠습니까?</p>
      <div className={css.cardModalBtns}>
        <button className={css.no} onClick={close}>
          취소
        </button>
        <button className={css.yes} onClick={logout}>
          확인
        </button>
      </div>
    </CardModal>
  );
}
