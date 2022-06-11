import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useChatSeqState } from "../../recoil/atom";

import LOGO from "../../asset/img/logo_shop.png";

function List({ chattingList }) {
  if (!chattingList) return <h1>로딩중..</h1>;

  return (
    <StListWrap>
      {chattingList?.map((chat) => {
        return <ListItem key={chat.seq} chat={chat} />;
      })}
    </StListWrap>
  );
}

function ListItem({ chat }) {
  const {setChatSeq} = useChatSeqState();
  
  const { orderTime, maxPersonnel, restaurant, seq: c_seq } = chat;
  const { seq: r_seq } = restaurant;
  return (
    <div onClick={() => setChatSeq(c_seq)}>
      <Link to={`menu/${r_seq}`}>
        <StListItem>
          <StImg src={LOGO} alt="LOGO" />
          <StTextBox>
            <StP className="color__blue">{restaurant.name}</StP>
            <p>
              <StText>마감 {orderTime.split(" ")[1]}</StText>
              <StText className="color__green"> 모집 1/{maxPersonnel}</StText>
            </p>
          </StTextBox>
        </StListItem>
      </Link>
    </div>
  );
}
const StListWrap = styled.ul`
  width: 100%;
  overflow: auto;

  margin-top: 0.2rem;
`;

const StListItem = styled.li`
  display: flex;
  padding: 10px;

  width: 100%;
  height: calc(100% / 5);
  margin-bottom: 0.18rem;

  background-color: white;
`;

const StImg = styled.img`
  height: 2.5rem;
`;
const StTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  padding: 0 1.2rem;
  font-weight: 600;
  font-size: 0.83rem;
`;

const StP = styled.p`
  &.color__blue {
    color: #0e8bc0;
  }
`;

const StText = styled.span`
  &.color__green {
    color: #09c51c;
    margin-left: 10px;
  }
`;
export default List;
