import axios from "axios";

export const getOrders = (c_seq=1) => axios.get(`/api/order/total/{c_seq}`);

