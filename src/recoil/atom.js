import { atom, selector, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "seq", // this key is using to store data in local storage
  storage: localStorage, // configurate which stroage will be used to store the data
});

// Chatting Seq
export const chatSeqState = atom({
  key: "chatSeqState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const useChatSeqState = () => {
  const [chatSeq, setChatSeq] = useRecoilState(chatSeqState);
  return { chatSeq, setChatSeq };
};

// CART
export const cartState = atom({
  key: "cartState",
  default: [], // props: { id, image, title, price, count }
});

export const cartCountState = selector({
  key: "cartCountState",
  get: ({ get }) => {
    const cartCnt = get(cartState).length;
    return cartCnt;
  },
});

export const useCartState = () => {
  const [cart, setCart] = useRecoilState(cartState);
  return { cart, setCart };
};

// Visibility
export const visibilityState = atom({
  key: "visibilityState",
  default: true,
});

export function useVisibilityState() {
  const [visibility, setVisibility] = useRecoilState(visibilityState);
  return { visibility, setVisibility };
}

// LOGIN
export const userSeqState = atom({
  key: "userSeqState",
  default: true,
  effects_UNSTABLE: [persistAtom],
});

export const useUserSeqState = () => {
  const [userSeq, setUserSeq] = useRecoilState(userSeqState);
  return { userSeq, setUserSeq };
};

// ADDRESS
export const addrState = atom({
  key: "addrState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const useAddrState = () => {
  const [addr, setAddr] = useRecoilState(addrState);
  return { addr, setAddr };
};