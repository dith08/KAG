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
    <div className="p-3 sm:p-4 md:p-6 border-b border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center">
      {/* Total Pesanan di atas untuk mobile, tidak ditampilkan di desktop */}
      <div className="text-gray-600 flex items-center mb-3 md:hidden text-sm">
        Total Pesanan:
        <span className="text-green-700 font-medium text-base ml-2">
          Rp. {order.totalPrice.toLocaleString("id-ID")}
        </span>
      </div>

      <div className="flex items-start md:items-center">
        <Icon
          icon="streamline:transfer-motorcycle-solid"
          className="text-green-700 text-lg md:text-xl mr-2 md:mt-0"
        />
        <span className="text-black text-sm md:text-base">
          Dikirim Hari Ini, perkiraan sampai{" "}
          <span className="text-green-700 font-medium">
            {order.deliveryEstimate}
          </span>
        </span>
      </div>

      {/* Total Pesanan untuk desktop, disembunyikan di mobile */}
      <div className="text-gray-600 hidden md:flex items-center text-base">
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
