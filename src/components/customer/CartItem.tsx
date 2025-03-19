import React from "react";
import { Icon } from "@iconify/react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartItemProps {
  product: Product;
  onQuantityChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  product,
  onQuantityChange,
  onRemove,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center p-4 bg-white rounded-lg shadow-md mb-2 w-full border border-gray-200">
      {/* Mobile View Header (Only visible on mobile) */}
      <div className="flex justify-between items-center w-full md:hidden mb-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-5 w-5 accent-green-700 cursor-pointer mr-3"
          />
          <span className="font-medium">{product.name}</span>
        </div>
        <button
          className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm cursor-pointer"
          onClick={() => onRemove(product.id)}
        >
          Hapus
        </button>
      </div>

      {/* Desktop Checkbox (Hidden on mobile) */}
      <div className="hidden md:block w-5 mr-5 flex-shrink-0">
        <input
          type="checkbox"
          className="h-5 w-5 accent-green-700 cursor-pointer"
        />
      </div>

      {/* Product Info */}
      <div className="flex items-center w-full md:w-auto md:flex-1">
        <div className="relative w-18 h-18">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="ml-4 text-sm font-medium hidden md:block">
          {product.name}
        </span>
      </div>

      {/* Price, Quantity, Total - Mobile */}
      <div className="grid grid-cols-2 gap-4 w-full mt-4 md:hidden">
        <div>
          <p className="text-sm text-black/50">Harga Satuan:</p>
          <p className="font-medium">Rp. {product.price.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-black/50">Total Harga:</p>
          <p className="font-medium text-green-600">
            Rp. {(product.price * product.quantity).toLocaleString()}
          </p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-black/50 mb-1">Jumlah:</p>
          <div className="flex items-center">
            <button
              className="w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-l-md cursor-pointer"
              onClick={() =>
                onQuantityChange(product.id, Math.max(1, product.quantity - 1))
              }
            >
              <Icon icon="lucide:minus" />
            </button>
            <span className="w-10 h-8 flex items-center justify-center bg-white border-t border-b border-gray-300">
              {product.quantity}
            </span>
            <button
              className="w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-r-md cursor-pointer"
              onClick={() => onQuantityChange(product.id, product.quantity + 1)}
            >
              <Icon icon="lucide:plus" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop View - Price, Quantity, Total (Hidden on mobile) */}
      <div className="hidden md:block w-32 text-center">
        <span className="text-medium">
          Rp. {product.price.toLocaleString()}
        </span>
      </div>
      <div className="hidden md:block w-32 text-center">
        <div className="w-32 flex justify-center items-center">
          <button
            className="w-8 h-8 flex items-center justify-center bg-green-700 text-white border border-green-700 rounded-l-md cursor-pointer"
            onClick={() =>
              onQuantityChange(product.id, Math.max(1, product.quantity - 1))
            }
          >
            <Icon icon="lucide:minus" />
          </button>
          <span className="w-10 h-8 flex items-center justify-center border border-green-700 text-sm">
            {product.quantity}
          </span>
          <button
            className="w-8 h-8 flex items-center justify-center bg-green-700 text-white border border-green-700 rounded-r-md cursor-pointer"
            onClick={() => onQuantityChange(product.id, product.quantity + 1)}
          >
            <Icon icon="lucide:plus" />
          </button>
        </div>
      </div>
      <div className="hidden md:block w-32 text-center">
        <span className="text-medium text-green-600 font-medium">
          Rp. {(product.price * product.quantity).toLocaleString()}
        </span>
      </div>
      <div className="hidden md:block w-32 text-center">
        <button
          className="px-4 py-1 bg-yellow-500 text-white rounded-md cursor-pointer"
          onClick={() => onRemove(product.id)}
        >
          Hapus
        </button>
      </div>
    </div>
  );
};

export default CartItem;
export type { Product, CartItemProps };
