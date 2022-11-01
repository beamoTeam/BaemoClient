import { atom, useRecoilState } from 'recoil';
import AccessToken from "../../hooks/useToken";

console.log({ IsLOGIN: AccessToken.get() });

const loginState = atom({
  key: "loginState",
  default: AccessToken.get() ? true : false,
});

export const useLoginState = () => {
  const [isLogin, setIsLogin] = useRecoilState<any>(loginState);
  return [isLogin, setIsLogin];
};