import axios from "axios";

// BASKET
export function getCartByUser(u_seq, c_seq) {
  return axios.get(`/api/basket/${u_seq}/${c_seq}`);
}

export function addMenuToCart(u_seq, c_seq, data) {
  return axios.post(`/api/basket/${u_seq}/${c_seq}`, data);
}

// CHATTING
export function getAllChattingRoom() {
  return axios.get(`/api/chatroom`);
}

export function getAllChattingRoomByAddress(data) {
  return axios.post(`/api/chatroom`, data);
}


export function makeNewGroup(u_seq, data) {
  return axios.post(`/api/chatroom/${u_seq}`, data)
}

export function enterChattingRoom(u_seq, c_seq) {
  return axios.post(`/api/chatroom/${u_seq}/${c_seq}`);
}

// MENU
export function getDetailMenuByMenuId(m_seq) {
  return axios.get(`/api/menu/${m_seq}`);
}

// ORDER
/////////////////////
// 유저번호로 주문 조회 //
/////////////////////
export function getMyOrders(u_seq) {
  return axios.get(`/api/order/${u_seq}`);
}

export function postOrder(u_seq, c_seq) {
  return axios.post(`/api/order/${u_seq}/${c_seq}`);
}

///////////////////////
// 음식점 번호로 주문 조회 //
///////////////////////
export function getOrderHistoryByRestaurantId(r_seq) {
  return axios.get(`/api/order/restaurant/${r_seq}`);
}

export function getOrdersForRestaurant(r_seq) {
  return axios.get(`/api/order/total/${12}`)
}

// RESTAURANT
export function getAllRestaurant() {
  return axios.get(`/api/restaurant`)
}

export function getAllMenuByRestaurant(r_seq) {
  return axios.get(`/api/restaurant/${r_seq}/menu`);
}


// 사용자 전체 출력
// GET /api/user