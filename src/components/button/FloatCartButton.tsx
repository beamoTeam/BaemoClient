import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import css from "./FloatCartButton.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoginState } from "../../lib/recoil/loginState";
import getUserCart from "../../lib/api/Cart/getUserCart";

const unVisibleUrl: any = {
  "/cart": true,
  "/chatting": true,
};

// 채팅방 번호로 장바구니 조회. 상품 개수 띄움
export default function FloatCartButton() {
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const [isLogin] = useLoginState();

  useEffect(() => {
    (async () => {
      try {
        const room_seq = window.localStorage.getItem("CHAT_SEQ");
        if (!room_seq) {
          return;
        }
        const { data } = await getUserCart(room_seq);
        setCart(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  if (!isLogin) return null;

  if (unVisibleUrl[location.pathname.split("/")[1]]) {
    return null;
  }

  return cart && cart.length > 0 ? (
    <Link to="/cart">
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton>
          <IonIcon icon={cartOutline} />
          <div className={css.counter}>{cart.length}</div>
        </IonFabButton>
      </IonFab>
    </Link>
  ) : null;
}
