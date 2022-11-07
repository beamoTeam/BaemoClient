import { IonContent, IonItem, IonLabel, IonImg, IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { anonymousName } from "../../utils/name";
import parseMenu from "../../utils/parseMenu";
import css from "./SlideMenu.module.css";

interface SlideMenuProps {
  chatMenu: any;
  close: any;
}

export default function SlideMenu({ chatMenu, close }: SlideMenuProps) {
  const test = chatMenu.map((x: any) => parseMenu(x.menu[0]));
  console.log(test);
  return null;
  return (
    <>
      <IonContent>
        <div className={css.SlideMenu}>
          <div className={css.slideHeader}>
            <div></div>
            <IonIcon icon={closeOutline} onClick={close} />
          </div>

          {chatMenu.length > 0 &&
            chatMenu.map((menu: { sender: string; data: [] }, idx: number) => {
              return (
                <div key={idx}>
                  <IonItem slot="header" color="light">
                    <IonLabel>{anonymousName(menu.sender)}</IonLabel>
                  </IonItem>
                  {menu.data.map((info: any) => (
                    <div className={css.info} key={info.seq}>
                      <IonImg src={info.img} className={css.img} />
                      <IonLabel>
                        <h4 className={css.name}>
                          {info.name} x {info.count}
                        </h4>
                        <h4 className={css.price}>
                          {info.price.toLocaleString()}원
                        </h4>
                      </IonLabel>
                    </div>
                  ))}
                </div>
              );
            })}
        </div>
      </IonContent>
    </>
  );
}
