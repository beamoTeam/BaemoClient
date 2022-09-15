import React, { useState } from "react";
import { useAddrState } from "../../recoil/addrState";
import { IonHeader, IonIcon, IonTitle } from "@ionic/react";
import { chevronDownOutline, locationOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import css from "./GlobalHeader.module.css";

import AddressModal from "../modal/AddressModal";

const GlobalHeader: React.FC = () => {
  let history = useHistory();
  const [addr] = useAddrState();
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <IonHeader className={css.globalHeader}>
        <div>
          <IonIcon
            className={css.mapButton}
            icon={locationOutline}
            onClick={history.goBack}
          >
            Back
          </IonIcon>
        </div>

        <div
          className={css.headerMain}
          id="open-address-modal"
          onClick={() => setToggle((prev) => !prev)}
        >
          <IonTitle className={css.addr}>
            {addr || "주소를 선택해주세요"}
          </IonTitle>
          <IonIcon icon={chevronDownOutline}>Back</IonIcon>
        </div>

        <div></div>
        <AddressModal toggle={toggle} setToggle={setToggle} />
      </IonHeader>
    </>
  );
};

export default GlobalHeader;
