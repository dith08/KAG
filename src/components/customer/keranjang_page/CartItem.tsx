import React, { useState } from "react";
import { Icon } from "@iconify/react";
import ConfirmPopup from "../../ConfirmPopup";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  product_id?: number;
}

interface CartItemProps {
  product: Product;
  onQuantityChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  onCheckChange: (id: number, isChecked: boolean) => void;
  isChecked: boolean; // Tambah prop untuk status checkbox
}

const CartItem: React.FC<CartItemProps> = ({
  product,
  onQuantityChange,
  onRemove,
  onCheckChange,
  isChecked,
}) => {
  const MINIMUM_QUANTITY = 1000;
  const MAXIMUM_QUANTITY = 10000;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleQuantityDecrease = () => {
    const newQuantity = Math.max(MINIMUM_QUANTITY, product.quantity - 1);
    onQuantityChange(product.id, newQuantity);
  };

  const handleQuantityIncrease = () => {
    const newQuantity = Math.min(MAXIMUM_QUANTITY, product.quantity + 1);
    onQuantityChange(product.id, newQuantity);
  };

  const handleConfirm = () => {
    if (selectedId !== null) {
      onRemove(selectedId);
    }
    setIsPopupOpen(false);
  };

  const handleCancel = () => {
    console.log("Cancelled!");
    setIsPopupOpen(false);
  };

  const handleOpenPopup = (id: number) => {
    setSelectedId(id);
    setIsPopupOpen(true);
  };

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckChange(product.id, e.target.checked);
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center p-4 bg-white rounded-lg shadow-md mb-2 w-full border border-gray-200">
      <div className="flex justify-between items-center w-full md:hidden mb-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-5 w-5 accent-green-700 cursor-pointer mr-3"
            checked={isChecked}
            onChange={handleCheckChange}
          />
          <span className="font-medium">{product.name}</span>
        </div>
        <button
          className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm cursor-pointer hover:bg-yellow-600 transition-colors"
          onClick={() => handleOpenPopup(product.id)}
        >
          Hapus
        </button>
      </div>

      <div className="hidden md:block w-5 mr-5 flex-shrink-0">
        <input
          type="checkbox"
          className="h-5 w-5 accent-green-700 cursor-pointer"
          checked={isChecked}
          onChange={handleCheckChange}
        />
      </div>

      <div className="flex items-center w-full md:w-auto md:flex-1">
        <div className="relative w-18 h-18">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/images/default-product.png";
            }}
          />
        </div>
        <span className="ml-4 text-sm font-medium hidden md:block">
          {product.name}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full mt-4 md:hidden">
        <div>
          <p className="text-sm text black/50">Harga Satuan:</p>
          <p className="font-medium">
            Rp. {Math.floor(product.price).toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-black/50">Total Harga:</p>
          <p className="font-medium text-green-600">
            Rp. {(product.price * product.quantity).toLocaleString()}
          </p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-black/50 mb-1">
            Jumlah (Min. {MINIMUM_QUANTITY}):
          </p>
          <div className="flex items-center">
            <button
              className={`w-8 h-8 flex items-center justify-center text-white rounded-l-md transition-colors ${
                product.quantity <= MINIMUM_QUANTITY
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 cursor-pointer hover:bg-green-700"
              }`}
              onClick={handleQuantityDecrease}
              disabled={product.quantity <= MINIMUM_QUANTITY}
            >
              <Icon icon="lucide:minus" />
            </button>
            <span className="w-16 h-8 flex items-center justify-center bg-white border-t border-b border-gray-300 text-sm">
              {product.quantity}
            </span>
            <button
              className={`w-8 h-8 flex items-center justify-center text-white rounded-r-md transition-colors ${
                product.quantity >= MAXIMUM_QUANTITY
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 cursor-pointer hover:bg-green-700"
              }`}
              onClick={handleQuantityIncrease}
              disabled={product.quantity >= MAXIMUM_QUANTITY}
            >
              <Icon icon="lucide:plus" />
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:block w-32 text-center">
        <span className="text-medium">
          Rp. {Math.floor(product.price).toLocaleString()}
        </span>
      </div>
      <div className="hidden md:block w-32 text-center">
        <div className="w-32 flex justify-center items-center">
          <button
            className={`w-8 h-8 flex items-center justify-center text-white border rounded-l-md transition-colors ${
              product.quantity <= MINIMUM_QUANTITY
                ? "bg-gray-400 border-gray-400 cursor-not-allowed"
                : "bg-green-700 border-green-700 cursor-pointer hover:bg-green-800"
            }`}
            onClick={handleQuantityDecrease}
            disabled={product.quantity <= MINIMUM_QUANTITY}
          >
            <Icon icon="lucide:minus" />
          </button>
          <span className="w-16 h-8 flex items-center justify-center border-t border-b border-green-700 text-sm bg-white">
            {product.quantity}
          </span>
          <button
            className={`w-8 h-8 flex items-center justify-center text-white border rounded-r-md transition-colors ${
              product.quantity >= MAXIMUM_QUANTITY
                ? "bg-gray-400 border-gray-400 cursor-not-allowed"
                : "bg-green-700 border-green-700 cursor-pointer hover:bg-green-800"
            }`}
            onClick={handleQuantityIncrease}
            disabled={product.quantity >= MAXIMUM_QUANTITY}
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
          className="px-4 py-1 bg-yellow-500 text-white rounded-md cursor-pointer hover:bg-yellow-600 transition-colors"
          onClick={() => handleOpenPopup(product.id)}
        >
          Hapus
        </button>
      </div>

      <ConfirmPopup
        isOpen={isPopupOpen}
        message="Apakah Anda yakin ingin hapus item ini dari keranjang?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onClose={() => setIsPopupOpen(false)}
        title="Hapus Item Keranjang"
      />
    </div>
  );
};

export default CartItem;
export type { Product, CartItemProps };
