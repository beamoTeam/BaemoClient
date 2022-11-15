import {
  IonPage,
  IonContent,
  IonLabel,
  IonListHeader,
  IonItem,
  IonButton,
} from "@ionic/react";
import { useState } from "react";
import css from "./MakeGroup.module.css";
import restaurantService from "../lib/api/RestaurantService";
import { useModalState } from "../lib/recoil/modalState";
import RestaurantsModal from "../components/modal/RestaurantsModal";
import TimePicker from "../components/picker/TimePicker";
import groupOrderService from "../lib/api/GroupOrderService";
import enterToGroup from "../lib/api/Group/enterToGroup";
import { useHistory } from "react-router";
import { useChatMenuState } from "../lib/recoil/chatMenuState";
import { ButtonSpinner } from "../components/spinner/Spinner";

const MakeGroup: React.FC = () => {
  const history = useHistory();
  const addr = window.localStorage.getItem("ADDR");
  const [, setModal] = useModalState();
  const [, setChatMenu] = useChatMenuState();
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setIsLoading(true);
    let flag = true;
    Object.values(info).forEach((x) => {
      if (x === null || x === undefined) {
        flag = false;
      }
    });

    if (!flag) {
      alert("옵션을 선택해주세요.");
      setIsLoading(false);
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
      setChatMenu([]);
      setModal(null);
      enterToGroup(c_seq, r_seq);
      history.push(`restaurant/${r_seq}`);
      window.localStorage.setItem("CHAT_SEQ", c_seq);
    } catch (err) {
      alert("알수없는 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <IonPage style={{ paddingTop: "50px" }}>
        <IonContent fullscreen>
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
                {info.orderTime ? info.orderTime.split(" ")[1] : "모집 마감시간을 선택해주세요"}
              </p>
              <TimePicker setTime={setTime} />
            </IonItem>
          </div>
          <IonItem>
            <div className={css.makeBtn}>
              <IonButton onClick={createGroup}>
                {isLoading ? <ButtonSpinner /> : "방만들기"}
              </IonButton>
            </div>
          </IonItem>
        </IonContent>
      </IonPage>
      <RestaurantsModal
        restaurants={restaurants}
        selectRestaurant={selectRestaurant}
      />
    </>
  );
};

export default MakeGroup;
