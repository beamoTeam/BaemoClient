import React from "react";
import styled from "styled-components";

function SlideMenu() {
  return (
    <StSlideWrap>
      <StSlideRow>메뉴</StSlideRow>
      <StSlideRow>정보</StSlideRow>
    </StSlideWrap>
  );
}

const StSlideWrap = styled.div`
  display: flex;
  align-itmes: center;

  margin-top: 0.18rem;

  width: 100%;
  background-color: white;
`;

const StSlideRow = styled.div`
  flex: 1;
  text-align: center;

  padding: 10px;

  color: #929292;
  font-weight: 600;

  &:first-child {
    color: #881fc8;
    border-bottom: 2px solid #881fc8;
  }
`;

export default SlideMenu;
