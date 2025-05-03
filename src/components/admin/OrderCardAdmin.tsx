import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

interface Order {
  id: string;
  user_id: string;
  total_harga: number;
  status: string;
  metode_pembayaran: string;
  metode_pengiriman: string;
  alamat_pengiriman: string;
  nomor_resi: string;
  catatan: string;
}

const OrderCardAdmin = ({ order }: { order: Order }) => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/admin/pesanan/${order.id}`, { state: order });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-200 mb-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <div className="space-y-2 text-gray-700">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:identifier" className="text-green-600" />
            <span className="font-semibold">ID Pesanan:</span> {order.id}
          </div>
          <div className="flex items-center gap-2">
            <Icon icon="mdi:account" className="text-green-600" />
            <span className="font-semibold">User ID:</span> {order.user_id}
          </div>
          <div className="flex items-center gap-2">
            <Icon icon="mdi:cash" className="text-green-600" />
            <span className="font-semibold">Total:</span> Rp{" "}
            {order.total_harga.toLocaleString()}
          </div>
          <div className="flex items-center gap-2">
            <Icon icon="mdi:progress-check" className="text-green-600" />
            <span className="font-semibold">Status:</span> {order.status}
          </div>
          <div className="flex items-center gap-2">
            <Icon icon="mdi:credit-card" className="text-green-600" />
            <span className="font-semibold">Pembayaran:</span>{" "}
            {order.metode_pembayaran}
          </div>
          <div className="flex items-center gap-2">
            <Icon icon="mdi:truck-delivery" className="text-green-600" />
            <span className="font-semibold">Pengiriman:</span>{" "}
            {order.metode_pengiriman}
          </div>
        </div>

        <div className="mt-4 lg:mt-0 flex flex-col items-end gap-2">
          <button
            onClick={handleEditClick}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md shadow transition"
          >
            <Icon icon="mdi:pencil" />
            Edit Status
          </button>
          <div className="text-sm text-gray-500 italic">
            <Icon icon="mdi:barcode" className="inline mr-1" />
            Resi: {order.nomor_resi || "-"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCardAdmin;
