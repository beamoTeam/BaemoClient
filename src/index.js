import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import {RecoilRoot} from 'recoil';
import { GlobalStyle } from "./style/globalStyle";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyle />
      <App />
      </RecoilRoot>
  </React.StrictMode>
);
