import React from "react";
import styled from "styled-components";

function NameBox({ menuInfo ,setMenuInfo }) {
  return (
    <StNameBox>
      <p>{menuInfo?.name}</p>
    </StNameBox>
  );
}
const StNameBox = styled.div`
  position: relative ;
  
  height: 3rem;
  margin-top: 0.14rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white;

  font-weight: 600;
  font-size: 1.1rem;
`;
export default NameBox;
