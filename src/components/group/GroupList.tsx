import {
  IonList,
  IonItem,
  IonImg,
  IonListHeader,
  IonLabel,
} from "@ionic/react";
import { GroupModel } from "../../types/group";
import useLocalStorage from "../../hooks/useLocalStorage";
import GroupOrderService from "../../lib/api/GroupOrderService";
import css from "./GroupList.module.css";
import { useHistory } from "react-router";

interface GroupListProps {
  groupList: GroupModel[];
}

export default function GroupList({ groupList }: GroupListProps) {
  const history = useHistory();

  const enterToGroup = async (c_seq: string, restaurant_seq: string) => {
    try {
      const res = await GroupOrderService.enterGroup(c_seq);
      useLocalStorage.set("CHAT_SEQ", c_seq);
      history.push(`restaurant/${restaurant_seq}`);
    } catch (err: any) {
      if (err.response.status === 400) {
        alert(err.response.data);
      } else if (err.response.status === 401) {
        alert("로그인후 이용해 주세요.");
      }
    }
  };

  return (
    <IonList className={css.list}>
      <IonListHeader>
        <IonLabel>배달 모임</IonLabel>
      </IonListHeader>

      {groupList.map((group) => (
        <IonItem
          key={group.seq}
          onClick={() =>
            enterToGroup(String(group.seq), String(group.restaurant.seq))
          }
        >
          <IonImg src="./avatar-finn.png" />
          <IonLabel>
            <h2>{group.name}</h2>
            <h3>모집 마감 {group.orderTime.split(" ")[1]}</h3>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}
