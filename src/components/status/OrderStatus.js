import React from "react";
import styled from "styled-components";

function OrderStatus({ OrderStatus, restaurant }) {
  return (
    <>
      <StWrap>
        <StH2>주문 상태</StH2>
        <StH3>BBQ치킨 목포대점</StH3>
      </StWrap>
      <InfoBox />
    </>
  );
}

function InfoBox() {
  return (
    <StWrap>
      <StRow>
        <StTextLight>주문시간</StTextLight>
        <StTextLight>2022-06-12 18:30</StTextLight>
      </StRow>
      <StRow>
        <StTextLight>주문번호</StTextLight>
        <StTextLight>B15OO25412T8Z</StTextLight>
      </StRow>
    </StWrap>
  );
}

const StWrap = styled.div`
  width: 100%;
  height: auto;

  padding: 10px;
  margin-top: 0.18rem;

  background-color: white;
`;

const StRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StH2 = styled.h2`
  margin: 0.5rem 0;

  font-weight: 600;
  font-size: 1.6rem;
`;

const StH3 = styled.h3`
  margin: 1.2rem 0 0.5rem 0;

  font-weight: 600;
  font-size: 1.05rem;
`;

const StTextLight = styled.span`
  margin: 0.5rem 0;

  color: #929292;
  font-size: 0.7rem;
  font-weight: 300;
`;

export default OrderStatus;
