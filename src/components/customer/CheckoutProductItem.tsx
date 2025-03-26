// components/checkout/CheckoutProductItem.tsx
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
    <div className="flex items-center border rounded-lg p-4 mb-2">
      <div className="mr-4">
        <img
          src={image || "/images/paperbag3.png"}
          alt={name}
          className="w-16 h-16 object-cover rounded"
        />
      </div>
      <div className="flex-grow">
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-gray-600">
          Rp. {price.toLocaleString()} x {quantity}
        </div>
      </div>
      <div className="font-semibold">
        Rp. {(price * quantity).toLocaleString()}
      </div>
    </div>
  );
};

export default CheckoutProductItem;
