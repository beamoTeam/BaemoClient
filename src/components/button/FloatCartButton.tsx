import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import css from "./FloatCartButton.module.css";
import { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useLoginState } from "../../lib/recoil/loginState";
import { useEffect } from "react";
import cartService from "../../lib/api/Cart/CartApi";

const unVisibleUrl: any = {
  cart: true,
  chatting: true,
  profile: true,
};

export default function FloatCartButton() {
  const history = useHistory();
  const location = useLocation();
  // const [cart] = useCartState();
  const [cart, setCart] = useState<any>(null);
  const [isLogin] = useLoginState();
  const chat_seq = window.localStorage.getItem("CHAT_SEQ");

  useEffect(() => {
    (async () => {
      if (!chat_seq) {
        return;
      }
      try {
        const { data } = await cartService.fetchCartItems(chat_seq);
        setCart(data.basketMenuList);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [location, chat_seq]);

  if (!isLogin) return null;
  if (!!unVisibleUrl[location.pathname.split("/")[1]]) {
    return null;
  }

  const goToCart = () => {
    history.push("/cart");
  };

  return cart && cart.length > 0 ? (
    <div onClick={goToCart}>
      <div className={css.cartPosition}>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={cartOutline} />
            <div className={css.counter}>{cart.length}</div>
          </IonFabButton>
        </IonFab>
      </div>
    </div>
  ) : null;
}
