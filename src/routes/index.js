import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../components/header/index";
import { Footer } from "../components/footer/index";
import { Group, Menu, Restaurant, Select, Cart, NotFound, Mypage, Making, Status } from "../pages/index";
import Login from "../components/login/Login";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Group />} />
        <Route path="/menu/:r_seq" element={<Menu />} />
        <Route path="/select/:m_seq" element={<Select />} />
        <Route path="/making" element={<Making />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/status" element={<Status />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/restaurant/:r_seq" element={<Restaurant />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
