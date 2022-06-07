import React from "react";
import {
  RepresentImg,
  MenuList,
  NameBox,
  InfoBox,
  SlideMenu,
} from "../components/menu/index";

function Menu() {
  return (
    <div style={{"overflow": "auto"}}>
      <RepresentImg />
      <NameBox />
      <InfoBox />
      <SlideMenu />
      <MenuList />
    </div>
  );
}

export default Menu;
