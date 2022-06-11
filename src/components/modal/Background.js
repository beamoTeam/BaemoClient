import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

function Background({ children }) {
  const [view, setView] = useState(false);
  useEffect(() => {
    disableBodyScroll();
    return enableBodyScroll;
  }, []);
  if (!view) return null;
  return createPortal(
    <>
      <StWrap onClick={() => setView(false)} />
      {children}
    </>,
    document.getElementById("modal")
  );
}

const disableBodyScroll = () => {
  document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
};

const enableBodyScroll = () => {
  const scrollY = document.body.style.top;
  document.body.style.cssText = "";
  window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
};

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
