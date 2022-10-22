import { atom, useRecoilState } from 'recoil';

export const chatMenuState = atom({
  key: "chatMenuState",
  default: [],
});

export const useChatMenuState = () => {
  const [chatMenu, setChatMenu] = useRecoilState<any>(chatMenuState);
  return [chatMenu, setChatMenu];
};
