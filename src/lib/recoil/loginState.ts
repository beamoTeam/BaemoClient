import { atom, useRecoilState } from 'recoil';
import AccessToken from "../../hooks/useToken";

const loginState = atom({
  key: "loginState",
  default: AccessToken.get() ? true : false,
});

export const useLoginState = () => {
  const [isLogin, setIsLogin] = useRecoilState<any>(loginState);
  return [isLogin, setIsLogin];
};