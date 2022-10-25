export default interface OrderHistoryModel {
  seq: number;
  totalAmount: number;
  totalStatus: number;
  payStatus: number;
  payMethod: string;
  payType: string;
  payAmount: number;
  payDatetime: string;
  createdDateTime: string;
  updatedDateTime: string;
}