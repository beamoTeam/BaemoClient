import React from "react";
import styled from "styled-components";
import { MdRefresh } from "react-icons/md";

const HeaderRight = () => {
  const handleClick = (e) => {
    // 상황에 맞게 refetch
    console.log(e.target);
  };

  return (
    <StRightWrap>
      <MdRefresh onClick={handleClick} />
    </StRightWrap>
  );
};

export default HeaderRight;

const StRightWrap = styled.div`
  text-align: center;
  font-size: 1.7rem;
`;
