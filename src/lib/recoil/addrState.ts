import { atom, useRecoilState } from 'recoil';
import useLocalStorage from '../../hooks/useLocalStorage';

const addrState = atom({
  key: "addrState",
  default: useLocalStorage.get("ADDR"),
});

export const useAddrState = () => {
  const [addr, setAddr] = useRecoilState<any>(addrState);
  return [addr, setAddr];
};