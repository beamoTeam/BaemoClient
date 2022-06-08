import React from "react";
import styled from "styled-components";
import IMG from "../../asset/img/img_no.png";

function RepresentImg() {
  return (
    <StImgBox>
      <StImg src={IMG} />
    </StImgBox>
  );
}

const StImgBox = styled.div`
  position: relative;
`;

const StImg = styled.img`
  width: auto;
  max-width: 100%;
  vertical-align: middle;
  border: 0;
`;

export default RepresentImg;
