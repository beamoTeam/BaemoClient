import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SHARE from "../../asset/img/btn_share.png";
import STAR from "../../asset/img/icon_star_on.png";

function InfoBox({ enterChatRoom }) {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    enterChatRoom(setInfo);
  }, [enterChatRoom]);

  if (!info) return <h1>로딩중..</h1>;

  const { restaurant, maxPersonnel } = info.chatInfo;
  const { deliveryPrice, img, name } = restaurant;

  return (
    <>
      <StNameWrap>
        <div>
          <StRestrauntName>{name}</StRestrauntName>
          <StReviewWrap>
            <StStar src={STAR} />
            <span>4.7 리뷰 &gt;</span>
          </StReviewWrap>
        </div>
        <StShareBtn src={SHARE} />
      </StNameWrap>

      <StInfoWrap>
        <StInfoRow>최소 주문금액 20,000원</StInfoRow>
        <StInfoRow>배달요금 {deliveryPrice?.toLocaleString()}원</StInfoRow>
        <StInfoRow>최대 인원 {maxPersonnel}명</StInfoRow>
      </StInfoWrap>
    </>
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

const StNameWrap = styled.div`
  position: relative;
  display: flex;

  margin: 0.18rem;
  padding: 10px;

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

  transform: translateY(-45%);
`;

const StReviewWrap = styled.div``;

const StStar = styled.img`
  width: 20px;
`;

export default InfoBox;
