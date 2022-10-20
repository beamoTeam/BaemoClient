import groupOrderService from "../GroupOrderService";
import useLocalStorage from "../../../hooks/useLocalStorage";

export default async function enterToGroup(
  c_seq: string,
  restaurant_seq: string
) {
  try {
    const res = await groupOrderService.enterGroup(c_seq);
    console.log(res.data);
    useLocalStorage.set("CHAT_SEQ", c_seq);
  } catch (err: any) {
    if (err.response.status === 400) {
      alert(err.response.data);
    } else if (err.response.status === 401) {
      alert("로그인후 이용해 주세요.");
    }
  }
}
