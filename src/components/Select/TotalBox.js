import React from "react";
import styled from "styled-components";

function TotalBox({ menuInfo, addToCart }) {
  const { count, price } = menuInfo;

  return (
    <StTotalWrap>
      <StTotalText>
        <p>총 주문금액</p>
        <p>{((count) * price).toLocaleString()}원</p>
      </StTotalText>
      <StMinPrice>최소주문금액 16,000원</StMinPrice>
      <div>
        <StAddToCartBtn onClick={addToCart}>
          장바구니에 추가
        </StAddToCartBtn>
      </div>
    </StTotalWrap>
  );
}

export default TotalBox;

const StTotalWrap = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1rem;
  margin-top: 0.18rem;

  background-color: white;
`;

const StTotalText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-weight: 600;
  font-size: 1.1rem;
`;

const StMinPrice = styled.div`
  margin-top: 1rem;
  padding: 0.5rem 0;

  text-align: center;

  font-weight: 600;
  font-size: 0.8rem;
  color: #929292;
`;

const StAddToCartBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background: #881fc8;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.6rem 0;

  border-radius: 2px;
`;
