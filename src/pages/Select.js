import React, { useState, useEffect } from "react";
import {
  CountBox,
  InfoBox,
  SelectBox,
  TotalBox,
} from "../components/Select/index";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getDetailMenuByMenuId, addMenuToCart } from "../api";
import { useCartState, useChatSeqState, useUserSeqState } from "../recoil/atom";
import { useNavigate } from "react-router-dom";
import {filterSameMenu} from "../utils/filter";

function Select() {
  const navigate = useNavigate();
  const { m_seq } = useParams();
  const { cart, setCart } = useCartState();
  const { chatSeq } = useChatSeqState();
  const { userSeq } = useUserSeqState();
  const [menuInfo, setMenuInfo] = useState(null);

  const addToCart = async () => {
    try {
      await addMenuToCart(userSeq, chatSeq, menuInfo);
      // console.log(filterSameMenu(cart.concat(menuInfo)))
      // setCart(filterSameMenu());
      navigate(-1, { replace: true });
    } catch (err) {
      throw new Error(`${err} - 장바구니에 메뉴 담을때 에러`);
    }
  };

  useEffect(() => {
    const getDetailMenu = async () => {
      try {
        const res = await getDetailMenuByMenuId(m_seq);
        setMenuInfo(res?.data);
      } catch (err) {
        throw new Error(`${err} - 세부 메뉴 데이터 받아올때 에러`);
      }
    };
    getDetailMenu();
  }, [m_seq]);

  if (!menuInfo) return <h1>로딩중..</h1>;

  return (
    <StWrap>
      <InfoBox menuInfo={menuInfo} />
      <SelectBox menuInfo={menuInfo} setMenuInfo={setMenuInfo} />
      <CountBox menuInfo={menuInfo} setMenuInfo={setMenuInfo} />
      <TotalBox menuInfo={menuInfo} addToCart={addToCart}  />
    </StWrap>
  );
}

const StWrap = styled.div`
  padding: 4rem 0;
`;

export default Select;
