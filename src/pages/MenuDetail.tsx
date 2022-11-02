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
import { useHistory, useLocation } from "react-router";
import useLocalStorage from "../hooks/useLocalStorage";
import { useLoginState } from "../lib/recoil/loginState";
import { ButtonSpinner } from "../components/spinner/Spinner";
import QuantityButton from "../components/button/QuantityButton";

type optionsType = {
  [index: string]: boolean;
  coke: boolean;
  soda: boolean;
  cokeLarge: boolean;
  source: boolean;
};

export default function MenuDetail() {
  const history = useHistory();
  const location = useLocation();
  const [isLogin] = useLoginState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [menuDetail, setMenuDetail] = useState<MenuModel | null>(null);
  const chat_seq = useLocalStorage.get("CHAT_SEQ");
  const [quantity, setQuantity] = useState<number>(1);
  const [options] = useState<optionsType>({
    coke: false,
    soda: false,
    cokeLarge: false,
    source: false,
  });

  // private Route
  useEffect(() => {
    if (!isLogin || !chat_seq) {
      history.push("/");
    }
  }, [isLogin, chat_seq, history]);

  // Initial Data Fetching
  useEffect(() => {
    const m_seq = location.pathname.split("/").at(-1);
    (async () => {
      try {
        const data = await restaurantService.fetchDetailMenus(String(m_seq));
        setMenuDetail(data);
      } catch (err: any) {
        throw new Error(err);
      }
    })();
  }, [location.pathname]);

  if (!menuDetail) return <h3>로딩중...</h3>;

  // API call
  const addToCart = async () => {
    setIsLoading(true);
    try {
      const cartData: MenuModel = {
        category: menuDetail.category,
        count: quantity,
        img: menuDetail.img,
        name: menuDetail.name,
        price: menuDetail.price,
        restaurant_seq: menuDetail.restaurant_seq,
        seq: menuDetail.seq,
      };
      const { data } = await groupOrderService.mutateToCart(chat_seq, cartData);
      history.goBack();
    } catch (err: any) {
      alert("장바구니 추가에 실패했습니다. 다시 시도해주세요.");
      console.error(err.response.data);
    } finally {
      setIsLoading(true);
    }
  };

  return (
    <IonPage style={{ marginBottom: "55px" }}>
      <IonContent style={marginTop}>
        <IonImg src={menuDetail.img} style={ImgStyle} alt="메뉴 대표 사진" />
        <div className="restuarant_info">
          <IonLabel>
            <div className="menu_title">{menuDetail.name}</div>
          </IonLabel>
          <div className="menu_price">
            <div>가격</div>
            <div className="menu_price_number">
              {menuDetail?.price?.toLocaleString()}원
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
            ></IonCheckbox>
            <div className="detail_menu">
              <IonLabel>소스 추가</IonLabel>
              <IonLabel>+500원</IonLabel>
            </div>
          </IonItem>
        </IonList>
        <div className="quantity_field">
          <div>수량 선택</div>
          <QuantityButton quantity={quantity} setQuantity={setQuantity} />
        </div>
        {/* TOTAL */}
        <div className="total_field">
          <div className="total_price">
            <div>총 주문금액</div>
            <div>{(menuDetail.price * quantity).toLocaleString()}원</div>
          </div>
          <div className="min_price">배달 최소 주문금액 16,000원</div>
          <div className="add_to_cart">
            <IonButton onClick={addToCart}>
              {isLoading ? <ButtonSpinner /> : "장바구니에 추가"}
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
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
