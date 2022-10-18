export default function parseMenu(menuList) {
  const result = [];
  let tmp = {};
  for (let menu of menuList) {
    if (tmp[menu.menu_seq]) {
      // console.log(tmp[menu.menu_seq].count)
      // console.log(menu.count)
      tmp[menu.menu_seq].count++;
      // tmp[menu.menu_seq].price += menu.price;
    } else {
      tmp[menu.menu_seq] = menu;
    }
    console.log("*", tmp)
  }

  return result;
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