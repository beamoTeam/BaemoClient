import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { getCartByUser } from "../../api";
import { filterSameMenu } from "../../utils/filter";
import { useCartState, useChatSeqState } from "../../recoil/atom";

function CartBtn() {
  const { chatSeq } = useChatSeqState();
  const {cart, setCart} = useCartState();

  useEffect(() => {
    if (!chatSeq) return;
    const getCartItems = async () => {
      try {
        const res = await getCartByUser(1, chatSeq);
        setCart(filterSameMenu(res.data.basketMenuList));
      } catch (err) {
        throw new Error(`${err} - User 장바구니 GET 에러`);
      }
    };
    getCartItems();
  }, [chatSeq, setCart]);

  if (cart.length === 0) return null;

  return (
    <StWrap>
      <Link to="/cart">
        <StSpan>
          <BsCart />
        </StSpan>
      </Link>
      <StCount>{cart.length}</StCount>
    </StWrap>
  );
}

export default CartBtn;

const StWrap = styled.div`
  width: 3rem;
  height: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: rgb(0 0 0 / 10%) 0px -1px 0px 0px inset;
  border-radius: 50%;

  position: fixed;
  bottom: 4.5rem;
  right: 1rem;

  z-index: 100;
  font-weight: bold;
  background-color: #881fc8;
  color: white;
`;

const StCount = styled.div`
  position: absolute;
  top: -0.3rem;
  right: -0.3rem;

  width: 1.2rem;
  height: 1.2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.7rem;
  border-radius: 50%;
  background-color: #0066cc;

  line-height: 0.4rem;
`;

const StSpan = styled.span`
  display: block;
  transform: translateY(10%);
  font-weight: 600;
  font-size: 1.7rem;
`;
