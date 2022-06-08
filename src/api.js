import axios from "axios";

export const getOrders = (c_seq = 1) => axios.get(`/api/order/total/${c_seq}`);

export const getAllChattingRoom = () => axios.get(`/api/chatroom`);

export const getAllMenuByRestaurant = (r_seq) => axios.get(`/api/restaurant/${r_seq}/menu`);

export const getDetailMenuByMenuId = (m_seq) => axios.get(`/api/menu/${m_seq}`)