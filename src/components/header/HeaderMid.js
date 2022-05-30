import React, { useState } from "react";
import styled from "styled-components";
import DaumPostcode from "./Postcode";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function HeaderMid() {
  const [toggleApi, setToggleApi] = useState(false);

  const handleToggle = () => {
    setToggleApi(prev => !prev);
  }

  return (
    <StMidWrap>
      {toggleApi && <DaumPostcode handleToggle={handleToggle} />}
      <div onClick={handleToggle}>
        주소를 입력해 주세요 <MdOutlineKeyboardArrowDown />
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
