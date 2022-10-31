import {
  IonList,
  IonItem,
  IonImg,
  IonListHeader,
  IonLabel,
} from "@ionic/react";
import { GroupModel } from "../../types/group";
import css from "./GroupList.module.css";

interface GroupListProps {
  groupList: GroupModel[];
  enterToGroup: (c_seq: string, restaurant_seq: string) => void;
  currentGroup: any;
}

export default function GroupList({
  groupList,
  enterToGroup,
  currentGroup,
}: GroupListProps) {
  return (
    <IonList className={css.list}>
      <IonListHeader>
        <IonLabel>배달 모임</IonLabel>
      </IonListHeader>

      {groupList?.map((group) => (
        <IonItem
          key={group.seq}
          onClick={() =>
            enterToGroup(String(group.seq), String(group.restaurant.seq))
          }
        >
          <IonImg src={group.restaurant.img} className={css.img} />
          <IonLabel
            className={group.seq === Number(currentGroup) ? css["current"] : ""}
          >
            <h2>{group.name}</h2>
            <h3>모집 마감 {group.orderTime.split(" ")[1]}</h3>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}
