import React, { useState, useEffect } from "react";
import { Category, Filter, Rank, List } from "../components/group/index";
import { getAllChattingRoom } from "../api";
import CartBtn from "../components/cart/CartBtn";
import { useNavigate } from 'react-router-dom';
import { useUserSeqState } from "../recoil/atom";
import styled from "styled-components";

function Group() {
  const navigate = useNavigate();
  const { userSeq } = useUserSeqState();
  const [chattingList, setchattingList] = useState(null);

  useEffect(() => {
    if (!userSeq) navigate("/login");
    async function test() {
      try {
        const res = await getAllChattingRoom();
        setchattingList(res.data);
      } catch (err) {
        console.log(err.response);
        // throw new Error(`${err} - 전체 채팅리스트 받아오기`);
      }
    }
    test();
  }, [navigate, userSeq]);
  
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
