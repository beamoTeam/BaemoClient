import React, { useState, useEffect } from "react";
import {
  CountBox,
  ImgBox,
  NameBox,
  PriceBox,
  SelectBox,
  TotalBox,
} from "../components/Select/index";
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { getDetailMenuByMenuId } from "../api";

function Select() {
  const params = useParams();
  const { m_seq } = params;
  const [menuInfo, setMenuInfo] = useState(null);

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

  if(!menuInfo) return <h1>로딩중..</h1>
  const { img, name, price, restaurant_seq } = menuInfo;
  return (
    <StWrap>
      <ImgBox img={img} />
      <NameBox name={name} />
      <PriceBox price={price} />
      <SelectBox />
      <CountBox />
      <TotalBox r_seq={restaurant_seq} />
    </StWrap>
  );
}

const StWrap = styled.div`
  padding: 4rem 0;
`;


export default Select;
