import { useCallback } from "react";
import { useModalState } from "../../lib/recoil/modalState";
import loginService from "../../lib/api/LoginService";
import AccessToken from "../../hooks/useToken";
import { useNavigate } from "../../hooks/useNavigate";
import CardModal from "./common/CardModal";
import css from "./LogoutModal.module.css";
import { useLoginState } from "../../lib/recoil/loginState";
import { useAddrState } from "../../lib/recoil/addrState";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function EnterModal() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useLoginState();
  const [, setModal] = useModalState();

  const close = useCallback(() => {
    setModal(null);
  }, [setModal]);

  return (
    <CardModal>
      <p className={css.logoutText}>로그아웃 하시겠습니까?</p>
      <div className={css.cardModalBtns}>
        <button className={css.no} onClick={close}>
          취소
        </button>
        <button className={css.yes}>확인</button>
      </div>
    </CardModal>
  );
}
