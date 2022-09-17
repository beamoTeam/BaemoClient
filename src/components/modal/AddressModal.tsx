import { useAddrState } from "../../lib/recoil/addrState";
import PostCode from "./PostCode";
import SheetModal from "./SheetModal";
import { useModalState } from "../../lib/recoil/modalState";

export default function AddressModal() {
  const [, setAddr] = useAddrState();
  const [, setModal] = useModalState();

  const onComplete = (data: any) => {
    setModal(null);
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
    <SheetModal>
      <PostCode onComplete={onComplete} />
    </SheetModal>
  );
}
