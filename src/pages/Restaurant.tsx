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
import { Link } from "react-router-dom";
import css from "./Restaurant.module.css";

// 음식점 정보 api 필요 ( ex: 대표사진, 평점, 리뷰, 최소주문금액, 배달 요금, 배달 시간 )
export default function Restaurant() {
  const r_seq = String(window.location.pathname.split("/").at(-1));
  const [menus, setMenus] = useState<MenuModel[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await restaurantService.fetchAllMenus(r_seq);

      setMenus(data);
    })();
  }, [r_seq]);

  if (!menus) return <h4>Loading...</h4>;
  if (menus.length === 0) return <h4>No Menus</h4>;

  return (
    <IonPage>
      <IonContent>
        <IonImg style={ImgStyle} alt="메뉴 대표 사진" />
        <div className={css.title}>
          <IonTitle style={bold}>BBQ 청계 목대점</IonTitle>
          <p className={css.score}>
            <span>평점 4.1 </span> <span>리뷰 41</span>
          </p>
        </div>
        <div className={css.list}>
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
};
