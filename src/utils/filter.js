export function filterSameMenu(menus) {
  const tmp = {};
  menus.forEach((menu) => {
    const key = menu.name;
    if (!tmp[key]) {
      tmp[key] = menu;
    } else {
      tmp[key].count += menu.count;
    }
  });
  return Object.keys(tmp).map((menu) => tmp[menu]);
}
