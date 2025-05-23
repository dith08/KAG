import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { slugify } from "../../../utils/slugify";
import api from "../../../services/api";
import { getBaseUrl } from "../../../utils/getBaseUrl";

interface Product {
  id: number;
  nama: string;
  harga: string;
  gambar: string;
  status: string; // Tambahkan properti status
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => {
        setProducts(res.data); // Data produk sudah termasuk status
      })
      .catch((err) => {
        console.error("Gagal mengambil data produk:", err);
      });
  }, []);

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 max-w-screen-lg mx-auto mt-10 mb-16"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {products.map((product) => {
        const isAvailable = product.status === "Tersedia"; // Cek status produk
        return (
          <motion.div
            key={product.id}
            className={`rounded-2xl shadow-lg overflow-hidden flex flex-col w-full ${
              isAvailable ? "bg-white" : "bg-gray-300"
            }`} // Abu-abu jika tidak tersedia
            variants={itemVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div
              className={`p-4 flex justify-center ${
                isAvailable ? "bg-green-700" : "bg-gray-500"
              }`} // Ubah warna header jika tidak tersedia
            >
              <img
                src={`${getBaseUrl()}/${product.gambar}`}
                alt={product.nama}
                className={`h-32 w-32 sm:h-40 sm:w-40 object-contain ${
                  !isAvailable ? "opacity-50" : ""
                }`} // Kurangi opacity gambar jika tidak tersedia
              />
            </div>
            <div className="p-4 text-center flex flex-col flex-grow">
              <h3
                className={`font-medium text-lg ${
                  !isAvailable ? "text-gray-600" : ""
                }`} // Warna teks abu-abu jika tidak tersedia
              >
                {product.nama}
              </h3>
              <p
                className={`font-medium mt-1 ${
                  isAvailable ? "text-green-700" : "text-gray-600"
                }`} // Warna harga abu-abu jika tidak tersedia
              >
                Rp. {parseInt(product.harga).toLocaleString("id-ID")}
              </p>
              <button
                onClick={() =>
                  isAvailable &&
                  navigate(`/customer/produk/${slugify(product.nama)}`)
                } // Hanya navigasi jika tersedia
                className={`mt-4 px-4 py-2 rounded-md w-full transition cursor-pointer ${
                  isAvailable
                    ? "bg-yellow-500 text-white hover:bg-yellow-600"
                    : "bg-gray-400 text-gray-600 cursor-not-allowed"
                }`} // Styling tombol berdasarkan status
                disabled={!isAvailable} // Nonaktifkan tombol jika tidak tersedia
              >
                {isAvailable ? "Pesan Sekarang" : "Tidak Tersedia"}
              </button>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ProductList;
