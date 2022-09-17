import { atom, useRecoilState } from 'recoil';

const modalState = atom({
  key: "modalState",
  default: null,
});

export const useModalState = () => {
  const [modal, setModal] = useRecoilState<any>(modalState);
  return [modal, setModal];
};