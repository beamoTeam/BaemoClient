import { atom, useRecoilState } from 'recoil';

const cartState = atom({
  key: "cartState",
  default: JSON.parse(window.localStorage.getItem("CART")!) || 0,
});

export const useCartState = () => {
  const [cart, setCart] = useRecoilState<any>(cartState);
  return [cart, setCart];
};

export const emptyingCart = (setCart: any) => {
  window.localStorage.setItem("CART", JSON.stringify(0));
  setCart(0);
}