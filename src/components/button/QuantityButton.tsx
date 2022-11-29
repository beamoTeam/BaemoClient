import { useCallback } from "react";
import css from "./QuantityButton.module.css";

interface QuantityButtonInterface {
  quantity: number;
  setQuantity: (newQuantity: number) => void;
}

export default function QuantityButton({
  quantity,
  setQuantity,
}: QuantityButtonInterface) {
  const decrement = useCallback(() => {
    setQuantity(Math.max(1, quantity - 1));
  }, [quantity, setQuantity]);

  const increment = useCallback(() => {
    setQuantity(quantity + 1);
  }, [quantity, setQuantity]);

  return (
    <div className={css.quantity_btns}>
      <div onClick={decrement} className={css.counter}>-</div>
      <div className={css.text}>{quantity}</div>
      <div onClick={increment} className={css.counter}>+</div>
    </div>
  );
}
