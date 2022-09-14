import { atom, useRecoilState } from 'recoil';

const addrState = atom({
  key: "addrState",
  default: null,
});

export const useAddrState = () => {
  const [addr, setAddr] = useRecoilState<any>(addrState);
  return [addr, setAddr];
};