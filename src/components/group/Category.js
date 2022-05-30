import React from "react";
import styled from 'styled-components';

const CATEGORIES = ["전체", "치킨", "피자", "카페", "중식", "한식", "디저트"];

function Category() {
  return (
    <nav>
      <StUL>
        {CATEGORIES.map((type) => (
          <li key={type}>{type}</li>
        ))}
      </StUL>
    </nav>
  );
}

const StUL = styled.ul`
  width: 100%;
  height: 2rem;

  display: flex;
  justify-content: space-around;
  align-items: center;

  margin-top: 3.9rem;
  background-color: white;

  font-size: 0.9rem;
  font-weight: 650;
`;

export default Category;
