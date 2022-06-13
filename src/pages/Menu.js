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
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import CartBtn from "../components/cart/CartBtn";

function Menu() {
  const navigate = useNavigate();
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
      console.log(err.response)
      if(err.response.status === 400) {
        alert("최대 인원 초과입니다.");
        return navigate("/", { replace: true });
      }
      // throw new Error(`${err} - 채팅방 입장할때 에러`);
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
