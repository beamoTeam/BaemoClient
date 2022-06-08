import React from "react";
import styled from "styled-components";

function PriceBox({ price }) {
  return (
    <StPriceBox>
      <p>가격</p>
      <p>{price?.toLocaleString()}원</p>
    </StPriceBox>
  );
}
export default PriceBox;

const StPriceBox = styled.div`
  height: 3rem;
  padding: 0 1rem;
  margin-top: 0.1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: white;

  font-weight: 600;
  font-size: 1.1rem;
`;
