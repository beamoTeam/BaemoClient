import React, { useEffect } from "react";
import styled from "styled-components";
import {
  OrderStatus,
  OrderHistory,
  OrderAddress,
} from "../components/status/index";
import { getMyOrders } from "../api";
import { useUserSeqState } from "../recoil/atom";
import { useNavigate } from "react-router-dom";

function Status() {
  const navigate = useNavigate();
  const { userSeq } = useUserSeqState();
  useEffect(() => {
    const fetchMyOrders = async () => {
      if (!userSeq) navigate("/login", { replace: true });
      try {
        const res = await getMyOrders(userSeq);
        console.log(res.data);
      } catch (err) {
        console.log(err.response);
        // throw new Error(`${err} - 내 주문목록 받아올떄 에러`);
      }
    };
    fetchMyOrders();
  }, []);

  return (
    <StWrap>
      <OrderStatus />
      <OrderHistory />
      <OrderAddress />
    </StWrap>
  );
}

const StWrap = styled.div`
  padding: 3.8rem 0;
`;

export default Status;
