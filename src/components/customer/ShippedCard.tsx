import React from "react";
import { Order } from "./Types";
import BaseOrderCard from "./BaseOrderCard";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ShippedCardProps {
  order: Order;
}

const ShippedCard: React.FC<ShippedCardProps> = ({ order }) => {
  // Action section
  const actionSection = (
    <div className="p-6 border-b border-gray-200 flex justify-between items-center">
      <div className="flex items-center">
        <Icon
          icon="streamline:transfer-motorcycle-solid"
          className="text-green-700 text-xl mr-2"
        />
        <span className="text-black">
          Dikirim Hari Ini, perkiraan sampai{" "}
          <span className="text-green-700 font-medium">
            {order.deliveryEstimate}
          </span>
        </span>
      </div>
      <div className="text-gray-600 flex items-center">
        Total Pesanan:
        <span className="text-green-700 font-medium text-lg ml-2">
          Rp. {order.totalPrice.toLocaleString("id-ID")}
        </span>
      </div>
    </div>
  );

  return <BaseOrderCard order={order} actionSection={actionSection} />;
};

export default ShippedCard;
