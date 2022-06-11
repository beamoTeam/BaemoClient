import React from "react";
import styled from "styled-components";
import SAMPLE from "../../asset/img/list_img.png";

function InfoBox({ menuInfo }) {
  return (
    <>
      <StImgWrap>
        <StMenuImg src={SAMPLE} alt="메뉴 사진" />
      </StImgWrap>

      <StNameBox>
      <p>{menuInfo?.name}</p>
    </StNameBox>

    <StPriceBox>
      <p>가격</p>
      <p>{menuInfo?.price?.toLocaleString()}원</p>
    </StPriceBox>
    </>
  );
}

const StImgWrap = styled.div`
  position: relative;
`;

const StMenuImg = styled.img`
  width: auto;
  max-width: 100%;
  vertical-align: middle;
  border: 0;
`;

const StNameBox = styled.div`
  position: relative ;
  
  height: 3rem;
  margin-top: 0.14rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white;

  font-weight: 600;
  font-size: 1.1rem;
`;

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

export default InfoBox;
