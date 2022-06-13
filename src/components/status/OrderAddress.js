import React from "react";
import styled from "styled-components";
import {useAddrState} from "../../recoil/atom";

function OrderAddress() {
  const { addr } = useAddrState();
  return <StWrap>
    <StH3>배달 주소</StH3>
    <StTextLight>{addr}</StTextLight>
  </StWrap>;
}

export default OrderAddress;

const StWrap = styled.div`
  width: 100%;
  height: auto;

  padding: 10px;
  margin-top: 0.18rem;

  background-color: white;
`;

const StH3 = styled.h3`
  margin: 1.2rem 0 0.5rem 0;

  font-weight: 600;
  font-size: 1.05rem;
`;

const StTextLight = styled.span`
  color: #929292;
  font-size: 0.8rem;
  font-weight: 300;
`;