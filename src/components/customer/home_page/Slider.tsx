import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  buttonText: string;
  image: string;
}

const slides: Slide[] = [
  {
    title: "PAPER BAG",
    subtitle: "| TAS KERTAS",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    price: "Start from Rp.30K!",
    buttonText: "Pesan Sekarang",
    image: "/images/paperbag1.png",
  },
  {
    title: "CALENDAR",
    subtitle: "| KALENDER",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    price: "Start from Rp.50K!",
    buttonText: "Pesan Sekarang",
    image: "/images/calendar.png",
  },
  {
    title: "MAGAZINE",
    subtitle: "| MAJALAH",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    price: "Start from Rp.10K!",
    buttonText: "Pesan Sekarang",
    image: "/images/magazine.png",
  },
];

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#D9D9D9] pt-14">
      <motion.div
        className="flex w-full h-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ x: `-${currentSlide * 100}%`, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 items-center"
            style={{ minWidth: "100%" }}
          >
            <div className="px-6 py-10 md:px-16 lg:px-32 max-w-3xl mx-auto text-start md:text-start ">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="text-green-700">{slide.title}</span>{" "}
                <span className="text-yellow-500 font-light">
                  {slide.subtitle}
                </span>
              </h2>
              <p className="mt-4 md:mt-6 text-sm md:text-base leading-relaxed font-normal">
                {slide.description}
              </p>
              <p className="mt-4 md:mt-6 font-bold text-gray-500">
                {slide.price}
              </p>
              <button className="mt-4 md:mt-6 px-6 md:px-8 py-2 md:py-3 border-2 border-yellow-500 text-yellow-500 font-semibold rounded-lg hover:bg-yellow-500 hover:text-white transition cursor-pointer">
                {slide.buttonText}
              </button>
            </div>

            {/* Image hanya ditampilkan pada desktop */}
            <div className="hidden md:flex h-full items-center justify-center p-8 md:p-16">
              <img
                src={slide.image}
                alt={slide.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Dots navigation */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-green-700" : "bg-white"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
