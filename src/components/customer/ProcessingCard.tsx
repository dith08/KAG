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
    <div className="p-3 sm:p-4 md:p-6 border-b border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center">
      {/* Total Pesanan di atas untuk mobile, tidak ditampilkan di desktop */}
      <div className="text-gray-600 flex items-center mb-3 md:hidden text-sm">
        Total Pesanan:
        <span className="text-green-600 font-medium text-base ml-2">
          Rp. {order.totalPrice.toLocaleString("id-ID")}
        </span>
      </div>

      {/* Tahap Verifikasi */}
      <div className="flex items-center">
        <Icon
          icon="material-symbols:file-png"
          className="text-green-700 text-xl md:text-2xl mr-2"
        />
        <span className="mr-1 text-gray-700 text-sm md:text-base">Tahap:</span>
        <span className="text-black font-medium text-sm md:text-base">
          {order.verificationStep}
        </span>
      </div>

      {/* Total Pesanan untuk desktop, disembunyikan di mobile */}
      <div className="text-gray-600 hidden md:flex items-center text-base">
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
