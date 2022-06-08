import React from "react";
import styled from "styled-components";

function DeliveryFee({ menu }) {
  return (
    <StWrap>
      <StP1>배달요금(3,000원)</StP1>
      <StPriceWrap>
        <span className="color__green">모집 2/4명</span>
        <span>
          <StNone>3,000원</StNone> &gt; 1,500원
        </span>
      </StPriceWrap>
    </StWrap>
  );
}

export default DeliveryFee;

const StWrap = styled.div`
  height: auto;
  width: 100%;

  padding: 10px;
  margin-top: 0.18rem;

  background-color: white;

  font-weight: 600;
`;

const StP1 = styled.div`
  padding: 0.5rem 0;
`;

const StPriceWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 0.9rem;
  font-weight: 500;

  padding: 0.5rem 0;
  & .color__green {
    color: #09c51c;
  }
`;

const StNone = styled.span`
  text-decoration: line-through;
`;
