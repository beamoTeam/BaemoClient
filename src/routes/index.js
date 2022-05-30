import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Header from "../components/header/index";
import * as Footer from "../components/footer/index";
import { Group } from "../pages/index";

function Router() {
  return (
    <BrowserRouter>
      <Header.Header />
      <Routes>
        <Route path="/" element={<Group />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      <Footer.Footer />
    </BrowserRouter>
  );
}

export default Router;