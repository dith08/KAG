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
        <div className="absolute top-0 right-0 z-10">{statusIndicator}</div>
      )}

      <div className="p-3 sm:p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-3 sm:mb-0">
            <img
              src="/images/paperbag3.png"
              alt="Product"
              className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 object-contain mr-3 md:mr-4"
            />
            <div>
              <h3 className="text-base sm:text-md md:text-lg font-medium">
                {order.product}
              </h3>
            </div>
          </div>
          <div className="text-right mt-2 sm:mt-0">
            <span className="font-medium text-sm md:text-base">
              {formatPrice(order.price)}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 mx-3 sm:mx-4 md:mx-6"></div>

      <div className="px-0 sm:px-0 md:px-0">{actionSection}</div>
    </div>
  );
};

export default BaseOrderCard;
