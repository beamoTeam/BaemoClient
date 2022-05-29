import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { GrMap } from "react-icons/gr";

function HeaderLeft() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <StLeftWrap>
      {location.pathname === "/" ? (
        <GrMap />
      ) : (
        <MdArrowBackIos onClick={handleClick} />
      )}
    </StLeftWrap>
  );
}

export default HeaderLeft;

const StLeftWrap = styled.div`
  text-align: center;
  font-size: 1.3rem;
`;
