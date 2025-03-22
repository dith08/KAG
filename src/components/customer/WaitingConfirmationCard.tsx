import React from "react";
import { Order, PaymentStatus } from "./Types";
import BaseOrderCard from "./BaseOrderCard";

interface WaitingConfirmationCardProps {
  order: Order;
}

const WaitingConfirmationCard: React.FC<WaitingConfirmationCardProps> = ({
  order,
}) => {
  const isPaid = order.paymentStatus === PaymentStatus.PAID;

  // Status indicator
  const statusIndicator = isPaid ? (
    <div className="bg-green-700 text-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm mr-3 sm:mr-10 font-medium rounded-b-lg">
      Sudah Dibayar
    </div>
  ) : (
    <div className="bg-yellow-500 text-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm mr-3 sm:mr-10 font-medium rounded-b-lg">
      Belum Dibayar
    </div>
  );

  // Action section
  const actionSection = (
    <div className="p-3 sm:p-4 md:p-6 flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
      <div className="text-gray-600 flex items-center md:hidden text-sm">
        Total Pesanan:
        <span className="text-green-600 font-medium text-base ml-2">
          Rp. {order.totalPrice.toLocaleString("id-ID")}
        </span>
      </div>

      {/* Tombol Menunggu Konfirmasi / Bayar Sekarang */}
      {isPaid ? (
        <div className="bg-gray-500 text-white px-4 sm:px-5 md:px-6 py-2 md:py-3 rounded-lg font-medium text-xs sm:text-sm text-center">
          Menunggu Konfirmasi
        </div>
      ) : (
        <button className="bg-yellow-500 text-white px-4 sm:px-5 md:px-6 py-2 md:py-3 rounded-lg font-medium text-xs sm:text-sm text-center">
          Bayar sekarang
        </button>
      )}

      {/* Total Pesanan desktop */}
      <div className="text-gray-600 hidden md:flex items-center">
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

export default WaitingConfirmationCard;
