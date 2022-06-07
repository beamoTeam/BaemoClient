import React from "react";
import styled from "styled-components";

function List() {
  return (
    <StListWrap>
      <ListItem />
    </StListWrap>
  );
}

function ListItem({ image }) {
  return (
    <StListItem>
      <img src={image} alt="LOGO" />
      <div>
        <p>BBQ치킨 목포대점</p>
        <p>
          <span>마감 21:00</span>
          <span>모집 2/4</span>
        </p>
      </div>
    </StListItem>
  );
}

const StListWrap = styled.ul`
  width: 100%;
  height: 20.15rem;
  overflow: auto;

  margin-top: 0.18rem;
  ${"" /* padding: 0.7rem; */}
`;

const StListItem = styled.li`
  display: flex;
  
  width: 100%;
  height: calc(100% / 5);
  margin-bottom: 0.18rem;

  background-color: white;
`;
export default List;

// 차트놀이 워드클라우드에 글자가 겹치는 현상이 종종있는데 수정이 가능한 걸까요? 글자크기가 옆에 연결망보다 작은 것 같은데, 조금 더 키울 수 있나요?