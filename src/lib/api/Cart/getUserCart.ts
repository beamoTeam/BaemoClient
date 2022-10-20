import cartService from "./CartApi";

export default async function getUserCart(room_seq: any): Promise<any> {
  try {
    const { data } = await cartService.fetchCartItems(room_seq);
    return data;
  } catch (err) {
    console.error(err);
  }
}