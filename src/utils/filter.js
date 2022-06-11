export function filterSameMenu(menus) {
  let tmp = {};
  menus.forEach((menu) => {
    let key = menu.name;
    if (!tmp[key]) {
      tmp[key] = menu;
    } else {
      let n = tmp[key].count + menu.count;
      tmp[key].count = n; // 여기서 read only 에러
    }
  });
  // console.log(Object.keys(tmp).map((menu) => tmp[menu]))
  return Object.keys(tmp).map((menu) => tmp[menu]);
}
