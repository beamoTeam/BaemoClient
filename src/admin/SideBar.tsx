import { IonIcon, IonBadge } from "@ionic/react";
import { chevronForwardOutline, chevronBackOutline } from "ionicons/icons";
import css from "./SideBar.module.css";

export default function SideBar({
  open,
  toggleSidebar,
  currentTab,
  setCurrentTab,
}: any) {
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
            접수 대기 <IonBadge>11</IonBadge>
          </li>
          <li
            className={`${css.SideItem} ${
              currentTab === "접수 완료" ? css["currentTab"] : ""
            }`}
            onClick={() => setCurrentTab("접수 완료")}
          >
            접수 완료 <IonBadge>11</IonBadge>
          </li>
        </ul>
      </div>
    </aside>
  );
}
