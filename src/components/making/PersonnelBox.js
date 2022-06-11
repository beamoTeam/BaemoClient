import React from "react";
import styled from "styled-components";

function PersonnelBox({ setUserSelect }) {
  const number = [2, 3, 4];
  const handleChange = (e) => {
    setUserSelect(prev => ({
      ...prev,
      maxPersonnel: e.target.value
    }))
  }
  return (
    <StWrap>
      <StHeading>모집인원</StHeading>
      <StSelectBox onChange={handleChange}>
        {number.map((n) => (
          <option key={n} value={n}>
            {n}명
          </option>
        ))}
      </StSelectBox>
    </StWrap>
  );
}
export default PersonnelBox;

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
const StSelectBox = styled.select`

  width: 8rem;
  border: 1px solid #881fc8;
  padding: 0.4rem;
  border-radius: 2px;
  font-weight: 600;
  text-align: center;
  font-size: 0.8rem;

  background-color: white;
  color: black;
`;
