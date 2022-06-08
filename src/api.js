import axios from "axios";

export function getOrders(c_seq = 1) {
  return axios.get(`/api/order/total/${c_seq}`);
}

export function getAllChattingRoom() {
  return axios.get(`/api/chatroom`);
}

export function getAllMenuByRestaurant(r_seq) {
  return axios.get(`/api/restaurant/${r_seq}/menu`);
}

export function getDetailMenuByMenuId(m_seq) {
  return axios.get(`/api/menu/${m_seq}`);
}

export function addMenuToCart(u_seq, c_seq, data) {
  return axios.post(`/api/basket/${u_seq}/${c_seq}`, data);
}

export function getCartByUser(u_seq, c_seq) {
  return axios.get(`/api/basket/${u_seq}/${c_seq}`);
}

export function postOrder(u_seq = 1, c_seq) {
  return axios.post(`/api/order/${u_seq}/${c_seq}`);
}
