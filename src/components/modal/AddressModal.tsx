import React, { useRef, useCallback } from "react";
import { IonContent, IonModal } from "@ionic/react";
import DaumPostcodeEmbed from "react-daum-postcode";
import useLocalStorage from "../../hooks/useLocalStorage";

interface AddressModalProps {
  setAddr: (newAddr: any) => void;
}

function AddressModal({ setAddr }: AddressModalProps) {
  const modal = useRef<HTMLIonModalElement>(null);

  const dismiss = useCallback(() => {
    modal.current?.dismiss();
  }, []);

  const onComplete = useCallback(
    (data: any) => {
      let fullAddress = data.address;
      let extraAddress = "";

      if (data.addressType === "R") {
        if (data.bname !== "") {
          extraAddress += data.bname;
        }
        if (data.buildingName !== "") {
          extraAddress +=
            extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
      }
      dismiss();
      setAddr(fullAddress);
      useLocalStorage.set("ADDR", fullAddress);
    },
    [setAddr, dismiss]
  );

  return (
    <>
      <IonModal
        ref={modal}
        trigger="open-address-modal"
        initialBreakpoint={0.7}
        breakpoints={[0, 0.25, 0.5, 0.75]}
      >
        {/* <IonContent className="ion-padding"> */}
        <DaumPostcodeEmbed onComplete={onComplete} />
        {/* </IonContent> */}
      </IonModal>
    </>
  );
}

export default React.memo(AddressModal);
