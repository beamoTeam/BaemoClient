import { MenuModel } from "./menu";

export interface ChatMsgModel {
  sender: String;
  roomNum: Number;
  basketMenuList: MenuModel[]; 
} 

export interface MessageModel { 
  createdAt: string;
  id: string;
  msg: string;
  receiver: any;
  roomNum: number;
  sender: string;
}