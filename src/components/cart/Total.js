import React from "react";
import styled from "styled-components";

function Total({ menu, handleOrder }) {
  const totalPrice = menu.reduce(
    (acc, curr) => (acc += curr.count * curr.price),
    0
  );
  return (
    <>
      <StWrap>
        <StRow>
          <span>상품금액</span>
          <span>{totalPrice.toLocaleString()}원</span>
        </StRow>
        <StRow>
          <span>배달팁</span>
          <span>1,500원</span>
        </StRow>
      </StWrap>
      <StWrap>
        <StRow>
          <span>총 주문금액</span>
          <span>{(totalPrice + 1500).toLocaleString()}원</span>
        </StRow>
      </StWrap>
      <StWrap>
        <OrderBtn onClick={handleOrder}>{(totalPrice + 1500).toLocaleString()}원 주문하기</OrderBtn>
      </StWrap>
    </>
  );
}

export default Total;

const StWrap = styled.div`
  height: auto;
  width: 100%;

  padding: 10px;
  margin-top: 0.18rem;

  background-color: white;

  font-size: 0.9rem;
  font-weight: 500;
`;

const StRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 0.9rem;
  font-weight: 500;

  padding: 0.5rem 0;
`;

const OrderBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.7rem;
  color: white;
  background-color: #881fc8;
  border-radius: 3px;

  font-size: 1rem;
  font-weight: 500;
`;
