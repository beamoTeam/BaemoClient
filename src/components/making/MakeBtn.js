import React from "react";
import styled from "styled-components";

function MakeBtn({ handleCreate }) {
  return (
    <StWrap>
      <StMakeBtn onClick={handleCreate}>방 만들기</StMakeBtn>
    </StWrap>
  );
}

const StMakeBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.6rem;

  color: white;
  background-color: #881fc8;

  border-radius: 2px;

  font-weight: 500;
  font-size: 1rem;
`;
const StWrap = styled.div`
  height: auto;
  width: 100%;

  padding: 10px;
  margin-top: 0.18rem;

  background-color: white;
`;
export default MakeBtn;
