import React, { useState, useEffect } from "react";
import { Header, Main } from "../components/restaurant/index";
import { useVisibility } from "../hook/useVisibility";
import { getOrdersForRestaurant, getOrderHistoryByRestaurantId } from "../api";
import { useParams } from "react-router-dom";
import "../components/restaurant/restaurant.css";

function Restaurant() {
  const { r_seq } = useParams();
  const [orders, setOrders] = useState([]);

  useVisibility();
  useEffect(() => {
    async function getOrders() {
      console.log('!!@#!@')
      try {
        const res = await getOrdersForRestaurant();
        console.log(res)
        console.log(res.data)
        setOrders(res.data);
      } catch (err) {
        console.log(err.response);
        // throw new Error(`${err} - 사장님 페이지 주문 받아올때 에러`);
      }
    }
    // getOrders();
    // fetchOrderHistoryByRestaurntId(r_seq);
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

async function fetchOrderHistoryByRestaurntId(r_seq) {
  try {
    const res = await getOrderHistoryByRestaurantId(r_seq);
    console.log("음식점 주문들");
    console.log(res.data);
  } catch (err) {
    throw new Error(`${err} - 음식점 번호로 주문 받을떄 에러`)
  }
}
export default Restaurant;
