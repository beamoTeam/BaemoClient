import React, { useState } from "react";
import styled from "styled-components";

function Background({ children }) {
  const [view, setView] = useState(false);
  if (!view) return null;
  return (
    <div>
      <StWrap onClick={() => setView((prev) => !prev)} />
      
    </div>
  );
}

const StWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  opacity: 0.7;
  background-color: black;

  z-index: 999;
`;

export default Background;
