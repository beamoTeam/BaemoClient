import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

function NotFound() {
  return (
    <StWrap>
      <StNot>404 Not Found</StNot>
      <div>
        <Link to="/">
          <StSpan active>Go Home</StSpan>
        </Link>
      </div>
    </StWrap>
  );
}

const StWrap = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  background-color: white;

  z-index: 100;
`;

const StNot = styled.div`
  font-size: 1.3rem;
  font-weight: 200;

  margin: 1rem 0;
`;

const motion = keyframes`
  0%,40%,100% {
    transform: translateY(0)
  }
  20% {
    transform: translateY(-12px)
  }
`;

const StSpan = styled.span`
  display: block;
  color: #881fc8;
  font-weight: 500;
  animation: ${motion} 2s 1s linear infinite;
`;

export default NotFound;
