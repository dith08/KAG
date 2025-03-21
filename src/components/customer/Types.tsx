export enum OrderStatus {
  WAITING_CONFIRMATION = "WAITING_CONFIRMATION",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  COMPLETED = "COMPLETED",
}

export enum PaymentStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
}

export interface Order {
  id: string;
  product: string;
  price: number;
  quantity: number;
  totalPrice: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  deliveryEstimate: string;
  verificationStep: string;
}
