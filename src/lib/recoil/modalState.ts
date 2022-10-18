import { atom, useRecoilState, selector } from 'recoil';

export const modalState = atom({
  key: "modalState",
  default: null,
});

export const useModalState = () => {
  const [modal, setModal] = useRecoilState<any>(modalState);
  return [modal, setModal];
};

export const modalPresentState = selector({
  key: 'present',
  get: ({ get }) => {
    let modalPresent = get(modalState);
    return modalPresent ? true : false;
  },
});