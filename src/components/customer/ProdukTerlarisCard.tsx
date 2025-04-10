import { motion } from "framer-motion";
import React from "react";

interface ProdukTerlarisCardProps {
  image: string;
  title: string;
}

const ProdukTerlarisCard: React.FC<ProdukTerlarisCardProps> = ({
  image,
  title,
}) => {
  return (
    <motion.div
      className="relative bg-white rounded-2xl shadow-2xl p-4 overflow-hidden w-full h-72 sm:h-96 md:h-[28rem] group transform transition duration-500 hover:scale-105 hover:-translate-y-2"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Background Lingkaran Kuning */}
      <div className="absolute bottom-0 left-0 w-60 h-60 sm:w-72 sm:h-72 bg-yellow-500 rounded-full transform -translate-x-1/2 translate-y-1/2 z-0"></div>

      {/* Gambar Produk */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.img
          src={image}
          alt="Product image"
          className="max-w-full max-h-52 sm:max-h-64 md:max-h-72 object-contain transition-transform duration-500 group-hover:scale-110"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>

      {/* Overlay Saat Hover */}
      <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <h3 className="text-white text-base sm:text-lg md:text-xl font-bold text-center px-4">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

export default ProdukTerlarisCard;
