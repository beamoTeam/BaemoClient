import React from "react";
import { useCartState, useChatSeqState } from "../recoil/atom";
import styled from "styled-components";
import { postOrder } from "../api";
import { useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { chatSeqState, cartState } from "../recoil/atom";
import {
  AddMore,
  DeliveryFee,
  MenuBox,
  NameBox,
  Total,
} from "../components/cart/index";

function Cart() {
  const navigate = useNavigate();
  const resetChatSeqState = useResetRecoilState(chatSeqState);
  const resetCartState = useResetRecoilState(cartState);
  const { chatSeq } = useChatSeqState();
  const { cart} = useCartState();
  
  const handleOrder = async () => {
    try {
      await postOrder(1, chatSeq);
      alert("주문이 완료되었습니다.");
      // 카트, chatSeq 비우기
      resetCartState();
      resetChatSeqState();
      navigate("/", { replace: true });
    } catch (err) {
      throw new Error(`${err} - 장바구니 내용 주문할떄 에러`);
    }
  };

  return (
    <StWrap>
      <NameBox />
      {cart.map((item) => (
        <MenuBox key={item.menu_seq} item={item} />
      ))}
      <AddMore menu={cart} />
      <DeliveryFee menu={cart} />
      <Total menu={cart} handleOrder={handleOrder} />
    </StWrap>
  );
}

const StWrap = styled.div`
  padding: 4rem 0;
`;

export default Cart;
