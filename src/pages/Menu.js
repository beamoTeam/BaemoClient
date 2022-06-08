import React from "react";
import {
  RepresentImg,
  MenuList,
  NameBox,
  InfoBox,
  SlideMenu,
} from "../components/menu/index";
import styled from "styled-components";

function Menu() {
  return (
    <StWrap>
      <RepresentImg />
      <NameBox />
      <InfoBox />
      <SlideMenu />
      <MenuList />
    </StWrap>
  );
}

const StWrap = styled.div`
  padding: 4rem 0;
`;


export default Menu;





