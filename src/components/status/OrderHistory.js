import React from "react";
import styled from "styled-components";

function OrderHistory() {
  return (
    <StWrap>
      <StH3>주문 내역</StH3>
      <StBorder>
        <StRow>
          <span>황금올리브</span>
          <span>21,000원</span>
        </StRow>
        <StRow>
          <span>황금올리브</span>
          <span>21,000원</span>
        </StRow>
        <StRow>
          <span>황금올리브</span>
          <span>21,000원</span>
        </StRow>
      </StBorder>
      <StBorder>
        <StRow>
          <StBold>상품 합계</StBold>
          <span>27,000원</span>
        </StRow>
        <StRow>
          <StBold>배달팁</StBold>
          <span>3,000원 &gt; 1,500원</span>
        </StRow>
      </StBorder>
      <StRow>
        <StBold>결제금액</StBold>
        <StHighLight>28,500원</StHighLight>
      </StRow>
    </StWrap>
  );
}

export default OrderHistory;

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

const StRow = styled.div`
  padding: 0.5rem 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-weight: 400;
  font-size: 0.8rem;
`;

const StBorder = styled.div`
  border-bottom: 1px solid black;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
`;

const StSideMenu = styled.div`
  color: #929292;

  font-weight: 400;
  font-size: 0.8rem;
`;

const StBold = styled.span`
  font-weight: 600;
  font-size: 1.05rem;
`;

const StHighLight = styled.div`
  color: #881fc8;
`;
