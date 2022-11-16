import {
  IonList,
  IonItem,
  IonImg,
  IonListHeader,
  IonLabel,
} from "@ionic/react";
import { GroupModel } from "../../types/group";
import { checkmarkCircleOutline } from "ionicons/icons";
import css from "./GroupList.module.css";

interface GroupListProps {
  groupList: GroupModel[];
  enterToGroup: (c_seq: number, restaurant_seq: number) => void;
  currentGroup: any;
}

export default function GroupList({
  groupList,
  enterToGroup,
  currentGroup,
}: GroupListProps) {
  if (groupList.length === 0) {
    return <NoItemUI />
  }
  return (
    <IonList className={css.list}>
      <IonListHeader>
        <IonLabel>배달 모임</IonLabel>
      </IonListHeader>

      {groupList?.map((group) => (
        <IonItem
          key={group.seq}
          onClick={() => enterToGroup(group.seq, group.restaurant.seq)}
          detail={group.seq === Number(currentGroup)}
          detailIcon={checkmarkCircleOutline}
        >
          <IonImg src={group.restaurant.img} className={css.img} />
          <IonLabel>
            <h2>
              {group.name} <span className={css.roomSeq}>{group.seq}</span>
            </h2>
            <h3>모집 마감 {group.orderTime.split(" ")[1]}</h3>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}

function NoItemUI() {
  return (
    <div className={css.NoItemUI}>
      <h4>
        모임을 만들어 보세요!
      </h4>
    </div>)
}