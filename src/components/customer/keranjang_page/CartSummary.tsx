import React from "react";
import { Icon } from "@iconify/react";
import { Product } from "./CartItem";

interface CartSummaryProps {
  products: Product[];
  checkedItems: number[];
  onCheckout: () => void;
  isLoading?: boolean;
  hasUnsavedChanges?: boolean;
  onSelectAll: (isChecked: boolean) => void;
  isAllChecked: boolean;
  footerHeight?: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  products,
  checkedItems,
  onCheckout,
  isLoading = false,
  onSelectAll,
  isAllChecked,
  footerHeight = 0,
}) => {
  console.log("CartSummary footerHeight:", footerHeight); // Debugging
  const checkedProducts = products.filter((product) =>
    checkedItems.includes(product.id)
  );

  const totalItems = checkedProducts.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  const totalPrice = checkedProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  const hasInvalidQuantities = checkedProducts.some(
    (product) => product.quantity < 100
  );

  return (
    <div
      className="bg-white border-t border-gray-200 shadow-lg fixed left-0 right-0"
      style={{ bottom: `${footerHeight}px`, zIndex: 20 }}
    >
      <div className="container mx-auto px-4 md:px-10 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Summary Info */}
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-5 w-5 accent-green-700 cursor-pointer mr-3"
                checked={isAllChecked}
                onChange={(e) => onSelectAll(e.target.checked)}
              />
              <span className="text-sm font-medium">Pilih Semua</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon icon="mdi:cart" className="text-green-700 text-xl" />
              <span className="text-sm text-gray-600">
                {checkedProducts.length} Produk ({totalItems.toLocaleString()}{" "}
                Item)
              </span>
            </div>

            {hasInvalidQuantities && (
              <div className="flex items-center space-x-2 text-red-600">
                <Icon icon="mdi:alert-circle" className="text-lg" />
                <span className="text-sm">Minimum 100 item per produk</span>
              </div>
            )}
          </div>

          {/* Total & Checkout */}
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Belanja:</p>
              <p className="text-lg font-bold text-green-700">
                Rp. {totalPrice.toLocaleString()}
              </p>
            </div>

            <button
              onClick={onCheckout}
              disabled={
                isLoading ||
                hasInvalidQuantities ||
                checkedProducts.length === 0
              }
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                isLoading ||
                hasInvalidQuantities ||
                checkedProducts.length === 0
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-green-700 text-white hover:bg-green-800 active:bg-green-900 cursor-pointer"
              }`}
            >
              {isLoading ? (
                <>
                  <Icon
                    icon="eos-icons:loading"
                    className="text-xl animate-spin"
                  />
                  <span>Memproses...</span>
                </>
              ) : (
                <>
                  <Icon icon="mdi:credit-card" className="text-xl" />
                  <span>Checkout</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
