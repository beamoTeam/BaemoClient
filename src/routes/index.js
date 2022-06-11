import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../components/header/index";
import { Footer } from "../components/footer/index";
// import CartBtn from "../components/cart/CartBtn";
import { Group, Menu, Restaurant, Select, Cart, NotFound, Mypage, Making } from "../pages/index";
import Login from "../components/login/Login";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Group />} />
        <Route path="/restaurant" element={<Restaurant />} />
        {/* 여기 고쳐야함 (Menu) */}
        <Route path="/menu" element={<Menu />}>
          <Route path=":r_seq" element={<Menu />} />
        </Route>
        {/* 여기 고쳐야함 (Select) */}
        <Route path="/select" element={<Select />}>
          <Route path=":m_seq" element={<Select />} />
        </Route>
        <Route path="/making" element={<Making />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
