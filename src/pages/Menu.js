import React from "react";
import {
  RepresentImg,
  MenuList,
  InfoBox,
  SlideMenu,
} from "../components/menu/index";
import styled from "styled-components";
import { enterChattingRoom, getAllMenuByRestaurant } from "../api";
import { useUserSeqState, useChatSeqState } from "../recoil/atom";
import { useParams } from "react-router-dom";
import CartBtn from "../components/cart/CartBtn";

function Menu() {
  const { r_seq } = useParams();
  const { userSeq: u_seq } = useUserSeqState();
  const { chatSeq: c_seq } = useChatSeqState();

  const getMenuList = async (setMenuList) => {
    try {
      const res = await getAllMenuByRestaurant(r_seq);
      setMenuList(res.data);
    } catch (err) {
      throw new Error(`${err} - 특정 음식점의 메뉴 가져올때 에러`);
    }
  };

  const enterChatRoom = async (setInfo) => {
    try {
      const res = await enterChattingRoom(u_seq, c_seq);
      setInfo(res.data);
    } catch (err) {
      throw new Error(`${err} - 채팅방 입장할때 에러`);
    }
  };

  return (
    <StWrap>
      <RepresentImg />
      <InfoBox enterChatRoom={enterChatRoom} />
      <SlideMenu />
      <MenuList getMenuList={getMenuList} />
      <CartBtn />
    </StWrap>
  );
}



const StWrap = styled.div`
  padding: 4rem 0;
`;

export default Menu;
