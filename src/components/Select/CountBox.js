import React from "react";
import styled from "styled-components";

function CountBox() {
  return (
    <StCountWrap>
      <div>수량선택</div>
      <StBtnWrap>
        <StBtn>+</StBtn>
        <StCountText>1</StCountText>
        <StBtn>-</StBtn>
      </StBtnWrap>
    </StCountWrap>
  );
}

export default CountBox;

const StCountWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem;
  margin-top: 0.18rem;

  background-color: white;
`;

const StBtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const StBtn = styled.div`
  width: 1.4rem;
  height: 1.4rem;
  border: 2px solid black;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StCountText = styled.div`
  margin: 0 0.5rem;
`;
