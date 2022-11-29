import { useRef } from "react";
import {
  IonModal,
  IonContent,
  IonItem,
  IonImg,
  IonLabel,
  IonList,
  IonSearchbar,
} from "@ionic/react";
import Spinner from "../spinner/Spinner";
import css from "./RestaurantsModal.module.css";

interface RestaurantsModalProps {
  restaurants: any[];
  selectRestaurant: any;
}

export default function RestaurantsModal({
  restaurants,
  selectRestaurant,
}: RestaurantsModalProps) {
  const modal = useRef<HTMLIonModalElement>(null);

  function dismiss() {
    modal.current?.dismiss();
  }

  const test = (restaurant_seq: any, restaurant_name: string) => {
    if (restaurant_seq !== 1) {
      alert("테스트 기간동안 bbq만 선택 가능합니다.");
    }
    // selectRestaurant(restaurant_seq, restaurant_name);
    selectRestaurant(1, "BBQ 목대점");

    dismiss();
  };

  console.log({restaurants});

  return (
    <>
      <IonModal
        ref={modal}
        trigger="open-restaurant-modal"
        initialBreakpoint={0.7}
        breakpoints={[0, 0.25, 0.5, 0.75]}
      >
        <IonContent className="ion-padding">
          <IonSearchbar
            onClick={() => modal.current?.setCurrentBreakpoint(0.75)}
            placeholder="Search"
          ></IonSearchbar>
          {!restaurants ? (
            <Spinner />
          ) : (
            <IonList>
              {restaurants.map((info, idx) => (
                <Restaurant key={idx} info={info} test={test} />
              ))}
            </IonList>
          )}
        </IonContent>
      </IonModal>
    </>
  );
}

interface RestaurantProps {
  info: any;
  test: any;
}

function Restaurant({ info, test }: RestaurantProps) {
  return (
    <IonItem onClick={() => test(info.seq, info.name)}>
      <div>
        <IonImg src={info.img} className={css.img} />
      </div>
      <IonLabel>
        <h2>{info.name}</h2>
        <p>배달팁: {info.deliveryPrice}</p>
      </IonLabel>
    </IonItem>
  );
}
