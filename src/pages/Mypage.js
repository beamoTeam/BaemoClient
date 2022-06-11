import React from "react";
import { Profile, List } from "../components/mypage/index";
import styled from "styled-components";
import CartBtn from "../components/cart/CartBtn";

function Mypage() {
  return (
    <StWrap>
      <Profile />
      <List />
      <CartBtn />
    </StWrap>
  );
}
const StWrap = styled.div`
  padding: 4rem 0;
`;

export default Mypage;
