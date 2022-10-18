import { MenuModel } from "./menu";

export interface ChatMsgModel {
  sender: String;
  roomNum: Number;
  basketMenuList: MenuModel[]; 
} 

