import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Header from "../components/header/index";

function Router() {
  return (
    <BrowserRouter>
      <Header.Header />
      <Routes>
        <Route path="/" element={<h1>Hello World</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
