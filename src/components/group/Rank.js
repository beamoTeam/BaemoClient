import React from "react";
import styled from "styled-components";

function Rank() {
  return (
    <StRankWrap>
      <StHeading>배모 주문 임박!</StHeading>
      <RankCard />
    </StRankWrap>
  );
}

function RankCard({ image, restraunt, endTimd, joinNum, currNum }) {
  return (
    <StCard>
      <StImg src={image} alt="브랜드 로고" height="100px" />
      <p>BBQ치킨 목포대점</p>
      <p>마감시간 20:35</p>
      <p>모집인원 1/4</p>
    </StCard>
  );
}

const StRankWrap = styled.ul`
  width: 100%;
  height: 10rem;
  background-color: white;

  margin-top: 0.18rem;
`;

const StCard = styled.div`
  width: calc(100% / 3);
  height: 60%;
  z-index: 10;

  font-size: 0.7rem;
  margin: 0 0.7rem
`;

const StImg = styled.img`
  height: 50%;
  border-radius: 5px;
`;

const StHeading = styled.h1`
  padding: 0.7rem;
  font-weight: bold;
  font-size: 1.3rem;
`;

export default Rank;
