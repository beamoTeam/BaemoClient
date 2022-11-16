import { atom, useRecoilState } from 'recoil';

export const addrState = atom({
  key: "addrState",
  default: window.localStorage.getItem("ADDR"),
});

export const useAddrState = () => {
  const [addr, setAddr] = useRecoilState<any>(addrState);
  return [addr, setAddr];
};