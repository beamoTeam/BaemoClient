import { useAddrState } from "../../lib/recoil/addrState";
import { IonHeader, IonIcon, IonTitle } from "@ionic/react";
import { chevronDownOutline, locationOutline } from "ionicons/icons";
import { useModalState } from "../../lib/recoil/modalState";
import css from "./GlobalHeader.module.css";
import AddressModal from "../modal/AddressModal";
import KakaoMapModal from "../modal/KakaoMapModal";

export default function GlobalHeader() {
  const [addr] = useAddrState();
  const [, setModal] = useModalState();

  const setAddressModal = () => {
    setModal(<AddressModal />);
  };

  const setMapModal = () => {
    setModal(<KakaoMapModal />);
  };

  return (
    <>
      <IonHeader className={css.globalHeader}>
        <div onClick={setMapModal}>
          <IonIcon icon={locationOutline} className={css.mapButton} />
        </div>
        <div onClick={setAddressModal} className={css.headerMain}>
          <IonTitle className={css.addr}>
            {addr || "주소를 선택해주세요"}
          </IonTitle>
          <IonIcon icon={chevronDownOutline} />
        </div>
        <div></div>
      </IonHeader>
    </>
  );
}
