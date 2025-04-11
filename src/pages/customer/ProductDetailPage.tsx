import { useParams } from "react-router-dom";
import produkDummy from "../../components/customer/data/produkDummy";
import Navbar from "../../components/customer/Navbar";
import Footer from "../../components/customer/Footer";
import { langkahData } from "../../components/customer/data/langkahData";
import LangkahPesan from "../../components/customer/LangkahPesan";
import { Icon } from "@iconify/react";
import FormPemesanan from "../../components/customer/FormPemesanan";

const ProdukDetailPage = () => {
  const { slug } = useParams();
  const produk = produkDummy.find((item) => item.slug === slug);

  if (!produk) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">
          Produk tidak ditemukan
        </h2>
      </div>
    );
  }

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
        isLoggedIn={true}
      />

      {/* Section 1: Gambar dan Deskripsi Produk */}
      <div className="max-w-screen-xl mx-auto px-4 py-16 sm:py-20 md:py-16 md:pt-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-6 text-center md:text-left">
          DESKRIPSI PRODUK
        </h2>

        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Gambar Produk */}
          <div className="bg-white p-3 rounded-lg shadow w-full md:w-2/5 aspect-square flex items-center justify-center">
            <img
              src={produk.image}
              alt={produk.nama}
              className="w-full h-full object-contain rounded"
            />
          </div>

          {/* Deskripsi */}
          <div className="p-4 space-y-3 w-full md:w-3/5 text-center md:text-left">
            <h1 className="text-xl sm:text-2xl font-bold text-black mb-2">
              {produk.nama}
            </h1>
            <ul className="space-y-3 text-gray-800 leading-relaxed">
              {produk.deskripsi.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 justify-center md:justify-start"
                >
                  <Icon
                    icon="mdi:check-bold"
                    className="text-black text-lg mt-1"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Section 2: Langkah Mudah Print Online */}
      <div className="bg-green-700 py-16">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-18">
            3 LANGKAH MUDAH ORDER <br className="hidden md:block" /> PRINT
            ONLINE
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {langkahData.map((item) => (
              <LangkahPesan key={item.step} {...item} />
            ))}
          </div>
        </div>
      </div>

      {/* Section 3: Form Pemesanan */}
      <FormPemesanan produk={produk} />

      <Footer />
    </div>
  );
};

export default ProdukDetailPage;
