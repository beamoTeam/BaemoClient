import React, { useState, useEffect } from "react";
import { Category, Filter, Rank, List } from "../components/group/index";
import { getAllChattingRoomByAddress } from "../api";
import CartBtn from "../components/cart/CartBtn";
import { useNavigate } from 'react-router-dom';
import { useUserSeqState, useAddrState } from "../recoil/atom";
import styled from "styled-components";

function Group() {
  const navigate = useNavigate();
  const { addr } = useAddrState();
  const { userSeq } = useUserSeqState();
  const [chattingList, setchattingList] = useState(null);

  useEffect(() => {
    if (!userSeq) navigate("/login");
    if (!addr) return;
    async function test() {
      try {
        const res = await getAllChattingRoomByAddress({address: addr})
        setchattingList(res.data);
      } catch (err) {
        console.log(err.response);
      }
    }
    test();
  }, [navigate, userSeq, addr]);
  
  return (
    <StWrap>
      <Category />
      <Filter />
      <Rank />
      <List chattingList={chattingList} />
      <CartBtn />
    </StWrap>
  );
}

const StWrap = styled.div`
  padding: 3.9rem 0;
`;


export default Group;
