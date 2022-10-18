import { useAddrState } from "../../lib/recoil/addrState";
import { modalState } from "../../lib/recoil/modalState";
import DaumPostcodeEmbed from "react-daum-postcode";
import SheetModal from "./common/SheetModal";
import { useSetRecoilState } from "recoil";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function AddressModal() {
  const [, setAddr] = useAddrState();
  const setModal = useSetRecoilState(modalState);

  const onComplete = (data: any) => {
    if (true) {
      setModal(null);
    }
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
    useLocalStorage.set("ADDR", fullAddress);
  };

  return (
    <SheetModal>
      <DaumPostcodeEmbed onComplete={onComplete} />
    </SheetModal>
  );
}
