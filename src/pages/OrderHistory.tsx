import {
  IonPage,
  IonContent,
  IonLabel,
  IonListHeader,
  IonList,
  IonItem,
  IonImg,
} from "@ionic/react";
import userApis from "../lib/api/User/UserApi";
import { useEffect, useState } from "react";
import Spinner from "../components/spinner/Spinner";
import { useModalState } from "../lib/recoil/modalState";
import OrderDetailModal from "../components/modal/OrderDetailModal";
import css from "./OrderHistory.module.css";
import { useHistory } from "react-router";
import { useLoginState } from "../lib/recoil/loginState";

export default function OrderHistory() {
  const [, setModal] = useModalState();
  const [orderHistory, setOrderHistory] = useState<any[] | null>(null);
  const history = useHistory();
  const [isLogin] = useLoginState();

  useEffect(() => {
    if (!isLogin) {
      history.goBack();
    }
  }, [isLogin, history]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await userApis.fetchUserOrderHistory();
        setOrderHistory(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const openOrderDetailModal = (orderDetail: any) => {
    setModal(<OrderDetailModal orderDetail={orderDetail} />);
  };

  if (!orderHistory) return <Spinner />;

  return (
    <IonPage style={{ marginTop: "50px", marginBottom: "55px" }}>
      <IonContent className="ion-padding">
        <IonListHeader>
          <IonLabel>주문 내역</IonLabel>
        </IonListHeader>

        <IonList>
          {orderHistory.map((history: any, idx: number) => (
            <IonItem
              key={idx}
              onClick={() => openOrderDetailModal(history)}
              detail={true}
              className={css.item}
            >
              <IonImg src={history.restaurant.img} className={css.img} />
              {/* <IonLabel> */}
              <div className={css.info}>
                <h2 className={css.name}>{history.restaurant.name}</h2>
                <h3 className={css.preview}>
                  {history.basketMenuList[0].name}외
                  {history.basketMenuList.length - 1}개{" "}
                  {history.order.payAmount.toLocaleString()}원
                </h3>
              </div>
              {/* </IonLabel> */}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
