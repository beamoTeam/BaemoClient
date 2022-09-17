import React from "react";
import { useAddrState } from "../../lib/recoil/addrState";
import { IonHeader, IonIcon, IonTitle } from "@ionic/react";
import { chevronDownOutline, locationOutline } from "ionicons/icons";
// import { useHistory } from "react-router-dom";
import { useModalState } from "../../lib/recoil/modalState";
import css from "./GlobalHeader.module.css";
import AddressModal from "../modal/AddressModal";
import KakaoMapModal from "../modal/KakaoMapModal";

const GlobalHeader: React.FC = () => {
  // let history = useHistory();
  const [addr] = useAddrState();
  const [, setModal] = useModalState();

  const setAddressModal = () => {
    setModal(<AddressModal />);
  };

  const setMapModal = () => {
    console.log("씨발");
    setModal(<KakaoMapModal />);
  };

  return (
    <>
      <IonHeader className={css.globalHeader}>
        <div onClick={setMapModal} style={{ background: "red" }}>
          <IonIcon className={css.mapButton} icon={locationOutline} />
        </div>
        <div
          className={css.headerMain}
          id="open-address-modal"
          onClick={setAddressModal}
        >
          <IonTitle className={css.addr}>
            {addr || "주소를 선택해주세요"}
          </IonTitle>
          <IonIcon icon={chevronDownOutline}>Back</IonIcon>
        </div>
        <div></div>
      </IonHeader>
    </>
  );
};

export default GlobalHeader;
