import { Dispatch, SetStateAction } from "react";
import { IonModal, IonContent, IonLabel } from "@ionic/react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useAddrState } from "../../recoil/addrState";

interface AddressModalProps {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
}

export default function AddressModal({ toggle, setToggle }: AddressModalProps) {
  const [, setAddr] = useAddrState();

  const onComplete = (data: any) => {
    setToggle((prev) => !prev);
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

    setAddr(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  return (
    <IonModal
      trigger="open-address-modal"
      isOpen={toggle}
      showBackdrop={true}
      backdropDismiss={true}
      initialBreakpoint={0.7}
      breakpoints={[0, 1, 1, 1]}
      handleBehavior="cycle"
    >
      <IonContent className="ion-padding">
        <div className="ion-margin-top">
          <IonLabel>
            <DaumPostcodeEmbed onComplete={onComplete} />
          </IonLabel>
        </div>
      </IonContent>
    </IonModal>
  );
}
