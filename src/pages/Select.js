import React, { useState, useEffect } from "react";
import {
  CountBox,
  ImgBox,
  NameBox,
  PriceBox,
  SelectBox,
  TotalBox,
} from "../components/Select/index";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getDetailMenuByMenuId } from "../api";

function Select() {
  const params = useParams();
  const { m_seq } = params;
  const [menuInfo, setMenuInfo] = useState({
    seq: null,
    category: null,
    name: null,
    img: null,
    price: null,
    restaurant_seq: null,
    count: null
  });

  useEffect(() => {
    const getDetailMenu = async () => {
      try {
        const res = await getDetailMenuByMenuId(m_seq);
        setMenuInfo(res?.data);
      } catch (err) {
        throw new Error(`${err} - 세부 메뉴 데이터 받아올때 에러`);
      }
    };
    getDetailMenu();
  }, [m_seq]);

  if (!menuInfo) return <h1>로딩중..</h1>;

  return (
    <StWrap>
      <ImgBox menuInfo={menuInfo} setMenuInfo={setMenuInfo} />
      <NameBox menuInfo={menuInfo} setMenuInfo={setMenuInfo} />
      <PriceBox menuInfo={menuInfo} setMenuInfo={setMenuInfo} />
      <SelectBox menuInfo={menuInfo} setMenuInfo={setMenuInfo} />
      <CountBox menuInfo={menuInfo} setMenuInfo={setMenuInfo} />
      <TotalBox menuInfo={menuInfo} setMenuInfo={setMenuInfo} />
    </StWrap>
  );
}

const StWrap = styled.div`
  padding: 4rem 0;
`;

export default Select;
