import React from "react";
import { Order } from "./Types";
import BaseOrderCard from "./BaseOrderCard";
import { Icon } from "@iconify/react";

interface CompletedCardProps {
  order: Order;
}

const CompletedCard: React.FC<CompletedCardProps> = ({ order }) => {
  // Status indicator (ikon centang di pojok kanan atas)
  const statusIndicator = (
    <div className="absolute top-0 right-0 bg-green-700 text-white p-2 rounded-bl-lg rounded-tr-lg">
      <Icon icon="icon-park-solid:correct" width={18} height={18} />
    </div>
  );

  // Action section (sejajar dalam satu baris)
  const actionSection = (
    <div className="p-6 flex justify-between items-center">
      <div className="flex space-x-2">
        <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg text-sm font-medium cursor-pointer">
          Beri Ulasan
        </button>
        <button className="border-2 border-black/50 text-black px-6 py-3 rounded-lg text-sm font-medium cursor-pointer">
          Beli Lagi
        </button>
      </div>
      <div className="text-gray-600 flex items-center">
        Total Pesanan:
        <span className="text-green-600 font-medium text-lg ml-2">
          Rp. {order.totalPrice.toLocaleString("id-ID")}
        </span>
      </div>
    </div>
  );

  return (
    <BaseOrderCard
      order={order}
      statusIndicator={statusIndicator}
      actionSection={actionSection}
    />
  );
};

export default CompletedCard;
