import React, { ReactNode } from "react";
import { Order } from "./Types";

interface BaseOrderCardProps {
  order: Order;
  statusIndicator?: ReactNode;
  actionSection: ReactNode;
}

const BaseOrderCard: React.FC<BaseOrderCardProps> = ({
  order,
  statusIndicator,
  actionSection,
}) => {
  const formatPrice = (price: number) => {
    return `Rp. ${price.toLocaleString("id-ID")}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative mb-4 w-full">
      {statusIndicator && (
        <div className="absolute top-0 right-0">{statusIndicator}</div>
      )}

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/images/paperbag3.png"
              alt="Product"
              className="w-20 h-20 object-contain mr-4"
            />
            <div>
              <h3 className="text-lg font-medium">{order.product}</h3>
            </div>
          </div>
          <div className="text-right">
            <span className="font-medium">{formatPrice(order.price)}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 mx-6"></div>

      {actionSection}
    </div>
  );
};

export default BaseOrderCard;
