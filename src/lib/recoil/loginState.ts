import { atom, useRecoilState } from 'recoil';
import { AUTH_TOKEN } from '../../utils/contants';

const loginState = atom({
  key: "loginState",
  default: window.localStorage.getItem(AUTH_TOKEN) ? true : false,
});

export const useLoginState = () => {
  const [login, setLogin] = useRecoilState<any>(loginState);
  return [login, setLogin];
};