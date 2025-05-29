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
  status: string;
}

interface ProductListProps {
  searchQuery: string;
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

const ProductList: React.FC<ProductListProps> = ({ searchQuery }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data); // Inisialisasi filteredProducts dengan semua produk
      })
      .catch((err) => {
        console.error("Gagal mengambil data produk:", err);
      });
  }, []);

  useEffect(() => {
    // Filter produk berdasarkan searchQuery
    const filtered = products.filter((product) =>
      product.nama.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 max-w-screen-lg mx-auto mt-10 mb-16"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {filteredProducts.length === 0 && searchQuery && (
        <div className="col-span-full text-center text-gray-600 text-base sm:text-lg">
          Tidak ada produk yang cocok dengan pencarian "{searchQuery}".
        </div>
      )}
      {filteredProducts.map((product) => {
        const isAvailable = product.status === "Tersedia";
        return (
          <motion.div
            key={product.id}
            className={`rounded-2xl shadow-lg overflow-hidden flex flex-col w-full ${
              isAvailable ? "bg-white" : "bg-gray-300"
            }`}
            variants={itemVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div
              className={`p-4 flex justify-center ${
                isAvailable ? "bg-green-700" : "bg-gray-500"
              }`}
            >
              <img
                src={`${getBaseUrl()}/${product.gambar}`}
                alt={product.nama}
                className={`h-32 w-32 sm:h-40 sm:w-40 object-contain ${
                  !isAvailable ? "opacity-50" : ""
                }`}
              />
            </div>
            <div className="p-4 text-center flex flex-col flex-grow">
              <h3
                className={`font-medium text-lg ${
                  !isAvailable ? "text-gray-600" : ""
                }`}
              >
                {product.nama}
              </h3>
              <p
                className={`font-medium mt-1 ${
                  isAvailable ? "text-green-700" : "text-gray-600"
                }`}
              >
                Rp. {parseInt(product.harga).toLocaleString("id-ID")}
              </p>
              <button
                onClick={() =>
                  isAvailable &&
                  navigate(`/customer/produk/${slugify(product.nama)}`)
                }
                className={`mt-4 px-4 py-2 rounded-md w-full transition ${
                  isAvailable
                    ? "bg-yellow-500 text-white hover:bg-yellow-600 cursor-pointer"
                    : "bg-gray-400 text-gray-600 cursor-not-allowed"
                }`}
                disabled={!isAvailable}
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
