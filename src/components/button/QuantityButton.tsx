import { IonButton } from "@ionic/react";
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
      <button onClick={decrement} className={css.minus}>-</button>
      <div className={css.text}>{quantity}</div>
      <button onClick={increment} className={css.plus}>+</button>
      {/* <IonButton onClick={decrement}>-</IonButton> */}
      {/* <div className={css.text}>{quantity}</div> */}
      {/* <IonButton onClick={increment}>+</IonButton> */}
    </div>
  );
}
