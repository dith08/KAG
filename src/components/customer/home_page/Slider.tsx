import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import api from "../../../services/api";
import { getBaseUrl } from "../../../utils/getBaseUrl";
import { useNavigate } from "react-router-dom";
import { slugify } from "../../../utils/slugify";
import { useToast } from "../../toast/useToast";

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  buttonText: string;
  image: string;
  status: string;
}

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [slidesData, setSlidesData] = useState<Slide[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const sliderRef = useRef<HTMLDivElement>(null);

  // State untuk touch events
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchMoveX, setTouchMoveX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsDragging(false);
    setTouchMoveX(0); // Reset posisi saat slide berpindah
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/api/products");

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = response.data;

      const formattedSlides: Slide[] = data.map(
        (product: {
          nama: string;
          deskripsi: string;
          harga: string;
          gambar: string;
          status: string;
        }) => ({
          title: product.nama.toUpperCase(),
          subtitle: "",
          description: product.deskripsi,
          price: `Start from Rp.${parseFloat(product.harga).toLocaleString(
            "id-ID"
          )}!`,
          buttonText:
            product.status === "Tersedia" ? "Pesan Sekarang" : "Tidak Tersedia",
          image: `${getBaseUrl()}/${product.gambar}`,
          status: product.status,
        })
      );

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
  }, []);

  // Auto-slide hanya aktif jika tidak sedang drag
  useEffect(() => {
    if (slidesData.length > 0 && !isDragging) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slidesData.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slidesData, isDragging]);

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX !== null) {
      const currentX = e.touches[0].clientX;
      const diff = touchStartX - currentX;
      setTouchMoveX(diff / (sliderRef.current?.offsetWidth || 1)); // Normalisasi pergerakan
    }
  };

  // Handle touch end
  const handleTouchEnd = () => {
    if (touchStartX !== null) {
      const threshold = 0.3; // Ambang batas untuk pindah slide (30% dari lebar slide)
      if (touchMoveX > threshold) {
        setCurrentSlide((prev) => Math.min(prev + 1, slidesData.length - 1));
      } else if (touchMoveX < -threshold) {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
      setTouchStartX(null);
      setTouchMoveX(0);
      setIsDragging(false);
    }
  };

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
    <div
      className="relative w-full h-full overflow-hidden bg-[#D9D9D9] pt-14"
      ref={sliderRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        className="flex w-full h-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{
          x: `-${currentSlide * 100 + touchMoveX * 100}%`, // Tambahkan offset touchMoveX
          opacity: 1,
          y: 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {slidesData.map((slide, index) => {
          const isAvailable = slide.status === "Tersedia";
          return (
            <div
              key={index}
              className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 items-center min-h-[300px] md:min-h-[500px]"
              style={{ minWidth: "100%" }}
            >
              <div className="px-4 py-4 md:px-12 md:py-16 lg:px-24 max-w-3xl mx-auto text-left md:text-start">
                <h2
                  className={`text-2xl md:text-4xl font-bold leading-tight ${
                    isAvailable ? "text-green-700" : "text-gray-600"
                  }`}
                >
                  {slide.title}
                </h2>
                <div
                  className={`mt-2 md:mt-5 text-sm md:text-base leading-relaxed ${
                    isAvailable ? "text-gray-700" : "text-gray-500"
                  }`}
                >
                  <p className="text-justify">{slide.description}</p>
                </div>
                <p
                  className={`mt-2 md:mt-5 font-semibold ${
                    isAvailable ? "text-gray-600" : "text-gray-500"
                  }`}
                >
                  {slide.price}
                </p>
                <button
                  onClick={() => {
                    if (isAvailable) {
                      navigate(`/customer/produk/${slugify(slide.title)}`);
                    } else {
                      showToast("Produk Tidak Tersedia", "error");
                    }
                  }}
                  className={`mt-3 md:mt-6 px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-semibold rounded-lg transition duration-300 cursor-pointer ${
                    isAvailable
                      ? "border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
                      : "border-2 border-gray-400 text-gray-400 bg-gray-200 cursor-not-allowed"
                  }`}
                  disabled={!isAvailable}
                >
                  {slide.buttonText}
                </button>
              </div>

              <div className="hidden md:flex md:h-full items-center justify-center p-8 md:p-16">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`max-w-full max-h-[30rem] object-contain ${
                    !isAvailable ? "opacity-50" : ""
                  }`}
                />
              </div>
            </div>
          );
        })}
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
