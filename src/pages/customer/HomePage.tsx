import React from "react";
import Navbar from "../../components/customer/Navbar";
import Slider from "../../components/customer/Slider";
import ProdukTerlarisCard from "../../components/customer/ProdukTerlarisCard";
import Footer from "../../components/customer/Footer";
import TestimonialList from "../../components/customer/TestimonialCard";
import LangkahPesan from "../../components/customer/LangkahPesan";
import { langkahData } from "../../components/customer/data/langkahData";

const HomePage = () => {
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
      <Slider />
      <div className="py-20 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
            PRODUK TERLARIS KAMI!
          </h2>

          {/* Judul Kategori */}
          <div className="flex items-center my-8">
            <div className="flex-grow border-t border-4 border-yellow-500"></div>
            <span className="mx-4 sm:mx-6 text-xl sm:text-2xl lg:text-3xl text-yellow-500 font-bold whitespace-nowrap">
              PAPERBAG
            </span>
            <div className="flex-grow border-t border-4 border-yellow-500"></div>
          </div>

          {/* Produk Terlaris */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center mt-10">
            <ProdukTerlarisCard
              image="/images/paperbag1.png"
              title={"Paperbag Makanan"}
            />
            <ProdukTerlarisCard
              image="/images/paperbag2.png"
              title={"Paperbag Minuman"}
            />
            <ProdukTerlarisCard
              image="/images/paperbag3.png"
              title={"Paperbag Barang"}
            />
          </div>
        </div>
      </div>
      <div className="text-center bg-[#D9D9D9] py-20 px-10">
        <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-20">
          3 LANGKAH MUDAH ORDER <br /> PRINT ONLINE
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-6 mb-20 px-4">
          {langkahData.map((item) => (
            <LangkahPesan key={item.step} {...item} />
          ))}
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-green-700 text-center">
            APA KATA PELANGGAN KAMI?
          </h2>
          <TestimonialList />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
