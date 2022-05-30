import React from "react";
import styled from "styled-components";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";
import HeaderMid from "./HeaderMid";

function Header() {
  return (
    <StHeader>
      <HeaderLeft />
      <HeaderMid />
      <HeaderRight />
    </StHeader>
  );
}

const StHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 3.75rem;

  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  align-items: center;

  background-color: white;

  z-index: 10;
`;



export default Header;

// 필요한 기능

// 1. 왼쪽 버튼 ( 뒤로가기, 지도 보기 등 )
// 2. 가운데 텍스트 ( 페이지 title. ex - 장바구니, 마이페이지 )
// 3. 오른쪽 버튼 ( 필요따라 새로고침, 햄버거 버튼 )
