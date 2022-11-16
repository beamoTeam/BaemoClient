import React, { useCallback } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useAddrState } from "../../lib/recoil/addrState";
import useLocalStorage from "../../hooks/useLocalStorage";
import { modalState } from "../../lib/recoil/modalState";
import SheetModal from "./common/SheetModal";
import { useSetRecoilState } from "recoil";

function AddressModal() {
  const setModal = useSetRecoilState(modalState);
  const [, setAddr] = useAddrState();

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
      setModal(null);
      setAddr(fullAddress);
      useLocalStorage.set("ADDR", fullAddress);
    },
    [setAddr, setModal]
  );

  return (
    <div>
      <SheetModal>
        <DaumPostcodeEmbed onComplete={onComplete} />
      </SheetModal>
    </div>
  );
}

export default React.memo(AddressModal);
