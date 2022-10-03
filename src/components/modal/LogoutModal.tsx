import { useCallback } from "react";
import { useModalState } from "../../lib/recoil/modalState";
import loginService from "../../lib/api/LoginService";
import AccessToken from "../../hooks/useToken";
import { useNavigate } from "../../hooks/useNavigate";
import CardModal from "./common/CardModal";
import css from "./LogoutModal.module.css";
import { useLoginState } from "../../lib/recoil/loginState";

export default function LogoutModal() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useLoginState();
  const [, setModal] = useModalState();

  const close = useCallback(() => {
    setModal(null);
  }, [setModal]);

  const logout = async () => {
    if (isLogin) {
      const res = await loginService.logout();
      if (res.status === 200) {
        AccessToken.remove();
        close();
        setIsLogin(false);
        navigate("/home", { replace: true });
      }
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
