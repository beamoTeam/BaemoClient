import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./style/globalStyle";
import { HelmetComponent } from "./helmet/HelmetComponent";

import * as Header from "./components/header/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetComponent />
    <GlobalStyle />
      <BrowserRouter>
        <Header.Header />
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
