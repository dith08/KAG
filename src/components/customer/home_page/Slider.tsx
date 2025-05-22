import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../../../services/api";
import { getBaseUrl } from "../../../utils/getBaseUrl";
import { useNavigate } from "react-router-dom";
import { slugify } from "../../../utils/slugify";

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  buttonText: string;
  image: string;
}

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [slidesData, setSlidesData] = useState<Slide[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/products");

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = response.data;

      const formattedSlides: Slide[] = data.map((product: { nama: string; deskripsi: string; harga: string; gambar: string; }) => ({
        title: product.nama.toUpperCase(),
        subtitle: "",
        description: product.deskripsi,
        price: `Start from Rp.${parseFloat(product.harga).toLocaleString(
          "id-ID"
        )}!`,
        buttonText: "Pesan Sekarang",
        image: `${getBaseUrl()}/${product.gambar}`,
      }));

      setSlidesData(formattedSlides);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); // selalu fetch saat mount

  useEffect(() => {
    if (slidesData.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slidesData.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slidesData]);

  if (loading) {
    return <div className="text-center py-16">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-16 text-red-500">Error: {error}</div>;
  }

  if (slidesData.length === 0) {
    return <div className="text-center py-16">No products available.</div>;
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#D9D9D9] pt-14">
      <motion.div
        className="flex w-full h-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ x: `-${currentSlide * 100}%`, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {slidesData.map((slide, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 items-center min-h-[500px]"
            style={{ minWidth: "100%" }}
          >
            <div className="px-4 py-8 md:px-12 md:py-16 lg:px-24 max-w-3xl mx-auto md:text-start text-center">
              <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                <span className="text-green-700">{slide.title}</span>
              </h2>
              <div className="mt-3 md:mt-5 text-sm md:text-base leading-relaxed text-gray-700">
                <p className="text-justify">{slide.description}</p>
              </div>
              <p className="mt-3 md:mt-5 font-semibold text-gray-600">
                {slide.price}
              </p>
              <button
                onClick={() =>
                  navigate(`/customer/produk/${slugify(slide.title)}`)
                }
                className="mt-4 md:mt-6 px-4 py-2 md:px-6 md:py-3 text-sm md:text-base border-2 border-yellow-500 text-yellow-500 font-semibold rounded-lg hover:bg-yellow-500 hover:text-white transition duration-300 cursor-pointer"
              >
                {slide.buttonText}
              </button>
            </div>

            <div className="hidden md:flex h-full items-center justify-center p-8 md:p-16">
              <img
                src={slide.image}
                alt={slide.title}
                className="max-w-full max-h-[30rem] object-contain"
              />
            </div>
          </div>
        ))}
      </motion.div>

      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3">
        {slidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full cursor-pointer transition ${
              currentSlide === index ? "bg-green-700" : "bg-white"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
