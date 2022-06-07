import React from "react";
import styled from "styled-components";

import SAMPLE from "../../asset/img/list_img.png";

function Test() {
  return (
    <div>
      <MenuImg />
      <NameBox />
      <PriceBox />
      <SelectBox />
    </div>
  );
}

function MenuImg() {
  return (
    <>
      <StMenuImg src={SAMPLE} alt="메뉴 사진" />
    </>
  );
}

const StMenuImg = styled.img`
  width: auto;
  max-width: 100%;
  vertical-align: middle;
  border: 0;
`;

function NameBox() {
  return (
    <div>
      <p>황금올리브 + 콜라 1.25L</p>
    </div>
  );
}

function PriceBox() {
  return (
    <div>
      <p>가격</p>
      <p>20000원</p>
    </div>
  );
}

function SelectBox() {
  return (
    <>
      <title>음료 선택</title>
      <label>
        <input type="checkbox" />
        <i></i>
      </label>
    </>
  );
}

const StCheckBox = styled.input`
  border: 1px solid black;
  widht: 20px;
  height: 20px;
`;
export default Test;
