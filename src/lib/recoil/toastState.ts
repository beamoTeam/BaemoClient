import { atom, useRecoilState } from 'recoil';

export const toastState = atom({
  key: "toastState",
  default: false,
});

export const useToastState = () => {
  const [toast, setToast] = useRecoilState<any>(toastState);
  return [toast, setToast];
};