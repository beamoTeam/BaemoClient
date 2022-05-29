import React from "react";
import Router from "./routes";
import { HelmetComponent } from "./helmet/HelmetComponent";

function App() {
  return (
    <>
      <Router />
      <HelmetComponent />
    </>
  );
}

export default App;
