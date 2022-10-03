export interface MenuModel {
  category: string;
  count: number;
  img: string;
  name: string;
  price: number;
  restaurant_seq: number;
  seq: number;
}

// *********************
// 세부메뉴 api 필요
// *********************

interface SideMenuModel {
  side_menu_seq: number;
  name: string;
  price: number;
  checked: boolean;
}

interface MenuDetailModel {
  menu_seq: number;
  side_menu: SideMenuModel[];
}
