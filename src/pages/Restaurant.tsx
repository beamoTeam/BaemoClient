import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonImg,
  IonTitle,
  IonListHeader,
} from "@ionic/react";
import { useEffect, useState } from "react";
import restaurantService from "../lib/api/RestaurantService";
import { MenuModel } from "../types/menu";
import { Link, useParams, useLocation } from "react-router-dom";

export default function Restaurant() {
  const { r_seq } = useParams<{ r_seq: any }>();
  const location = useLocation();
  const [menus, setMenus] = useState<MenuModel[] | null>(null);
  const [restaurant, setRestaurant] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const tmp_r_seq = location.pathname.split("/").at(-1);
        const data = await restaurantService.fetchAllMenus(r_seq || tmp_r_seq);
        console.log(data);
        setMenus(data.menuList);
        setRestaurant(data.restaurant);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [r_seq]);

  if (!menus) return <h4>Loading...</h4>;
  if (!restaurant) return <h4>Loading...</h4>;
  if (menus.length === 0) return <h4>No Menus</h4>;

  return (
    <IonPage>
      <IonContent>
        <IonImg style={ImgStyle} alt="메뉴 대표 사진" src={restaurant.img} />
        <IonListHeader>
          <IonTitle style={bold}>{restaurant.name}</IonTitle>
        </IonListHeader>
        <IonItem>
          <ul style={margin}>
            <IonLabel>배달요금 {restaurant.deliveryPrice} </IonLabel>
            <IonLabel style={score}>평점 {restaurant.rating}점</IonLabel>
            <IonLabel>최소주문금액 {restaurant.minPrice} </IonLabel>
          </ul>
        </IonItem>
        <div>
          <IonList style={{ marginTop: "50px" }}>
            {menus?.map((menu) => (
              <Link to={`${r_seq}/menu/${menu.seq}`} key={menu.seq}>
                <IonItem>
                  <IonAvatar slot="start">
                    <IonImg src={menu.img} />
                  </IonAvatar>
                  <IonLabel>
                    <h2>{menu.name}</h2>
                    <h3>{menu.price.toLocaleString()}원</h3>
                  </IonLabel>
                </IonItem>
              </Link>
            ))}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
}

const ImgStyle = {
  width: "100%",
  height: "15rem",
  marginTop: "60px",
  border: "1px solid silver",
};

const bold = {
  fontWeight: "bold",
  fontSize: "1.3rem",
  padding: 0,
  textAlign: "left",
};

const score = {
  fontSize: "0.96rem",
  paddingRight: "10px",
};

const margin = {
  margin: 0,
  fontWeight: "bold",
  display: "grid",
  gridTemplateRow: "1fr 1fr 1fr",
  gap: "10px",
};
