import React from "react";
import { Order } from "./Types";
import BaseOrderCard from "./BaseOrderCard";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ProcessingCardProps {
  order: Order;
}

const ProcessingCard: React.FC<ProcessingCardProps> = ({ order }) => {
  // Action section
  const actionSection = (
    <div className="p-6 border-b border-gray-200 flex justify-between items-center">
      {/* Tahap Verifikasi */}
      <div className="flex items-center">
        <Icon
          icon="material-symbols:file-png"
          className="text-green-700 text-2xl mr-2"
        />
        <span className="mr-1 text-gray-700">Tahap:</span>
        <span className="text-black font-medium">{order.verificationStep}</span>
      </div>

      {/* Total Pesanan */}
      <div className="text-gray-600 flex items-center">
        Total Pesanan:
        <span className="text-green-600 font-medium text-lg ml-2">
          Rp. {order.totalPrice.toLocaleString("id-ID")}
        </span>
      </div>
    </div>
  );

  return <BaseOrderCard order={order} actionSection={actionSection} />;
};

export default ProcessingCard;
