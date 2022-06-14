import React, { useState, useEffect, useRef } from "react";
import { Header, Main } from "../components/restaurant/index";
import { useVisibility } from "../hook/useVisibility";
import { getOrdersForRestaurant } from "../api";
import { useParams } from "react-router-dom";
import "../components/restaurant/restaurant.css";

function Restaurant() {
  const { r_seq } = useParams();
  const [orders, setOrders] = useState(null);
  const ordersRef = useRef(null);

  useVisibility();
  useEffect(() => {
    async function getOrders() {
      console.log("Fetch was executed.");
      try {
        const res = await getOrdersForRestaurant(r_seq);
        if (ordersRef.current === res.data) return;
        console.log("Data updated.")
        ordersRef.current = res.data;
        setOrders(res.data);
      } catch (err) {
        console.log(err.response);
      }
    }
    let id = setInterval(getOrders, 2000);
    return () => clearInterval(id);
  }, [r_seq]);

  if (!orders) return <h1>로딩중..</h1>
  return (
    <>
      <Header />
      <Main orders={orders} />
    </>
  );
}

export default Restaurant;