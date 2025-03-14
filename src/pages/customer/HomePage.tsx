import React from "react";
import Navbar from "../../components/Navbar";
import Slider from "../../components/Slider";
import ProdukTerlarisCard from "../../components/ProdukTerlarisCard";
import { Icon } from "@iconify/react";
import Footer from "../../components/Footer";
import TestimonialCard, {
  testimonials,
} from "../../components/TestimonialCard";

const HomePage = () => {
  return (
    <>
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
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-10">
            PRODUK TERLARIS KAMI!
          </h2>

          <div className="flex items-center my-8 max-w-3xl mx-auto">
            <div className="flex-grow border-t border-4 border-yellow-500"></div>
            <span className="mx-6 text-3xl text-yellow-500 font-bold">
              PAPERBAG
            </span>
            <div className="flex-grow border-t border-4 border-yellow-500"></div>
          </div>

          <div className="flex flex-wrap justify-center mt-10 px-4">
            <div className="w-full md:w-1/4 max-w-xs mb-8">
              <ProdukTerlarisCard
                image="/images/paperbag1.png"
                title={"Paperbag Makanan"}
              />
            </div>
            <div className="w-full md:w-1/4 max-w-xs mb-8">
              <ProdukTerlarisCard
                image="/images/paperbag2.png"
                title={"Paperbag Minuman"}
              />
            </div>
            <div className="w-full md:w-1/4 max-w-xs mb-8">
              <ProdukTerlarisCard
                image="/images/paperbag3.png"
                title={"Paperbag Barang"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center bg-[#D9D9D9] py-20 px-20">
        <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-20">
          3 LANGKAH MUDAH ORDER <br /> PRINT ONLINE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Langkah 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-green-700 rounded-full flex items-center justify-center">
              <Icon icon="mdi:gesture-tap" className="text-white text-3xl" />
            </div>
            <h3 className="mt-12 text-xl font-semibold">Tentukan Pilihanmu</h3>
            <p className="text-green-700 font-semibold italic text-2xl mt-2">
              01
            </p>
            <p className="text-gray-600 mt-4">
              Pilih opsi yang kamu inginkan untuk cetakanmu. Kami akan membuatmu
              senang dengan pilihanmu.
            </p>
          </div>
          {/* Langkah 2 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center">
              <Icon
                icon="mage:file-upload-fill"
                className="text-white text-3xl"
              />
            </div>
            <h3 className="mt-12 text-xl font-semibold">Upload Desain</h3>
            <p className="text-yellow-500 font-semibold italic text-2xl mt-2">
              02
            </p>
            <p className="text-gray-600 mt-4">
              Upload desain kamu yang sudah jadi di sini, dan kami akan
              mencetaknya sesuai dengan pilihanmu.
            </p>
          </div>
          {/* Langkah 3 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-green-700 rounded-full flex items-center justify-center">
              <Icon icon="gridicons:cart" className="text-white text-3xl" />
            </div>
            <h3 className="mt-12 text-xl font-semibold">Checkout & Order</h3>
            <p className="text-green-700 font-semibold italic text-2xl mt-2">
              03
            </p>
            <p className="text-gray-600 mt-4">
              Checkout dan selesaikan pesanan kamu dengan sangat mudah. Lakukan
              pembayaran sesuai yang tertera di menu checkout.
            </p>
          </div>
        </div>
        <div className="p-10">
          <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
            APA KATA PELANGGAN KAMI?
          </h2>
          <div className="grid grid-flow-col grid-rows-2 gap-4">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
