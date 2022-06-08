import React from 'react';
import styled from "styled-components";

function NameBox() {
  return <StWrap>BBQ 청계 목대점</StWrap>;
}

const StWrap = styled.div`
  display: flex;
  align-items: center;

  height: 3rem;
  width: 100%;

  padding: 10px;

  font-weight: 600;
  font-size: 1.1rem;
  
  background-color: white;
`;

export default NameBox;