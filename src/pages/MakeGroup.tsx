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
import { useAddrState } from "../lib/recoil/addrState";
import useUnAuthorized from "../hooks/useUnAuthorized";
import { ButtonSpinner } from "../components/spinner/Spinner";

const MakeGroup: React.FC = () => {
  const history = useHistory();
  const [addr,] = useAddrState();
  const [, setModal] = useModalState();
  const [, setChatMenu] = useChatMenuState();
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleUnAuthorized = useUnAuthorized();

  const [info, setInfo] = useState<any>({
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
      alert("음식점을 불러오는중 오류가 발생했습니다.");
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

    if (!addr) {
      alert("주소를 선택해 주세요");
      setIsLoading(false);
      return;
    }
    for (let key in info) {
      if (key === "detail_address" && !info[key]) {
        alert("상세 주소를 입력해 주세요");
        setIsLoading(false);
        return;
      }
      if (key === "orderTime" && !info[key]) {
        alert("주문 시간을 선택해 주세요");
        setIsLoading(false);
        return;
      }
      if (key === "restaurant_seq" && !info[key]) {
        alert("음식점을 선택해 주세요");
        setIsLoading(false);
        return;
      }
      if (key === "restaurant_name" && !info[key]) {
        alert("음식점을 선택해 주세요");
        setIsLoading(false);
        return;
      }
    }

    try {
      const newGroupInfo = {
        address: addr || window.localStorage.getItem("ADDR"),
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
    } catch (err: any) {
      handleUnAuthorized(err);
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
                <p style={{marginBottom: "10px"}}>{info.restaurant_name || "음식점을 선택해주세요"}</p>
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
