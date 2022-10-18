export interface MenuModel {
  seq: number;
  menu_seq?: number;
  category: string;
  name: string;
  img: string;
  price: number;
  restaurant_seq: number;
  count: number;
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
