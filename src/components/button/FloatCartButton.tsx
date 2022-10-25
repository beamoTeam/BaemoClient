import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import css from "./FloatCartButton.module.css";
import { useLocation } from "react-router-dom";
import { useLoginState } from "../../lib/recoil/loginState";
import { useCartState } from "../../lib/recoil/cartState";

const unVisibleUrl: any = {
  cart: true,
  chatting: true,
  profile: true,
};

export default function FloatCartButton() {
  const location = useLocation();
  const [cart] = useCartState();
  const [isLogin] = useLoginState();

  if (!isLogin) return null;
  if (!!unVisibleUrl[location.pathname.split("/")[1]]) {
    return null;
  }

  const goToCart = () => {
    window.location.href = "/cart";
  };

  return cart > 0 ? (
    <div onClick={goToCart}>
      <div className={css.cartPosition}>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={cartOutline} />
            <div className={css.counter}>{cart}</div>
          </IonFabButton>
        </IonFab>
      </div>
    </div>
  ) : null;
}
