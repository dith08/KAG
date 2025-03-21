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
    <div className="bg-green-700 text-white px-4 py-2 text-sm mr-10 font-medium rounded-b-lg">
      Sudah Dibayar
    </div>
  ) : (
    <div className="bg-yellow-500 text-white px-4 py-2 text-sm mr-10 font-medium rounded-b-lg">
      Belum Dibayar
    </div>
  );

  // Action section
  const actionSection = (
    <div className="p-6 flex justify-between items-center">
      {/* Tombol Menunggu Konfirmasi / Bayar Sekarang */}
      {isPaid ? (
        <div className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium text-sm">
          Menunggu Konfirmasi
        </div>
      ) : (
        <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-medium text-sm">
          Bayar sekarang
        </button>
      )}

      {/* Total Pesanan */}
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

export default WaitingConfirmationCard;
