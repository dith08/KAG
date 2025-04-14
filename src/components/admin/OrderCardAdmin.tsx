// src/components/admin/OrderCard.tsx
import React from "react";
import { Eye } from "lucide-react";

interface OrderCardProps {
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
  onView?: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
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
}) => {
  return (
    <div className="bg-[#FFE082] rounded-lg p-4 shadow">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <img
            src={image}
            alt={title}
            className="w-20 h-20 object-cover rounded-md"
          />
          <div>
            <h2 className="font-bold text-lg">{title}</h2>
            <p className="text-sm">Variasi<br />{variant}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm">{quantity}</p>
          <p className="text-sm font-bold">{price}</p>
          <p className="text-sm text-blue-800 underline cursor-pointer">{design}</p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mt-4 text-sm">
        <div>
          <p className="text-gray-700 font-medium">Pembeli</p>
          <p>{buyer}</p>
        </div>
        <div>
          <p className="text-gray-700 font-medium">Alamat</p>
          <p>{address}</p>
        </div>
        <div>
          <p className="text-gray-700 font-medium">Status</p>
          <p>{status}</p>
        </div>
        <div>
          <p className="text-gray-700 font-medium">Catatan</p>
          <p>{note}</p>
        </div>
        <div>
          <p className="text-gray-700 font-medium">Pembayaran</p>
          <p>{payment}</p>
        </div>
      </div>

      <div className="flex justify-end mt-2">
        <button onClick={onView} className="text-gray-700 hover:text-black">
          <Eye size={20} />
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
