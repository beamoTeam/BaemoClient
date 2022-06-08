import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Header from "../components/header/index";
import * as Footer from "../components/footer/index";
import { Group, Menu, Restaurant, Select } from "../pages/index";

function Router() {
  return (
    <BrowserRouter>
      <Header.Header />
      <Routes>
        <Route path="/" element={<Group />} />
        <Route path="/restaurant" element={<Restaurant />} />
        {/* 여기 고쳐야함 (Menu) */}
        <Route path="/menu" element={<Menu />} > 
          <Route path=":r_seq" element={<Menu />}></Route>
        </Route>
        {/* 여기 고쳐야함 (Select) */}
        <Route path="/select" element={<Select />}>
          <Route path=":m_seq" element={<Select />}></Route>
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      <Footer.Footer />
    </BrowserRouter>
  );
}

export default Router;