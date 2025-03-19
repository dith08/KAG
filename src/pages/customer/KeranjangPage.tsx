import React, { useState } from "react";
import Navbar from "../../components/customer/Navbar";
import CartItem, { Product } from "../../components/customer/CartItem";
import CartSummary from "../../components/customer/CartSummary";

const KeranjangPage = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Paperbag",
      price: 30000,
      image: "/images/paperbag3.png",
      quantity: 1,
    },
    {
      id: 2,
      name: "Paperbag",
      price: 30000,
      image: "/images/paperbag3.png",
      quantity: 1,
    },
    {
      id: 3,
      name: "Paperbag",
      price: 30000,
      image: "/images/paperbag3.png",
      quantity: 1,
    },
    {
      id: 4,
      name: "Paperbag",
      price: 30000,
      image: "/images/paperbag3.png",
      quantity: 1,
    },
    {
      id: 5,
      name: "Paperbag",
      price: 30000,
      image: "/images/paperbag3.png",
      quantity: 1,
    },
    {
      id: 6,
      name: "Paperbag",
      price: 30000,
      image: "/images/paperbag3.png",
      quantity: 1,
    },
  ]);

  const handleQuantityChange = (id: number, quantity: number) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, quantity } : product
      )
    );
  };

  const handleRemove = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout with products:", products);
    // Add checkout logic here
  };

  return (
    <div className="bg-[#D9D9D9] min-h-screen">
      <Navbar
        brand="KARYA ADI GRAFIKA"
        navItems={[
          { label: "Home", href: "/customer" },
          { label: "Produk", href: "/customer/produk" },
          { label: "Pesanan Saya", href: "/customer/pesanan" },
          { label: "Keranjang", href: "/customer/keranjang" },
        ]}
        isLoggedIn={true} // Ganti ke true kalau user sudah login
      />

      <div className="container mx-auto px-4 md:px-10 py-4 pt-24 pb-32 md:pb-4">
        {/* Cart Header - Hidden on mobile */}
        <div className="hidden md:flex items-center p-4 bg-white rounded-lg shadow-md mb-6 w-full border border-gray-200">
          <div className="w-5 mr-5 flex justify-center">
            <input
              type="checkbox"
              className="h-5 w-5 accent-green-700 cursor-pointer"
            />
          </div>
          <div className="flex-1 text-black/50 font-medium">Produk</div>
          <div className="w-32 text-center text-black/50 font-medium">
            Harga Satuan
          </div>
          <div className="w-32 text-center text-black/50 font-medium">
            Jumlah
          </div>
          <div className="w-32 text-center text-black/50 font-medium">
            Total Harga
          </div>
          <div className="w-32 text-center text-black/50 font-medium">Aksi</div>
        </div>

        {/* Cart Items */}
        <div className="md:pb-26 pb-10">
          {products.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          ))}
        </div>

        {/* Cart Summary */}
        <CartSummary products={products} onCheckout={handleCheckout} />
      </div>
    </div>
  );
};

export default KeranjangPage;
