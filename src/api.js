import axios from "axios";

export const getOrders = (c_seq = 1) => axios.get(`/api/order/total/${c_seq}`);

export const getAllChattingRoom = () => axios.get(`/api/chatroom`);

export const getAllMenuByRestaurant = (r_seq=1) => axios.get(`/api/restaurant/${r_seq}/menu`);
