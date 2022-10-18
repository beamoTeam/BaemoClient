import {
  IonPage,
  IonContent,
  IonItem,
  IonImg,
  IonButton,
  IonLabel,
} from "@ionic/react";
import css from "./Cart.module.css";
import { Redirect } from "react-router-dom";
import isLogin from "../utils/isLogin";
import groupOrderService from "../lib/api/GroupOrderService";
import chatService from "../lib/api/ChatService";
import parseMenu from "../utils/parseMenu";
import { useCartState } from "../lib/recoil/cartState";

export default function Cart() {
  const [cart] = useCartState();
  // console.log(cart);
  const parsedCart = parseMenu(cart);
  console.log(parsedCart);
  const handleOrder = async () => {
    const { data } = await groupOrderService.mutateOrder(
      window.localStorage.getItem("CHAT_SEQ")
    );
    console.log(data);
    return;
    const parsedBasketMenuList = parseMenu(data.basketMenuList);
    console.log(parsedBasketMenuList);
    const res2 = await chatService.sendMessage({
      sender: data.sender,
      roomNum: data.roomNum,
      msg: parsedBasketMenuList,
    });
    console.log(res2);
  };

  return (
    <>
      {!isLogin() ? (
        <Redirect to={{ pathname: "/" }} />
      ) : (
        <IonPage style={{ paddingTop: "50px" }}>
          <IonContent fullscreen>
            <IonItem>
              <div className={css.title}>BBQ청계 목대점</div>
            </IonItem>

            <IonItem>
              <div className={css.menuWrap}>
                <IonLabel className={css.menu}>
                  황금올리브치킨 + 콜라1.25L
                </IonLabel>
                <div className={css.menuInfo}>
                  <div>
                    <IonImg src="" />
                  </div>
                  <div>
                    <p>- 가격:</p>
                    <p>- 음료: 콜라</p>
                    <p>20,000 원</p>
                  </div>
                  <div className={css.quan}>
                    <IonButton>-</IonButton>
                    <span>1</span>
                    <IonButton>+</IonButton>
                  </div>
                </div>
              </div>
            </IonItem>

            <IonItem>
              <div className={css.price}>
                <p>배달 요금</p>
                <div className={css.fee}>
                  <p>모집2/4</p>
                  <p>1500원</p>
                </div>
              </div>
            </IonItem>

            <IonItem>
              <div>
                <p>총 주문금액</p>
                <p>21,500원</p>
              </div>
            </IonItem>

            <IonItem>
              <div className={css.orderButton}>
                <IonButton onClick={handleOrder}>주문하기</IonButton>
              </div>
            </IonItem>
          </IonContent>
        </IonPage>
      )}
    </>
  );
}
