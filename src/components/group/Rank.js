import React from "react";
import styled from "styled-components";
import IMG from "../../asset/img/list_img.png";

function Rank() {
  return (
    <StWrap>
      <StHeading>* 주문 임박</StHeading>
      <StCartContainer>
        <Card />
        <Card />
        <Card />
      </StCartContainer>
    </StWrap>
  );
}

function Card() {
  return (
    <StCardWrap>
      <StImg src={IMG} />
      <StRow>
        <StFirstRow>BBQ치킨 목포대점</StFirstRow>
      </StRow>
      <StRow>마감 19 : 00</StRow>
      <StRow>모집 3/4명</StRow>
    </StCardWrap>
  );
}

const StWrap = styled.div`
  margin: 0.18rem 0;
  padding: 10px;

  width: 100%;
  ${"" /* height: 8rem; */}
  background-color: white;
`;

const StCartContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StHeading = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

const StCardWrap = styled.div`
  width: calc(100% / 3.2);
`;

const StImg = styled.img`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const StFirstRow = styled.p`
  color: #0e8bc0;
`;
const StRow = styled.div`
  font-weight: 400;
  font-size: 0.7rem;
  padding: 0.15rem 0;
  text-align: center;

  &:first-child {
    color: red;
  }

  &:last-child {
    color: #09c51c;
  }
`;
export default Rank;
