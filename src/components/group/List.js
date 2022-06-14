import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useChatSeqState } from "../../recoil/atom";
import { useAddrState } from "../../recoil/atom";
import LOGO from "../../asset/img/logo_shop.png";

function List({ chattingList }) {
  const { addr } = useAddrState();
  if (!addr) return <StNoMsg>주소를 선택해 주세요</StNoMsg>;
  if (!chattingList) return <h1>로딩중..</h1>;
  if (chattingList.length === 0) return <StNoMsg><Link to="/making">모임을 만들어 보세요</Link></StNoMsg>;

  return (
    <StListWrap>
      {chattingList?.map((chat) => {
        return <ListItem key={chat.seq} chat={chat} />;
      })}
    </StListWrap>
  );
}

function ListItem({ chat }) {
  const { setChatSeq } = useChatSeqState();

  const { orderTime, maxPersonnel, name, restaurant, seq: c_seq } = chat;
  const { seq: r_seq } = restaurant;
  return (
    <div onClick={() => setChatSeq(c_seq)}>
      <Link to={`menu/${r_seq}`}>
        <StListItem>
          <StImg src={LOGO} alt="LOGO" />
          <StTextBox>
            <StP className="color__blue">{name}</StP>
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
  position: relative;
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

const StNoMsg = styled.div`
  position: absolute;
  width: 100%;
  height: 17rem;
  display: flex;
  font-weight: 600;
  font-size: 1.2rem;
  justify-content: center;
  align-items: center;
`;

export default List;
