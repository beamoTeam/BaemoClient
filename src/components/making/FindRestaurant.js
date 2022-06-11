import React, { useState, useEffect } from "react";
import { getAllRestaurant } from "../../api";
import styled from "styled-components";
import LOGO from "../../asset/img/logo_shop.png";

function FindRestaurant({ setshowing, setUserSelect }) {
  const [list, setList] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getAllRestaurant();
      setList(res.data);
    })();
  }, []);

  const setRestaurant = (name, r_seq) => {
    setUserSelect((prev) => ({
      ...prev,
      restaurant_seq: r_seq,
      restaurant: name,
    }));
    setshowing(prev => !prev);
  };

  return (
    <>
      <StBg onClick={() => setshowing((prev) => !prev)}></StBg>
      <StWrap>
        {list ? (
          <ul>
            {list?.map((info) => (
              <RestaurantCard key={info.seq} info={info} setRestaurant={setRestaurant} />
            ))}
          </ul>
        ) : (
          <h1>로딩중..</h1>
        )}
      </StWrap>
    </>
  );
}

function RestaurantCard({ info, setRestaurant }) {
  const { deliveryPrice, maxMember, name, seq: r_seq } = info;

  return (
    <StLi onClick={() => setRestaurant(name, r_seq)}>
      <StLogo>
        <img src={LOGO} alt="logo" />
      </StLogo>
      <StInfoWrap>
        <StTextWrap>
          <StName>{name}</StName>
          <StInfo>배달팁 {deliveryPrice.toLocaleString()}원</StInfo>
          <StInfo>최대인원 {maxMember}명</StInfo>
        </StTextWrap>
        <StBtn>&gt;</StBtn>
      </StInfoWrap>
    </StLi>
  );
}
const StLi = styled.li`
  width: 100%;
  height: auto;

  display: flex;
  justify-content: space-between;

  padding: 10px;

  margin: 0.5rem 0;

  border-radius: 3px;

  background-color: white;
`;

const StLogo = styled.div`
  flex: 1;
`;

const StTextWrap = styled.div`
  padding: 0.1rem 0.8rem;
`;

const StInfoWrap = styled.div`
  flex: 8;
  display: flex;
  justify-content: space-between;
`;

export default FindRestaurant;

const StBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  background-color: black;
  opacity: 0.8;

  width: 100vw;
  height: 100vh;

  z-index: 10;
`;

const StWrap = styled.div`
  position: fixed;
  bottom: 3.1rem;
  left: 0;

  width: 100vw;
  height: 60vh;

  padding: 10px;

  overflow: auto;

  z-index: 11;

  background-color: #f5f4f2;

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const StName = styled.p`
  font-weight: 600;
  padding: 0.2em 0;
`;

const StInfo = styled.p`
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.1em 0;
`;

const StBtn = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: 600;
`;
