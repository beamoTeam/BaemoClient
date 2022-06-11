import React from "react";
import styled from "styled-components";

function CountBox({ menuInfo, setMenuInfo }) {
  return (
    <StCountWrap>
      <div>수량선택</div>
      <StBtnWrap>
        <StBtn
          className={menuInfo.count === 0 ? "__disable" : null}
          onClick={() => minus(menuInfo, setMenuInfo)}
        >
          -
        </StBtn>
        <StCountText>{String(menuInfo?.count)}</StCountText>
        <StBtn onClick={() => plus(menuInfo, setMenuInfo)}>+</StBtn>
      </StBtnWrap>
    </StCountWrap>
  );
}

const plus = (state, setState) => {
  setState((prev) => ({
    ...prev,
    count: state.count + 1,
  }));
};

const minus = (state, setState) => {
  if (state.count === 0) return;
  setState((prev) => ({
    ...prev,
    count: state.count - 1,
  }));
};

export default CountBox;

const StCountWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem;
  margin-top: 0.15rem;

  font-weight: 600;
  font-size: 1.1rem;

  background-color: white;
`;

const StBtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  font-size: 0.8rem;
`;

const StBtn = styled.div`
  width: 1.3rem;
  height: 1.3rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 3px;
  border: 1px solid black;
  
  &.__disable {
    opacity: 0.3;
  }
`;

const StCountText = styled.div`
  margin: 0 0.5rem;
`;
