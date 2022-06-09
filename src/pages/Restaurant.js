import React, { useState, useEffect } from "react";
import { Header, Main } from "../components/restaurant/index";
import { useVisibility } from "../hook/useVisibility";
import { getOrdersForRestaurant } from "../api";
import "../components/restaurant/restaurant.css";

function Restaurant() {
  const [orders, setOrders] = useState([]);

  useVisibility();
  useEffect(() => {
    async function getOrders() {
      console.log('!!@#!@')
      try {
        const res = await getOrdersForRestaurant();
        setOrders(res.data);
      } catch (err) {
        throw new Error(`${err} - 사장님 페이지 주문 받아올때 에러`);
      }
    }
    // getOrders();
    setInterval(getOrders, 2000);
  }, []);

  if (orders.length === 0 || !orders) return <h1>로딩중..</h1>
  return (
    <>
      <Header />
      <Main orders={orders} />
    </>
  );
}

export default Restaurant;
