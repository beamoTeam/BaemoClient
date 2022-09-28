import { useCallback } from "react";
import {
  IonPage,
  IonContent,
  IonImg,
  IonList,
  IonItem,
  IonLabel,
  IonListHeader,
  IonCheckbox,
  IonButton,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import restaurantService from "../lib/api/RestaurantService";
import { MenuModel } from "../types/menu";
import "./MenuDetail.css";

// *********************
// 세부메뉴 api 필요
// *********************

interface SideMenuModel {
  side_menu_seq: number;
  name: string;
  price: number;
  checked: boolean;
}

interface MenuDetailModel {
  menu_seq: number;
  side_menu: SideMenuModel[];
}

export default function MenuDetail() {
  const [menuDetail, setMenuDetail] = useState<MenuModel | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const { m_seq } = useParams<{ m_seq: string }>();

  useEffect(() => {
    (async () => {
      try {
        const data = await restaurantService.fetchDetailMenus(m_seq);
        setMenuDetail(data);
      } catch (err: any) {
        throw new Error(err);
      }
    })();
  }, [m_seq]);

  const decrement = useCallback(() => {
    console.log();
    setQuantity(Math.max(1, quantity - 1));
  }, [quantity, setQuantity]);

  const increment = useCallback(() => {
    setQuantity(quantity + 1);
  }, [quantity, setQuantity]);

  if (!menuDetail) return <h3>로딩중...</h3>;

  return (
    <IonPage>
      <IonContent style={marginTop}>
        <IonImg src={menuDetail.img} style={ImgStyle} alt="메뉴 대표 사진" />
        <IonLabel>
          <div>{menuDetail.name}</div>
        </IonLabel>
        <div>
          <div>가격</div>
          <div>{menuDetail.price.toLocaleString()}원</div>
        </div>

        <IonList>
          <IonListHeader>
            <IonLabel>음료선택</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonCheckbox slot="start"></IonCheckbox>
            <div>
              <IonLabel>콜라 500ml</IonLabel>
              <IonLabel>+2,000원</IonLabel>
            </div>
          </IonItem>
          <IonItem>
            <IonCheckbox slot="start"></IonCheckbox>
            <div>
              <IonLabel>스프라이트 500ml</IonLabel>
              <IonLabel>+0원</IonLabel>
            </div>
          </IonItem>
          <IonItem>
            <IonCheckbox slot="start"></IonCheckbox>
            <div>
              <IonLabel>콜라 1.5L</IonLabel>
              <IonLabel>+2,000원</IonLabel>
            </div>
          </IonItem>

          <IonListHeader>
            <IonLabel>추가선택</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonCheckbox slot="start"></IonCheckbox>
            <div>
              <IonLabel>소스 추가</IonLabel>
              <IonLabel>+500원</IonLabel>
            </div>
          </IonItem>
        </IonList>
        <MenuQuantity
          quantity={quantity}
          increment={increment}
          decrement={decrement}
        />
        {/* TOTAL */}
        <div>
          <div>
            <div>총 주문금액</div>
            <div>22,500</div>
          </div>
          <div>배달 최소 주문금액 </div>
          <div>
            <IonButton>장바구니에 추가</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

interface MenuQuantityInterface {
  quantity: number;
  increment: () => void;
  decrement: () => void;
}

function MenuQuantity({
  quantity,
  increment,
  decrement,
}: MenuQuantityInterface) {
  return (
    <div>
      <div>수량 선택</div>
      <div>
        <IonButton onClick={increment}>+</IonButton>
        <div>{quantity}</div>
        <IonButton onClick={decrement}>-</IonButton>
      </div>
    </div>
  );
}

const marginTop = {
  marginTop: "60px",
};

const ImgStyle = {
  width: "100%",
  height: "15rem",
  marginTop: "60px",
  border: "1px solid black",
};
