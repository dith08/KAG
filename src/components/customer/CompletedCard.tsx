import { useState } from "react";
import { Order } from "./Types";
import BaseOrderCard from "./BaseOrderCard";
import { Icon } from "@iconify/react";
import ReviewModal from "./ReviewModal";

interface CompletedCardProps {
  order: Order;
}

const CompletedCard: React.FC<CompletedCardProps> = ({ order }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Status indicator (ikon centang di pojok kanan atas)
  const statusIndicator = (
    <div className="absolute top-0 right-0 bg-green-700 text-white p-2 rounded-bl-lg rounded-tr-lg">
      <Icon icon="icon-park-solid:correct" width={18} height={18} />
    </div>
  );

  // Action section (responsif: stacked di mobile, sejajar di desktop)
  const actionSection = (
    <div className="p-3 sm:p-4 md:p-6 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
      <div className="text-gray-600 flex items-center mb-3 md:hidden text-sm">
        Total Pesanan:
        <span className="text-green-700 font-medium text-base ml-2">
          Rp. {order.totalPrice.toLocaleString("id-ID")}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <button
          className="bg-yellow-500 text-white px-4 sm:px-5 md:px-6 py-2 md:py-3 rounded-lg text-sm font-medium cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          Beri Ulasan
        </button>
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <button className="border-2 border-black/50 text-black px-4 sm:px-5 md:px-6 py-2 md:py-3 rounded-lg text-sm font-medium cursor-pointer">
          Beli Lagi
        </button>
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

  return (
    <BaseOrderCard
      order={order}
      statusIndicator={statusIndicator}
      actionSection={actionSection}
    />
  );
};

export default CompletedCard;
