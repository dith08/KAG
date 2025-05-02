import React, { useState } from "react";
import { Eye } from "lucide-react";

type OrderCardProps = {
  id: number;
  image: string;
  title: string;
  variant: string;
  quantity: string;
  price: string;
  design: string;
  buyer: string;
  address: string;
  status: string;
  note: string;
  payment: string;
  onView: () => void;
  onStatusChange: (newStatus: string) => void;
  onPaymentChange: (newPayment: string) => void;
  onSave: () => void;
  isActive?: boolean; // Tambahan: card ini sedang aktif
};

const OrderCard: React.FC<OrderCardProps> = ({
  id,
  image,
  title,
  variant,
  quantity,
  price,
  design,
  buyer,
  address,
  status,
  note,
  payment,
  onView,
  onStatusChange,
  onPaymentChange,
  onSave,
  isActive = false, // default false
}) => {
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(payment === "Lunas");
  const [currentStatus, setCurrentStatus] = useState(status);
  const [currentPayment, setCurrentPayment] = useState(payment);

  const handlePaymentChange = (newPayment: string) => {
    setCurrentPayment(newPayment);
    onPaymentChange(newPayment);
    if (newPayment === "Lunas") {
      setIsPaymentConfirmed(true);
    }
  };

  const handleStatusChange = (newStatus: string) => {
    setCurrentStatus(newStatus);
    onStatusChange(newStatus);
  };

  return (
    <div className="rounded-xl overflow-hidden shadow border relative">
      {/* Bagian atas */}
      <div className="bg-[#FDD47D] px-6 py-4 flex flex-col sm:flex-row gap-4 items-start">
        <img src={image} alt={title} className="w-20 h-20 object-cover rounded" />
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-5 gap-2 text-sm">
          <div className="col-span-1 sm:col-span-2">
            <h2 className="text-base font-semibold underline">{title}</h2>
            <p className="text-gray-800">Variasi</p>
            <p className="text-gray-700">{variant}</p>
          </div>
          <p className="col-span-1 self-center">{quantity}</p>
          <p className="col-span-1 self-center">{price}</p>
          <div className="col-span-1 self-center">
            <p className="text-sm">Desain</p>
            <button className="bg-gray-200 px-2 py-1 rounded text-sm font-medium">{design}</button>
          </div>
        </div>
      </div>

      {/* Bagian bawah */}
      <div className="bg-[#FDC264] px-6 py-3 grid grid-cols-2 sm:grid-cols-6 gap-2 text-sm items-center">
        <div>
          <p className="font-medium">Pembeli</p>
          <p>{buyer}</p>
        </div>
        <div>
          <p className="font-medium">Alamat</p>
          <p>{address}</p>
        </div>
        <div>
          <p className="font-medium">Status</p>
          <select
            value={currentStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="bg-[#EADFB4] rounded px-2 py-1 text-sm"
            disabled={isPaymentConfirmed && currentStatus !== "Selesai"}
          >
            <option>Belum Diproses</option>
            <option>Diproses</option>
            <option>Dikirim</option>
            <option>Selesai</option>
          </select>
        </div>
        <div>
          <p className="font-medium">Catatan</p>
          <p>{note}</p>
        </div>
        <div>
          <p className="font-medium">Pembayaran</p>
          <p>{currentPayment}</p>
        </div>
        <div className="flex justify-end items-center">
          <button onClick={onView} className="text-black">
            <Eye size={20} />
          </button>
        </div>
      </div>

      {/* Tombol Save mengambang hanya saat isActive true */}
      <div className="fixed bottom-10 right-10 z-50">
        <button
          onClick={() => console.log("Saved all")}
          className="bg-green-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-green-700 transition">
           Save Change
        </button>
      </div>

    </div>
  );
};

export default OrderCard;
