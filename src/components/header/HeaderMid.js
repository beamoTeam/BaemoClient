import React from 'react';
import styled from "styled-components";

function HeaderMid() {
  return (
    <StMidWrap>
      무안군 청계면 영산로 1666
    </StMidWrap>
  );
}

const StMidWrap = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
`;

export default HeaderMid;
