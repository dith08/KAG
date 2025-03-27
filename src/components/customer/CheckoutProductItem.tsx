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
    <div className="grid grid-cols-4 items-center border-green-700 border rounded-lg p-4 mb-2 bg-white">
      <div className="flex items-center col-span-1">
        <img
          src={image || "/images/paperbag3.png"}
          alt={name}
          className="w-16 h-16 object-cover rounded mr-4"
        />
        <div className="font-semibold">{name}</div>
      </div>
      <div className="text-center">
        <div className="text-sm font-semibold">
          Rp. {price.toLocaleString()}
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-semibold">{quantity}</div>
      </div>
      <div className="text-center">
        <div className="font-semibold">
          Rp. {(price * quantity).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default CheckoutProductItem;
