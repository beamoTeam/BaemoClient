import React from "react";
import styled from "styled-components";

function MenuBox({ item }) {
  const { name, price, count } = item;
  return (
    <StWrap>
      <StHeadWrap>
        <StHeading>{name}</StHeading>
        <span>x</span>
      </StHeadWrap>
      <StMenuWrap>
        <StImg />
        <StTextWrap>
          <StText>* 가격: {price?.toLocaleString()}원</StText>
          <StText>* 음료: 콜라500ml</StText>
          <StText>* 사이드: 뿌링핫도그</StText>
          <StPriceWrap>
            <div>{(price*count).toLocaleString()}원</div>
            <StCountWrap>
              <StBtn>-</StBtn>
              <StCountText>{count}</StCountText>
              <StBtn>+</StBtn>
            </StCountWrap>
          </StPriceWrap>
        </StTextWrap>
      </StMenuWrap>
    </StWrap>
  );
}

export default MenuBox;

const StWrap = styled.div`
  height: auto;
  width: 100%;

  padding: 10px;
  margin-top: 0.18rem;

  background-color: white;
`;

const StHeadWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StMenuWrap = styled.div`
  display: flex;
`;

const StHeading = styled.h3`
  padding: 10px 0;
  font-weight: 600;
  font-size: 0.9rem;
`;

const StImg = styled.img`
  width: 6rem;
  height: 6rem;

  border-radius: 3px;
`;

const StPriceWrap = styled.div`
  width: 14rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  color: black;
  font-weight: 600;
  font-size: 0.9rem;

  padding: 1rem 0;
`;

const StCountWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StTextWrap = styled.div`
  padding: 0.15rem 1rem;

  color: #929292;
  font-size: 0.7rem;
  font-weight: 500;
`;

const StBtn = styled.div`
  width: 1.3rem;
  height: 1.3rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 3px;
  border: 1px solid black;
`;

const StCountText = styled.div`
  margin: 0 0.5rem;
`;

const StText = styled.div`
  margin: 0.3rem 0;
`;
