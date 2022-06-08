import React from "react";
import styled from "styled-components";

function SelectBox() {
  return (
    <StSelectWrap>
      <StHeading>음료 선택</StHeading>
      <StLabel>
        v
        <input type="checkbox" />
        <i></i>
      </StLabel>
    </StSelectWrap>
  );
}

export default SelectBox;

const StSelectWrap = styled.div`
  padding: 1rem;

  margin-top: 0.18rem;
  background-color: white;
`;

const StHeading = styled.h3`
  padding: 0.1rem 0;

  font-weight: 600;
  font-size: 1.1rem;
`;

const StLabel = styled.label`
  &:input[type="checked"] {
    background-color: violet;
  }
  width: 20px;
  height: 20px;
  border: 1px solid black;
`;
