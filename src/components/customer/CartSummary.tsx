import React from "react";
import { Product } from "./CartItem";

interface CartSummaryProps {
  products: Product[];
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ products, onCheckout }) => {
  const totalProducts = products.length;
  const totalPrice = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 bg-white rounded-t-lg shadow-md w-full sm:mt-20 border-t-2 border-gray-200">
      {/* Checkbox + Pilih Semua */}
      <div className="flex items-center w-full sm:w-auto mb-3 sm:mb-0 ">
        <input
          type="checkbox"
          className="mr-3 h-5 w-5 accent-green-700 cursor-pointer"
        />
        <span className="text-medium sm:text-md font-medium flex-1">
          Pilih Semua ({totalProducts})
        </span>
        <span className="text-medium sm:text-md text-green-700 cursor-pointer ml-4">
          Hapus
        </span>
      </div>

      {/* Total Harga & Checkout */}
      <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-auto justify-between">
        <div className="flex items-center mb-3 sm:mb-0">
          <span className="text-medium sm:text-md font-medium">
            Total ({totalProducts} produk):
          </span>
          <span className="text-medium sm:text-md text-green-600 font-medium ml-2">
            Rp. {totalPrice ? totalPrice.toLocaleString() : 0}
          </span>
        </div>

        <button
          className="w-full sm:w-auto px-6 py-2 bg-yellow-500 text-white rounded-md cursor-pointer ml-0 sm:ml-10"
          onClick={onCheckout}
          disabled={totalProducts === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
export type { CartSummaryProps };
