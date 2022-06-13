import React, { useState } from "react";
import styled from "styled-components";
import DaumPostcode from "./Postcode";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useAddrState } from "../../recoil/atom";

function HeaderMid() {
  const [toggleApi, setToggleApi] = useState(false);
  const { addr, setAddr } = useAddrState();

  const handleToggle = () => {
    setToggleApi((prev) => !prev);
  };

  const splitedAddr = addr?.split(" (")[0].split(" ");
  const len = splitedAddr?.length;
  return (
    <StMidWrap>
      {toggleApi && (
        <DaumPostcode handleToggle={handleToggle} setAddr={setAddr} />
      )}
      <div onClick={handleToggle}>
        <span>
          {addr
            ? splitedAddr.slice(len-3, len).join(" ")
            : "주소를 입력해 주세요"}
        </span>
        <MdOutlineKeyboardArrowDown />
      </div>
    </StMidWrap>
  );
}

const StMidWrap = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
`;

export default HeaderMid;
