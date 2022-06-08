import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function AddMore({ menu }) {
  return (
    <Link to={`/menu/${menu[0]?.restaurant_seq}`}>
      <StWrap>+ 메뉴추가하기</StWrap>
    </Link>
  );
}
export default AddMore;

const StWrap = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 10px;
  margin-top: 0.1rem;

  ${"" /* margin-top: 0.18rem; */}

  font-weight: 600;
  font-size: 0.8rem;

  background-color: white;
`;
