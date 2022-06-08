import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllMenuByRestaurant } from "../../api";
import { Link, useParams } from "react-router-dom";
import LOGO from "../../asset/img/logo_shop.png";

function MenuList() {
  const params = useParams();
  const [menuList, setMenuList] = useState(null);
  const { r_seq } = params;
  
  useEffect(() => {
    const getMenuList = async () => {
      try {
        const res = await getAllMenuByRestaurant(r_seq);
        setMenuList(res.data);
      } catch (err) {
        throw new Error(`${err} - 특정 음식점의 메뉴 가져올때 에러`);
      }
    };
    getMenuList();
  }, [r_seq]);

  if (!menuList) return <h1>로딩중..</h1>;

  return (
    <StUL>
      {menuList?.map((menu) => (
        <MenuItem key={menu.seq} menu={menu} />
      ))}
    </StUL>
  );
}

function MenuItem({ menu }) {
  const { name, price, seq } = menu;
  return (
    <Link to={`/menuSelection/${seq}`}>
      <StLI>
        <StTextWrap>
          <p>{name}</p>
          <p>{price?.toLocaleString()}원</p>
        </StTextWrap>
        <StImgWrap>
          <StLogo src={LOGO} />
        </StImgWrap>
      </StLI>
    </Link>
  );
}

const StUL = styled.ul`
  height: 5.95rem;
`;

const StLI = styled.li`
  display: flex;
  padding: 10px;
  background-color: white;
  margin: 0.18rem 0;
`;

const StTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  flex: 3;
  font-weight: 550;
  font-size: 0.82rem;
`;

const StImgWrap = styled.div`
  flex: 1;
  text-align: right;
`;

const StLogo = styled.img`
  width: 4rem;
  height: 2rem;
`;

export default MenuList;
