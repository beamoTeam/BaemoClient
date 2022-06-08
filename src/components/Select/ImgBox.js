import React from "react";
import styled from "styled-components";
import SAMPLE from "../../asset/img/list_img.png";

function ImgBox({ img }) {
  return (
    <StImgWrap>
      <StMenuImg src={SAMPLE} alt="메뉴 사진" />
    </StImgWrap>
  );
}

const StImgWrap = styled.div`
  position: relative;
  ${'' /* margin-top: 4rem; */}
`;

const StMenuImg = styled.img`
  width: auto;
  max-width: 100%;
  vertical-align: middle;
  border: 0;
`;

export default ImgBox;
