import {
  IonPage,
  IonContent,
  IonLabel,
  IonListHeader,
  IonItem,
  IonButton,
  IonModal,
  IonTitle,
} from "@ionic/react";
import { useState, useRef } from "react";
import css from "./MakeGroup.module.css";
import { useAddrState } from "../lib/recoil/addrState";
import restaurantService from "../lib/api/RestaurantService";
import { useModalState } from "../lib/recoil/modalState";
import RestaurantsModal from "../components/modal/RestaurantsModal";
import TimePicker from "../components/picker/TimePicker";
import groupOrderService from "../lib/api/GroupOrderService";
import enterToGroup from "../lib/api/Group/enterToGroup";
import { useHistory } from "react-router";

const MakeGroup: React.FC = () => {
  const history = useHistory();
  const [addr, setAddr] = useAddrState();
  const [restaurants, setRestaurants] = useState([]);
  const [, setModal] = useModalState();
  const [info, setInfo] = useState<any>({
    address: addr,
    detail_address: "",
    orderTime: null,
    restaurant_seq: null,
    restaurant_name: null,
  });

  const onInput = (e: any) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const showRestaurantsModal = async () => {
    try {
      const data = await restaurantService.fetchAllRestaurants();
      setRestaurants(data);
    } catch (err) {
      console.error(err);
    }
  };

  const selectRestaurant = (
    restaurant_seq: number,
    restaurant_name: string
  ) => {
    setInfo({
      ...info,
      restaurant_seq,
      restaurant_name,
    });
  };

  const setTime = (hh: any, mm: any) => {
    setInfo({
      ...info,
      orderTime: `${new Date().toISOString().split("T")[0]} ${`${hh}:${
        mm < 10 ? "0" + mm : mm
      }`}`,
    });
  };

  const createGroup = async () => {
    let flag = true;
    Object.values(info).forEach((x) => {
      if (x === null || x === undefined) {
        flag = false;
      }
    });

    if (!flag) {
      alert("옵션을 선택해주세요.");
      return;
    }

    try {
      const newGroupInfo = {
        address: addr,
        detail_address: info.detail_address,
        orderTime: info.orderTime,
        restaurant_seq: info.restaurant_seq,
      };
      const { data } = await groupOrderService.createGroup(newGroupInfo);
      const c_seq = data.seq;
      const r_seq = data.restaurant.seq;
      enterToGroup(c_seq, r_seq);
      history.push(`restaurant/${r_seq}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <IonPage style={{ paddingTop: "50px" }}>
      <IonContent fullscreen>
        <RestaurantsModal
          restaurants={restaurants}
          selectRestaurant={selectRestaurant}
        />
        <div className="make-chat-content">
          <IonListHeader>
            <IonLabel>배달 정보</IonLabel>
          </IonListHeader>
          <IonItem>
            <div className={css.addr}>
              <p>{addr}</p>
              <div className={css.addrDetailWrap}>
                <input
                  name="detail_address"
                  value={info.detail_address}
                  onChange={onInput}
                  placeholder="상세 주소"
                  className={css.addrDetail}
                />
              </div>
            </div>
          </IonItem>

          <IonListHeader>
            <IonLabel>음식점</IonLabel>
          </IonListHeader>
          <IonItem>
            <div className={css.restaurant}>
              <p>{info.restaurant_name || "음식점을 선택해주세요"}</p>
              <IonButton
                id="open-restaurant-modal"
                onClick={showRestaurantsModal}
              >
                음식점 찾기
              </IonButton>
            </div>
          </IonItem>

          <IonListHeader>
            <IonLabel>모집 마감시간</IonLabel>
          </IonListHeader>
          <IonItem>
            <p className={css.time}>
              {info.orderTime ? info.orderTime.split(" ")[1] : "00:00"}
            </p>
            <TimePicker setTime={setTime} />
          </IonItem>
        </div>
        <IonItem>
          <div className={css.makeBtn}>
            <IonButton onClick={createGroup}>방만들기</IonButton>
          </div>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default MakeGroup;

function Test() {
  const modal = useRef<HTMLIonModalElement>(null);

  function dismiss() {
    modal.current?.dismiss();
  }

  return (
    <IonModal id="example-modal" ref={modal} trigger="open-modal">
      <IonContent>
        <IonTitle>Modal</IonTitle>
        <IonButton color="light" onClick={() => dismiss()}>
          Close
        </IonButton>
      </IonContent>
    </IonModal>
  );
}
