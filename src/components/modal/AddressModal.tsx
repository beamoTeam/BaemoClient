import { useAddrState } from "../../lib/recoil/addrState";
import { useModalState } from "../../lib/recoil/modalState";
import DaumPostcodeEmbed from "react-daum-postcode";
import SheetModal from "./common/SheetModal";

export default function AddressModal() {
  const [, setAddr] = useAddrState();
  const [, setModal] = useModalState();

  const onComplete = (data: any) => {
    setTimeout(() => setModal(null), 1);
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

    setAddr(fullAddress);
  };

  return (
    <SheetModal trigger="open-address-modal">
      <DaumPostcodeEmbed onComplete={onComplete} />
    </SheetModal>
  );
}
