import {
  IonPage,
  IonContent,
  IonItem,
  IonImg,
  IonButton,
  IonLabel,
} from "@ionic/react";
import { useEffect, useState } from "react";
import css from "./Cart.module.css";
import isLogin from "../utils/isLogin";
import groupOrderService from "../lib/api/GroupOrderService";
import parseMenu from "../utils/parseMenu";
import getUserCart from "../lib/api/Cart/getUserCart";
import { MenuModel } from "../types/menu";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import QuantityButton from "../components/button/QuantityButton";
import chatService from "../lib/api/ChatService";
import Spinner, { ButtonSpinner } from "../components/spinner/Spinner";

export default function Cart() {
  const history = useHistory();
  const [cartItems, setCartItems] = useState<any>([]);
  const chat_seq = window.localStorage.getItem("CHAT_SEQ");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isLogin()) {
      history.push("/home");
      return;
    }
    (async () => {
      try {
        const data = await getUserCart(chat_seq);
        console.log("****");
        console.log(data);
        setCartItems(parseMenu(data.basketMenuList));
      } catch (err) {
        console.error(err);
      }
    })();
  }, [chat_seq, history]);

  const handleOrder = async () => {
    setIsLoading(true);
    try {
      const { data } = await groupOrderService.mutateOrder(chat_seq);
      if (data === "이미 결제되었습니다. 다시 확인하세요.") {
        alert(data);
        history.push(`/chatting/${chat_seq}`);
        return;
      }

      await chatService.sendMessage({
        sender: `mainMenu_${data.sender}`,
        roomNum: data.roomNum,
        msg: JSON.stringify(parseMenu(data.basketMenuList)),
      });

      window.localStorage.setItem("CHAT_SENDER", data.sender);
      history.push(`/chatting/${chat_seq}`);
    } catch (err: any) {
      console.error(err);
      alert("알수없는 오류가 발생했습니다.");
    } finally {
      alert("결제가 완료되었습니다.");
      setIsLoading(false);
    }
  };

  if (!cartItems) return <Spinner />;
  const totalPrice = cartItems.reduce(
    (acc: any, item: any) => (acc += item.price),
    0
  );

  return (
    <>
      <IonPage style={{ padding: "50px 0" }}>
        <IonContent fullscreen>
          <IonItem>
            <div className={css.title}>BBQ청계 목대점</div>
          </IonItem>

          {cartItems.length === 0 ? (
            <IonItem>
              <p>장바구니에 상품이 없습니다.</p>
            </IonItem>
          ) : (
            <>
              <IonItem>
                <div className={css.cartList}>
                  {[...cartItems].map((x: MenuModel, idx: any) => {
                    return <CartMenuItem key={idx} cartItem={x} />;
                  })}
                </div>
              </IonItem>

              <p className={css.addMore}>
                <Link to={`/restaurant/${cartItems[0].restaurant_seq}`}>
                  + 더 담으러 가기
                </Link>
              </p>

              <IonItem>
                <div className={css.price}>
                  <div>
                    상품금액 <div>{totalPrice.toLocaleString()}원</div>
                  </div>
                  <div>
                    배달 요금 <div>1,500원</div>
                  </div>
                </div>
              </IonItem>

              <IonItem>
                <div className={css.fee}>
                  <p>총 주문금액</p>
                  <p>{(totalPrice + 1500).toLocaleString()}</p>
                </div>
              </IonItem>

              <IonItem>
                <div className={css.orderButton}>
                  <IonButton onClick={handleOrder}>
                    {isLoading ? <ButtonSpinner /> : "결제하기"}
                  </IonButton>
                </div>
              </IonItem>
            </>
          )}
        </IonContent>
      </IonPage>
    </>
  );
}

interface CartMenuItemProps {
  cartItem: MenuModel;
}

function CartMenuItem({ cartItem }: CartMenuItemProps) {
  const [quantity, setQuantity] = useState<any>(cartItem.count);

  return (
    <IonItem>
      <div className={css.menuWrap}>
        <IonLabel className={css.menu}>{cartItem.name}</IonLabel>
        <div className={css.menuInfo}>
          <div>
            <IonImg src={cartItem.img} className={css.img} />
          </div>
          <div className={css.info}>
            <p>- 가격: {cartItem.price.toLocaleString()}원</p>
            <p>- 음료: 콜라</p>
          </div>
          <div className={css.quan}>
            <QuantityButton quantity={quantity} setQuantity={setQuantity} />
          </div>
        </div>
      </div>
    </IonItem>
  );
}
