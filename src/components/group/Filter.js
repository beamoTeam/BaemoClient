import React, { useState } from "react";
import styled from "styled-components";

const FILTER = ["마감시간 순", "인원순", "배달요금 순"];

function Filter() {
  const [active, setActive] = useState(null);

  const handleClick = (idx) => {
    setActive(idx)
  }

  return (
    <StUL>
      {FILTER.map((type, idx) => (
        <StFilter onClick={() => handleClick(idx)} isActive={idx === active} key={type}>
          {type}
        </StFilter>
      ))}
    </StUL>
  );
}

const StUL = styled.ul`
  width: 100%;
  height: 2rem;

  display: flex;
  align-items: center;

  margin-top: 0.15rem;
  background-color: white;

  font-size: 0.9rem;
  font-weight: 650;
`;

const StFilter = styled.li`
  background-color: ${(props) => (props.isActive ? "#881FC8" : "white")};
  color: ${(props) => (props.isActive ? "white" : "#c4c4c4")};
  border: 1px solid #c4c4c4;
  font-size: 0.8rem;
  margin: 0 0.3rem;
  padding: 0.4rem 0.5rem 0.2rem 0.5rem;
  border-radius: 25px;
`;

export default Filter;
