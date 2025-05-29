import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/customer/Navbar";
import Footer from "../../components/customer/Footer";
import { langkahData } from "../../components/customer/data/langkahData";
import LangkahPesan from "../../components/customer/LangkahPesan";
import { Icon } from "@iconify/react";
import api from "../../services/api";
import { slugify } from "../../utils/slugify";
import { getBaseUrl } from "../../utils/getBaseUrl";
import { useToast } from "../../components/toast/useToast";
import FormPemesanan from "../../components/customer/detail_produk_page/FormPemesanan";

interface Product {
  id: number;
  nama: string;
  gambar: string;
  deskripsi?: string;
  slug?: string;
  image?: string;
  status: string; // Tambahkan field status
}

const ProdukDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get("/api/products");
        const data = res.data;
        const found = data.find((item: Product) => slugify(item.nama) === slug);

        if (!found) {
          setProduct(null);
          setLoading(false);
          return;
        }

        if (found.status !== "Tersedia") {
          showToast("Produk tidak tersedia.", "error");
          navigate("/customer/produk", { replace: true });
          return;
        }

        setProduct({
          ...found,
          slug: slugify(found.nama),
          image: `${getBaseUrl()}/${found.gambar}`,
          deskripsi: found.deskripsi ? found.deskripsi.split("\r\n") : [],
        });
      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
        showToast("Gagal memuat produk.", "error");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug, navigate, showToast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Memuat...</p>
      </div>
    );
  }

  if (!product) {
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
          { label: "Home", href: "/" },
          { label: "Produk", href: "/customer/produk" },
          { label: "Pesanan Saya", href: "/customer/pesanan" },
          { label: "Keranjang", href: "/customer/keranjang" },
        ]}
      />

      {/* Section 1: Gambar dan Deskripsi Produk */}
      <div className="max-w-screen-xl mx-auto px-6 sm:px-8 md:px-12 py-16 sm:py-20 md:py-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-8 text-center md:text-left">
          DESKRIPSI PRODUK
        </h2>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-center md:items-start">
          {/* Gambar Produk */}
          <div className="bg-white p-4 rounded-xl shadow-md w-full md:w-1/3 lg:w-2/5 aspect-[4/3] flex items-center justify-center flex-shrink-0">
            <img
              src={product.image}
              alt={product.nama}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          {/* Deskripsi */}
          <div className="w-full md:w-2/3 lg:w-3/5 space-y-4 text-gray-800">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
              {product.nama}
            </h1>
            <ul className="space-y-3">
              {Array.isArray(product.deskripsi) &&
                product.deskripsi.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon
                      icon="mdi:check-bold"
                      className="text-green-600 text-xl mt-0.5 flex-shrink-0"
                    />
                    <span className="leading-relaxed text-base sm:text-lg">
                      {item}
                    </span>
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
      <div className="bg-gray-100 py-16">
        <div className="max-w-screen-xl mx-auto px-2 md:px-12">
          <FormPemesanan />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProdukDetailPage;