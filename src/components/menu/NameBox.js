import React from "react";
import styled from "styled-components";
import SHARE from "../../asset/img/btn_share.png";
import STAR from "../../asset/img/icon_star_on.png";

function NameBox() {
  return (
    <StNameWrap>
      <div>
        <StRestrauntName>BBQ 청계목대점</StRestrauntName>
        <StReviewWrap>
          <StStar src={STAR} />
          <span>4.7 리뷰 &gt;</span>
        </StReviewWrap>
      </div>
      <StShareBtn src={SHARE} />
    </StNameWrap>
  );
}

export default NameBox;
const StNameWrap = styled.div`
  display: flex;

  margin: 0.18rem;
  padding: 10px;

  width: 100%;
  height: 4rem;

  background-color: white;
`;

const StRestrauntName = styled.h6`
  font-weight: bold;
  font-size: 1.3rem;
`;

const StShareBtn = styled.img`
  position: absolute;
  right: 10px;
  top: 50%;

  transform: translateY(15%);
`;

const StReviewWrap = styled.div``;

const StStar = styled.img`
  width: 20px;
`;
