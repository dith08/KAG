import React from "react";
import { Order, OrderStatus } from "./Types";
import CompletedCard from "./CompletedCard";
import ProcessingCard from "./ProcessingCard";
import ShippedCard from "./ShippedCard";
import WaitingConfirmationCard from "./WaitingConfirmationCard";

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  if (orders.length === 0) {
    return <div className="text-center p-4">No orders found</div>;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        switch (order.status) {
          case OrderStatus.WAITING_CONFIRMATION:
            return <WaitingConfirmationCard key={order.id} order={order} />;
          case OrderStatus.PROCESSING:
            return <ProcessingCard key={order.id} order={order} />;
          case OrderStatus.SHIPPED:
            return <ShippedCard key={order.id} order={order} />;
          case OrderStatus.COMPLETED:
            return <CompletedCard key={order.id} order={order} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default OrderList;
