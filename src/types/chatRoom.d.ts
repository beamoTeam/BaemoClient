import RestaurantModel from "./restaurant";

export type ChatRoomModel = {
  seq: number;
  chatInfo: ChatInfoModel;
}

export type ChatInfoModel = {
  seq: number;
  address: string; 
  createdDateTime: string;
  detail_address: string;
  latitude: any;
  longitude: any;
  name: string;
  orderTime: string;
  restaurant: RestaurantModel;
  updatedDateTime: string;
}