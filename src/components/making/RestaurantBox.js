import React, { useState } from "react";
import styled from "styled-components";
import FindRestaurant from "./FindRestaurant";

function RestaurantBox({ userSelect, setUserSelect }) {
  const { restaurant } = userSelect;
  const [showing, setshowing] = useState(false);

  const setRestaurant = () => {
    // 음식점 선택창 보여줘야함.
    setshowing(prev => !prev);
    // setUserSelect();
  }

  return (
    <StWrap>
      <StHeading>음식점</StHeading>
      <StText>
        {restaurant ? restaurant : "음식점을 찾으면 자동 입력되요."}
      </StText>
      <StFindBtn onClick={setRestaurant}>음식점 찾기</StFindBtn>
      {showing && <FindRestaurant setshowing={setshowing} setUserSelect={setUserSelect} />}
    </StWrap>
  );
}

const StWrap = styled.div`
  height: auto;
  width: 100%;

  padding: 10px;
  margin-top: 0.18rem;

  background-color: white;
`;
const StHeading = styled.p`
  font-weight: 600;
  font-size: 1rem;

  margin: 0.5rem 0;
`;

const StText = styled.div`
  width: 100%;
  height: auto;

  padding: 0.6rem;
  margin: 1rem 0;

  color: #92925;
  background-color: #f5f4f2;

  border-radius: 2px;

  font-size: 0.8rem;

  text-align: center;
`;

const StFindBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.6rem;

  border: 1px solid #881fc8;
  border-radius: 2px;

  font-weight: 600;
  font-size: 0.8rem;
`;

export default RestaurantBox;
