export interface Group {
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

interface Restaurant {
  address: string;
  category: string;
  createdDateTime: string;
  deliveryPrice: number;
  img: string;
  latitude: number;
  longitude: number;
  maxMember: 4;
  name: string;
  phone: number;
  seq: number;
  updatedDateTime?: string;
}