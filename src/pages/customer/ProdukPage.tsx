import React from "react";
import { Icon } from "@iconify/react";
import Navbar from "../../components/customer/Navbar";
import ProductList from "../../components/customer/produk_page/ProductCard";
import Footer from "../../components/customer/Footer";

const ProdukPage = () => {
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
      <div className="w-full py-4 sm:py-6 px-4 sm:px-8 pt-10 sm:pt-16 md:pt-20 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center sm:items-start md:items-center sm:justify-between gap-4 sm:gap-6">
          {/* Text Section */}
          <div className="text-center sm:text-left mb-4 sm:mb-0 w-full sm:w-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-green-700">
              PILIH PRODUK KEINGINANMU!
            </h2>
            <p className="font-medium text-sm sm:text-base">
              KAMI MENYEDIAKAN BERBAGAI MACAM PRODUK YANG
              <br className="hidden sm:block" /> TERJAMIN KUALITASNYA
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full sm:w-2/3 md:w-1/3 flex">
            <input
              type="text"
              placeholder="Cari produk"
              className="w-full px-3 sm:px-4 py-2 bg-white rounded-l-md focus:outline-none border border-gray-200 border-r-0"
            />
            <button className="bg-yellow-500 text-white px-3 sm:px-4 py-2 rounded-r-md cursor-pointer">
              <Icon icon="cuida:search-outline" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <ProductList />
      <Footer />
    </div>
  );
};

export default ProdukPage;
