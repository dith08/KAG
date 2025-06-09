import { Icon } from "@iconify/react";
import { useState } from "react";
import Navbar from "../../components/customer/Navbar";
import ProductList from "../../components/customer/produk_page/ProductCard";
import Footer from "../../components/customer/Footer";

const ProdukPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-[#D9D9D9] min-h-screen">
      <Navbar
        brand="KARYA ADI GRAFIKA"
        navItems={[
          { label: "Home", to: "/" },
          { label: "Produk", to: "/customer/produk" },
          { label: "Pesanan Saya", to: "/customer/pesanan" },
          { label: "Keranjang", to: "/customer/keranjang" },
        ]}
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
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-3 sm:px-4 py-2 bg-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-200 border-r-0 text-sm sm:text-base"
              aria-label="Cari produk"
            />
            <button
              className="bg-yellow-500 text-white px-3 sm:px-4 py-2 rounded-r-md hover:bg-yellow-600 transition-colors duration-200 cursor-pointer"
              aria-label="Tombol cari"
            >
              <Icon icon="cuida:search-outline" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <ProductList searchQuery={searchQuery} />
      <Footer />
    </div>
  );
};

export default ProdukPage;
