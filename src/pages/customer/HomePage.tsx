import Navbar from "../../components/customer/Navbar";
import Slider from "../../components/customer/home_page/Slider";
import ProdukTerlarisCard from "../../components/customer/home_page/ProdukTerlarisCard";
import Footer from "../../components/customer/Footer";
import TestimonialList from "../../components/customer/home_page/TestimonialCard";
import LangkahPesan from "../../components/customer/LangkahPesan";
import { langkahData } from "../../components/customer/data/langkahData";
import ProductGallery from "../../components/customer/home_page/ProductGallery";
import "aos/dist/aos.css";

const HomePage = () => {
  return (
    <div className="bg-[#D9D9D9] min-h-screen">
      <Navbar
        brand="KARYA ADI GRAFIKA"
        navItems={[
          { label: "Home", href: "/" },
          { label: "Produk", href: "/customer/produk" },
          { label: "Pesanan Saya", href: "/customer/pesanan" },
          { label: "Keranjang", href: "/customer/keranjang" },
        ]}
      />
      <Slider />
      <div className="py-16 sm:py-20 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-10"
            data-aos="fade-up"
          >
            PRODUK TERLARIS KAMI!
          </h2>

          {/* Judul Kategori */}
          <div className="flex items-center my-6 sm:my-8" data-aos="fade-up">
            <div className="flex-grow border-t border-2 sm:border-4 border-yellow-500"></div>
            <span className="mx-3 sm:mx-4 text-lg sm:text-2xl lg:text-3xl text-yellow-500 font-bold whitespace-nowrap">
              PAPERBAG
            </span>
            <div className="flex-grow border-t border-2 sm:border-4 border-yellow-500"></div>
          </div>

          {/* Produk Terlaris */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 justify-items-center mt-8 sm:mt-10">
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
      <ProductGallery />
      <div className="text-center bg-[#D9D9D9] py-20 px-10">
        <h2
          className="text-2xl md:text-3xl font-bold text-green-700 mb-20"
          data-aos="fade-up"
        >
          3 LANGKAH MUDAH ORDER <br /> PRINT ONLINE
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-6 mb-20 px-4">
          {langkahData.map((item) => (
            <LangkahPesan key={item.step} {...item} />
          ))}
        </div>

        <div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-10 text-green-700 text-center"
            data-aos="fade-up"
          >
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
