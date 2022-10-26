import SheetModal from "./common/SheetModal";
import { IonContent, IonListHeader } from "@ionic/react";
import css from "./OrderDetailModal.module.css";

interface OrderDetailModalProps {
  orderDetail: any;
}

export default function AddressModal({ orderDetail }: OrderDetailModalProps) {
  const { order, restaurant, chatInfo, basketMenuList } = orderDetail;

  return (
    <SheetModal>
      <IonContent className="ion-padding">
        <IonListHeader className={css.heading}>주문 내역</IonListHeader>
        <div className={css.name}>
          <span>{restaurant.name}</span>
        </div>

        <div className={css.time}>
          <p>주문시간</p>
          <p>{order.createdDateTime}</p>
        </div>

        <div className={css.history}>
          <span>주문 내역</span>
          <ul className={css.menuList}>
            {basketMenuList.map((menu: any, idx: number) => (
              <li key={idx}>
                <span>
                  {menu.name} x {menu.count}
                </span>
                <span>{menu.price.toLocaleString()}원</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={css.price}>
          <span>상품 합계</span>
          <span>{order.payAmount.toLocaleString()}원</span>
        </div>

        <div className={css.addr}>
          <h4>배달주소</h4>
          <p>{chatInfo.address}</p>
        </div>
      </IonContent>
    </SheetModal>
  );
}
