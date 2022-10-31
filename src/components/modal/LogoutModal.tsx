import { useCallback } from "react";
import AccessToken from "../../hooks/useToken";
import { useNavigate } from "../../hooks/useNavigate";
import CardModal from "./common/CardModal";
import css from "./LogoutModal.module.css";
import { useLoginState } from "../../lib/recoil/loginState";
import { useAddrState } from "../../lib/recoil/addrState";
import { useModalState } from "../../lib/recoil/modalState";
import { useCartState } from "../../lib/recoil/cartState";
import { useChatMenuState } from "../../lib/recoil/chatMenuState";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function LogoutModal() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useLoginState();
  const [, setAddr] = useAddrState();
  const [, setModal] = useModalState();
  const [, setCart] = useCartState();
  const [, setChatMenu] = useChatMenuState();

  const close = useCallback(() => {
    setModal(null);
  }, [setModal]);

  const logout = async () => {
    if (isLogin) {
      // reset localStorage
      AccessToken.remove();
      useLocalStorage.remove("ADDR");
      useLocalStorage.remove("CART");
      useLocalStorage.remove("CHAT_SEQ");
      useLocalStorage.remove("CHAT_SENDER");

      // reset global State
      setAddr(null);
      setCart(null);
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
