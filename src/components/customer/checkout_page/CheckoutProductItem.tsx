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
    <div className="grid md:grid-cols-[3fr_1fr_1fr_1fr] grid-cols-1 border border-black/50 rounded-lg p-3 sm:p-4 bg-white gap-2 items-center">
      {/* Produk */}
      <div className="flex items-center gap-3">
        <img
          src={image || "/images/paperbag3.png"}
          alt={name}
          className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded"
        />
        <div className="font-semibold text-sm sm:text-base">{name}</div>
      </div>

      {/* Mobile: Harga & Jumlah ditumpuk */}
      <div className="flex flex-col md:hidden gap-1.5">
        <div>
          <div className="text-sm text-black/50 font-medium">Harga Satuan:</div>
          <div className="text-sm sm:text-base font-semibold">
            Rp. {price.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-sm text-black/50 font-medium">Jumlah:</div>
          <div className="text-sm sm:text-base font-semibold">{quantity}</div>
        </div>
      </div>

      {/* Desktop: Harga */}
      <div className="hidden md:block text-center">
        <div className="text-sm sm:text-base font-semibold">
          Rp. {price.toLocaleString()}
        </div>
      </div>

      {/* Desktop: Jumlah */}
      <div className="hidden md:block text-center">
        <div className="text-sm sm:text-base font-semibold">{quantity}</div>
      </div>

      {/* Subtotal */}
      <div className="text-start md:text-center">
        <div className="md:hidden text-sm text-black/50 font-medium">
          Subtotal:
        </div>
        <div className="text-sm sm:text-base font-semibold">
          Rp. {(price * quantity).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default CheckoutProductItem;