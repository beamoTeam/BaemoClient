import { atom, useRecoilState } from 'recoil';
import AccessToken from "../../hooks/useToken";

console.log({ IsLOGIN: Boolean(AccessToken.get()) });

const loginState = atom({
  key: "loginState",
  default: Boolean(AccessToken.get())
});

export const useLoginState = () => {
  const [isLogin, setIsLogin] = useRecoilState<any>(loginState);
  return [isLogin, setIsLogin];
};