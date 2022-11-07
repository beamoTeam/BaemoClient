import { IonContent, IonItem, IonLabel, IonImg, IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { anonymousName } from "../../utils/name";
import { useChatMenuState } from "../../lib/recoil/chatMenuState";
import parseMenu from "../../utils/parseMenu";
import css from "./SlideMenu.module.css";

interface SlideMenuProps {
  close: any;
}

export default function SlideMenu({ close }: SlideMenuProps) {
  const [chatMenu] = useChatMenuState();
  if (!chatMenu) {
    return null;
  }

  const parsedChatMenu: any = {};
  chatMenu.forEach((MENU: any) => {
    if (parsedChatMenu[MENU.sender]) {
      console.log("씨발", MENU);
      parsedChatMenu[MENU.sender] = [...parsedChatMenu[MENU.sender], MENU.menu];
    } else {
      parsedChatMenu[MENU.sender] = MENU.menu;
    }
  });
  console.log(" ??? ::", parsedChatMenu);
  const parsedMenus = Object.keys(parsedChatMenu).map((key: any) => ({
    sender: key,
    menu: parsedChatMenu[key].menu,
  }));
  // console.log(parsedMenus);

  return (
    <>
      <IonContent>
        <div className={css.SlideMenu}>
          <div className={css.slideHeader}>
            <div></div>
            <IonIcon icon={closeOutline} onClick={close} />
          </div>

          {chatMenu.length > 0 &&
            chatMenu.map((Menu: { sender: string; menu: [] }, idx: number) => {
              return (
                <div key={idx}>
                  <IonItem slot="header" color="light">
                    <IonLabel>{anonymousName(Menu.sender)}</IonLabel>
                  </IonItem>
                  {Menu.menu.map((info: any) => (
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
