import { IonContent, IonItem, IonLabel, IonImg, IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import css from "./SlideMenu.module.css";

interface SlideMenuProps {
  chatMenu: any;
  close: any;
}

export default function SlideMenu({ chatMenu, close }: SlideMenuProps) {
  console.log(chatMenu);
  return (
    <>
      <IonContent>
        <div className={css.SlideMenu}>
          <div className={css.slideHeader}>
            <div></div>
            <IonIcon icon={closeOutline} onClick={close} />
          </div>

          {chatMenu.length > 0 &&
            chatMenu.map((menu: any) => {
              return (
                <div key={menu.seq}>
                  <IonItem slot="header" color="light">
                    <IonLabel>User 1</IonLabel>
                  </IonItem>
                  <div className={css.info}>
                    <IonImg src={menu.img} className={css.img} />
                    <IonLabel>
                      <h4 className={css.name}>
                        {menu.name} x {menu.count}
                      </h4>
                      <h4 className={css.price}>
                        {(menu.price * menu.count).toLocaleString()}원
                      </h4>
                    </IonLabel>
                  </div>
                </div>
              );
            })}
        </div>
      </IonContent>
    </>
  );
}
