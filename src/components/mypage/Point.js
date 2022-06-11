import React from "react";
import styled from "styled-components";

function Point() {
  return (
    <StPoinWrap>
      <StPoint>
        <span>Point</span>
        <StPoint className="point">0P</StPoint>
      </StPoint>
      <StCharge>
        <span>+충전하기</span>
      </StCharge>
    </StPoinWrap>
  );
}

export default Point;

const StPoinWrap = styled.div`
  width: 100%;
  height: auto;

  padding: 10px;

  background-color: #f5f4f2;
`;

const StPoint = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-weight: 600;

  &.point {
    color: #881fc8;
  }
`;

const StCharge = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin-top: 15px;

  font-size: 0.8rem;
  color: #929292;
  font-weight: 600;
`;
