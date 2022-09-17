export interface GroupModel {
  address: string;
  createDateTime: string;
  detail_address: string;
  latitude: number;
  longitude: number;
  maxPersonnel: number;
  name: string;
  orderTime: string;
  restaurant: Restaurant;
  seq: number;
  updatedDateTime?: string;
} 

interface RestaurantModel {
  address: string;
  category: string;
  createdDateTime: string;
  deliveryPrice: number;
  img: string;
  latitude: number;
  longitude: number;
  maxMember: number;
  name: string;
  phone: number;
  seq: number;
  updatedDateTime?: string;
}