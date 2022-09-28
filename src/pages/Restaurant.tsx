import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonImg,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import restaurantService from "../lib/api/RestaurantService";
import { MenuModel } from "../types/menu";
import { Link } from "react-router-dom";

interface RestaurantEntity {
  img: string;
  score: number;
  reviews: number;
  minOrderPrice: number;
  deliveryPrice: number;
  deliveryTime: number;
}
// 음식점 정보 api 필요 ( ex: 대표사진, 평점, 리뷰, 최소주문금액, 배달 요금, 배달 시간 )

// ************************
export default function Restaurant() {
  const { r_seq } = useParams<{ r_seq: string }>();
  const [menus, setMenus] = useState<MenuModel[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await restaurantService.fetchAllMenus(r_seq);
      console.log(data);
      setMenus(data);
    })();
  }, [r_seq]);

  if (!menus) return <h4>Loading...</h4>;
  if (menus.length === 0) return <h4>No Menus</h4>;

  return (
    <IonPage>
      <IonContent>
        <IonList style={{ marginTop: "50px" }}>
          {menus.map((menu) => (
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
      </IonContent>
    </IonPage>
  );
}
