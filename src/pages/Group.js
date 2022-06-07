import React, { useState, useEffect } from "react";
import { Category, Filter, Rank, List } from "../components/group/index";
import { getAllChattingRoom } from "../api";

function Group() {
  const [chattingList, setchattingList] = useState(null);

  useEffect(() => {
    async function test() {
      try {
        const res = await getAllChattingRoom();
        setchattingList(res.data);
      } catch (err) {
        throw new Error(`${err} - 전체 채팅리스트 받아오기`);
      }
    }
    test();
  }, []);
  
  return (
    <>
      <Category />
      <Filter />
      <Rank />
      <List chattingList={chattingList} />
    </>
  );
}

export default Group;
