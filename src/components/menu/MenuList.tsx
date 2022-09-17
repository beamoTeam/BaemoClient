import { IonList, IonItem, IonAvatar, IonImg, IonLabel } from "@ionic/react";
import { MenuModel } from "../../types/menu";

interface MenuListProps {
  menus: MenuModel[];
}

export default function MenuList({ menus }: MenuListProps) {
  return (
    <IonList style={{ marginTop: "50px" }}>
      {menus.map((menu) => (
        <IonItem key={menu.seq}>
          <IonAvatar slot="start">
            <IonImg src={menu.img} />
          </IonAvatar>
          <IonLabel>
            <h2>{menu.name}</h2>
            <h3>{menu.price.toLocaleString()}원</h3>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
}
