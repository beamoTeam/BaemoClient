import React, { useRef, useCallback } from "react";
import { IonModal } from "@ionic/react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useAddrState } from "../../lib/recoil/addrState";
import useLocalStorage from "../../hooks/useLocalStorage";
import { modalState, modalPresentState } from "../../lib/recoil/modalState";
import { useRecoilValue, useSetRecoilState } from "recoil";

function AddressModal() {
  // const modal = useRef<HTMLIonModalElement>(null);
  const [, setAddr] = useAddrState();
    const setModal = useSetRecoilState(modalState);
  const present = useRecoilValue(modalPresentState);

  // const dismiss = useCallback(() => {
  //   modal.current?.dismiss();
  // }, []);

  const onDidDismiss = useCallback(() => {
    setModal(null);
  }, [setModal]);

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
      onDidDismiss();
      setAddr(fullAddress);
      useLocalStorage.set("ADDR", fullAddress);
    },
    [setAddr, onDidDismiss]
  );

  return (
    <div>
      <IonModal
        isOpen={present}
        initialBreakpoint={0.7}
        breakpoints={[0, 0.25, 0.5, 0.75]}
        onDidDismiss={onDidDismiss}
      >
        <DaumPostcodeEmbed onComplete={onComplete} />
      </IonModal>
    </div>
  );
}

export default React.memo(AddressModal);
