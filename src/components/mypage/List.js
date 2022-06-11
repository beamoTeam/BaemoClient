import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useChatSeqState, useCartState, useUserSeqState, useAddrState} from "../../recoil/atom";

function List() {
  const navigate = useNavigate();
  const {setCart} = useCartState();
  const {setChatSeq} = useChatSeqState();
  const {setUserSeq} = useUserSeqState();
  const {setAddr} = useAddrState();

  const handleLogout = () => {
    if (!window.confirm("로그아웃 하시겠어요?")) return;
    setCart();
    setChatSeq();
    setUserSeq();
    setAddr();
    navigate("/login");
  };

  return (
    <StWrap>
      <ul>
        <StItem>
          <span>리뷰 관리</span>
          <span>&gt;</span>
        </StItem>
        <StItem>
          <span>친구 초대하기</span>
          <span>&gt;</span>
        </StItem>
        <StItem>
          <span>문의하기</span>
          <span>&gt;</span>
        </StItem>
        <StItem className="color__red" onClick={handleLogout}>
          <span>로그아웃</span>
          <span>&gt;</span>
        </StItem>
        <StItem className="color__red">
          <span>회원 탈퇴</span>
          <span>&gt;</span>
        </StItem>
      </ul>
    </StWrap>
  );
}

export default List;

const StWrap = styled.div`
  height: 21.25rem;
  width: 100%;

  padding: 10px;
  margin-top: 0.18rem;

  background-color: white;
`;

const StItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 10px;

  font-size: 0.9rem;
  font-weight: 600;

  &.color__red {
    color: red;
  }
`;

// const list = [
//   {
//     title: "리뷰 관리",
//     url: "",
//   },
//   {
//     title: "친구 초대하기",
//     url: "",
//   },
//   {
//     title: "문의하기",
//     url: "",
//   },
//   {
//     title: "로그아웃",
//     url: "",
//   },
//   {
//     title: "회원 탈퇴",
//     url: "",
//   },
// ];
