export default function parseMenu(menuList) {
  let tmp = {};
  for (let menu of menuList) {
    if (tmp[menu.menu_seq]) {
      tmp[menu.menu_seq].count += menu.count;
      tmp[menu.menu_seq].price += (menu.price * menu.count);
    } else {
      tmp[menu.menu_seq] = { ...menu, price: menu.price * menu.count };
    }
  }
  return Object.values(tmp);
}

// [
//   {
//     menu_seq: "number",
//     name: "황금올리브",
//     img: "string",
//     price: "total Price",
//     count: "Count",
//     restaurant_sesq: "number",
//     category: "메인 메뉴",
//   },
//   {
//     menu_seq: "number",
//     name: "황금올리브",
//     img: "string",
//     price: "total Price",
//     count: "Count",
//     restaurant_sesq: "number",
//     category: "메인 메뉴",
//   }
// ]