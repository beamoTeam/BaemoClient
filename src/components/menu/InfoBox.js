import React from "react";
import styled from "styled-components";

function InfoBox() {
  return (
    <StInfoWrap>
      <StInfoRow>최소 주문금액 20,000원</StInfoRow>
      <StInfoRow>배달요금 3,000원</StInfoRow>
      <StInfoRow>배달 시간 30 ~ 40분 소요예상</StInfoRow>
    </StInfoWrap>
  );
}

const StInfoWrap = styled.div`
  background-color: white;

  padding: 10px;
  margin-top: 0.18em;

  font-size: 0.9rem;
  font-weight: bold;
`;

const StInfoRow = styled.div`
  padding: 5px 0;
  font-weight: 600;
  text-align: left;
`;
export default InfoBox;
