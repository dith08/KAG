import React from "react";

interface CheckoutProductItemProps {
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const CheckoutProductItem: React.FC<CheckoutProductItemProps> = ({
  name,
  price,
  quantity,
  image,
}) => {
  return (
    <div className="grid md:grid-cols-4 grid-cols-1 border border-green-700 rounded-lg p-4 mb-2 bg-white gap-2 items-center">
      {/* Produk */}
      <div className="flex items-center gap-4">
        <img
          src={image || "/images/paperbag3.png"}
          alt={name}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="font-semibold text-sm">{name}</div>
      </div>

      {/* Mobile: Harga & Jumlah dijadikan satu row */}
      <div className="flex justify-start md:hidden gap-x-26 w-full mb-4">
        {/* Harga */}
        <div className="text-start">
          <div className="text-xs text-black/50 font-medium mb-1">
            Harga Satuan:
          </div>
          <div className="text-sm font-semibold">
            Rp. {price.toLocaleString()}
          </div>
        </div>

        {/* Jumlah */}
        <div className="text-start">
          <div className="text-xs text-black/50 font-medium mb-1">Jumlah:</div>
          <div className="text-sm font-semibold">{quantity}</div>
        </div>
      </div>

      {/* Desktop: Harga */}
      <div className="hidden md:block text-center">
        <div className="text-sm font-semibold">
          Rp. {price.toLocaleString()}
        </div>
      </div>

      {/* Desktop: Jumlah */}
      <div className="hidden md:block text-center">
        <div className="text-sm font-semibold">{quantity}</div>
      </div>

      {/* Subtotal (Tetap sendiri) */}
      <div className="text-start md:text-center">
        <div className="md:hidden text-xs text-black/50 font-medium mb-1">
          Subtotal:
        </div>
        <div className="text-sm font-semibold">
          Rp. {(price * quantity).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default CheckoutProductItem;
