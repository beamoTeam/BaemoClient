import { useRef } from "react";
import { IonContent, IonModal } from "@ionic/react";
import DaumPostcodeEmbed from "react-daum-postcode";
import useLocalStorage from "../../hooks/useLocalStorage";

interface AddressModalProps {
  setAddr: (newAddr: any) => void;
}

export default function AddressModal({ setAddr }: AddressModalProps) {
  const modal = useRef<HTMLIonModalElement>(null);

  function dismiss() {
    modal.current?.dismiss();
  }

  const onComplete = (data: any) => {
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
  };

  return (
    <>
      <IonModal
        ref={modal}
        trigger="open-address-modal"
        initialBreakpoint={0.7}
        breakpoints={[0, 0.25, 0.5, 0.75]}
      >
        <IonContent className="ion-padding">
          <DaumPostcodeEmbed onComplete={onComplete} />
        </IonContent>
      </IonModal>
    </>
  );
}
