import { IonIcon, IonBadge } from "@ionic/react";
import { chevronForwardOutline, chevronBackOutline } from "ionicons/icons";
import css from "./SideBar.module.css";

export default function SideBar({
  open,
  orders,
  toggleSidebar,
  currentTab,
  setCurrentTab,
}: any) {
  const accepted = orders.filter(
    (order: any) => order.accepted === "접수 완료"
  ).length;
  const waiting = orders.length - accepted;
  return (
    <aside>
      <div className={open ? css["sideBar"] : css["close"]}>
        <IonIcon
          icon={open ? chevronBackOutline : chevronForwardOutline}
          className={css.open}
          onClick={toggleSidebar}
        >
          Open
        </IonIcon>
        <ul className={css.ul}>
          <li
            className={`${css.SideItem} ${
              currentTab === "접수 대기" ? css["currentTab"] : ""
            }`}
            onClick={() => setCurrentTab("접수 대기")}
          >
            접수 대기{" "}
            {waiting > 0 && <IonBadge color="tertiary">{waiting}</IonBadge>}
          </li>
          <li
            className={`${css.SideItem} ${
              currentTab === "접수 완료" ? css["currentTab"] : ""
            }`}
            onClick={() => setCurrentTab("접수 완료")}
          >
            접수 완료 <IonBadge color="light">{accepted}</IonBadge>
          </li>
        </ul>
      </div>
    </aside>
  );
}
