import { atom, useRecoilState } from 'recoil';
// import useLocalStorage from '../../hooks/useLocalStorage';
let defaultCartState = null;
const cartItems = window.localStorage.getItem("CART");
if (cartItems) {
  defaultCartState = JSON.parse(cartItems);
}

const cartState = atom({
  key: "cartState",
  default: defaultCartState,
});

export const useCartState = () => {
  const [cart, setCart] = useRecoilState<any>(cartState);
  return [cart, setCart];
};