import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";

const HeaderLeft = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <StLeftWrap>
      <MdArrowBackIos onClick={handleClick} />
    </StLeftWrap>
  );
};

export default HeaderLeft;

const StLeftWrap = styled.div`
  text-align: center;
  font-size: 1.3rem;
`;
