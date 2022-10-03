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
import restaurantService from "../lib/api/RestaurantService";
import groupOrderService from "../lib/api/GroupOrderService";
import { MenuModel } from "../types/menu";
import "./MenuDetail.css";
import { useNavigate } from "../hooks/useNavigate";
import useLocalStorage from "../hooks/useLocalStorage";

type optionsType = {
  [index: string]: boolean;
  coke: boolean;
  soda: boolean;
  cokeLarge: boolean;
  source: boolean;
};

type optionPriceType = {
  [index: string]: number;
  coke: number;
  soda: number;
  cokeLarge: number;
  source: number;
};

export default function MenuDetail() {
  const navigate = useNavigate();
  const [menuDetail, setMenuDetail] = useState<MenuModel | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [options, setOptions] = useState<optionsType>({
    coke: false,
    soda: false,
    cokeLarge: false,
    source: false,
  });
  const priceList: optionPriceType = {
    coke: 2000,
    soda: 2000,
    cokeLarge: 3000,
    source: 500,
  };

  const m_seq = window.location.pathname.split("/").at(-1);

  useEffect(() => {
    (async () => {
      try {
        const data = await restaurantService.fetchDetailMenus(String(m_seq));
        setMenuDetail(data);
        setTotalPrice(data.price);
      } catch (err: any) {
        throw new Error(err);
      }
    })();
  }, [m_seq]);

  const decrement = useCallback(() => {
    setQuantity(Math.max(1, quantity - 1));
  }, [quantity, setQuantity]);

  const increment = useCallback(() => {
    setQuantity(quantity + 1);
  }, [quantity, setQuantity]);

  if (!menuDetail) return <h3>로딩중...</h3>;

  const addToCart = async () => {
    const cartData: MenuModel = {
      category: menuDetail.category,
      count: quantity,
      img: menuDetail.img,
      name: menuDetail.name,
      price: menuDetail.price,
      restaurant_seq: menuDetail.restaurant_seq,
      seq: menuDetail.seq,
    };
    const c_seq = useLocalStorage.get("CHAT_SEQ");
    // console.log({ cartData, c_seq });
    const res = await groupOrderService.mutateToCart(c_seq, cartData);
    if (res.status === 200) {
      navigate(`/chat/${c_seq}`);
    }
  };

  const onCheck = (e: any) => {
    const { name, value } = e.target;
    setOptions({
      ...options,
      [name]: !value,
    });
  };

  let test = 0;
  for (let x in options) {
    if (options[x]) {
      test += priceList[x];
    }
  }

  return (
    <IonPage>
      <IonContent style={marginTop}>
        <IonImg src={menuDetail.img} style={ImgStyle} alt="메뉴 대표 사진" />
        <div className="restuarant_info">
          <IonLabel>
            <div className="menu_title">{menuDetail.name}</div>
          </IonLabel>
          <div className="menu_price">
            <div>가격</div>
            <div className="menu_price_number">
              {menuDetail.price.toLocaleString()}원
            </div>
          </div>
        </div>

        <IonList>
          <IonListHeader>
            <IonLabel>음료선택</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonCheckbox
              slot="start"
              name="coke"
              checked={options.coke}
              onChange={onCheck}
            ></IonCheckbox>
            <div className="detail_menu">
              <IonLabel>콜라 500ml</IonLabel>
              <IonLabel>+2,000원</IonLabel>
            </div>
          </IonItem>
          <IonItem>
            <IonCheckbox
              slot="start"
              name="soda"
              checked={options.soda}
              onChange={onCheck}
            ></IonCheckbox>
            <div className="detail_menu">
              <IonLabel>스프라이트 500ml</IonLabel>
              <IonLabel>+2,000원</IonLabel>
            </div>
          </IonItem>
          <IonItem>
            <IonCheckbox
              slot="start"
              name="cokeLarge"
              checked={options.cokeLarge}
              onChange={onCheck}
            ></IonCheckbox>
            <div className="detail_menu">
              <IonLabel>콜라 1.5L</IonLabel>
              <IonLabel>+3,000원</IonLabel>
            </div>
          </IonItem>

          <IonListHeader>
            <IonLabel>추가선택</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonCheckbox
              slot="start"
              name="source"
              checked={options.source}
              onChange={onCheck}
            ></IonCheckbox>
            <div className="detail_menu">
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
        <div className="total_field">
          <div className="total_price">
            <div>총 주문금액</div>
            <div>{(totalPrice * quantity + test).toLocaleString()}원</div>
          </div>
          <div className="min_price">배달 최소 주문금액 nn원</div>
          <div className="add_to_cart">
            <IonButton onClick={addToCart}>장바구니에 추가</IonButton>
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
    <div className="quantity_field">
      <div>수량 선택</div>
      <div className="quantity_btns">
        <IonButton onClick={decrement}>-</IonButton>
        <div>{quantity}</div>
        <IonButton onClick={increment}>+</IonButton>
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
  border: "1px solid silver",
};
