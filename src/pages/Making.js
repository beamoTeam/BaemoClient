import React, { useState } from "react";
import styled from "styled-components";
import {
  AddressBox,
  MakeBtn,
  TimeBox,
  PersonnelBox,
  RestaurantBox,
} from "../components/making/index";
import { makeNewGroup } from "../api";
import { useAddrState, useUserSeqState, useChatSeqState } from "../recoil/atom";
import { useNavigate } from "react-router-dom";

function Making() {
  const navigate = useNavigate();
  const { addr } = useAddrState();
  const { userSeq } = useUserSeqState();
  const { setChatSeq } = useChatSeqState();
  const [userSelect, setUserSelect] = useState({
    phone: '',
    detailAddr: '',
    maxPersonnel: '',
    restaurant: '',
    orderTime: '',
    restaurant_seq: null,
  });

  const handleCreate = async () => {
    const { detailAddr, maxPersonnel, restaurant: name, orderTime, restaurant_seq } = userSelect;
    try {
      const data = {
        "address": `${addr} ${detailAddr}`,
        maxPersonnel,
        name,
        orderTime,
        restaurant_seq
      }
      const res = await makeNewGroup(userSeq, data);
      const { seq: c_seq, restaurant } = res.data;
      const { seq: r_seq } = restaurant;
      setChatSeq(c_seq);
      navigate(`/menu/${r_seq}`, { replace: true });
    } catch (err) {
      throw new Error(`${err} - 방만들때 POST 에러`);
    }
  };

  return (
    <StWrap>
      <AddressBox
        addr={addr}
        userSelect={userSelect}
        setUserSelect={setUserSelect}
      />
      <RestaurantBox userSelect={userSelect} setUserSelect={setUserSelect} />
      <PersonnelBox setUserSelect={setUserSelect} />
      <TimeBox userSelect={userSelect} setUserSelect={setUserSelect} />
      <MakeBtn handleCreate={handleCreate} />
    </StWrap>
  );
}

export default Making;

const StWrap = styled.div`
  padding: 3.8rem 0;
`;
