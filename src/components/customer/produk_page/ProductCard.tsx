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
        setProducts(res.data); // langsung karena response array
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
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col w-full"
          variants={itemVariants}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="bg-green-700 p-4 flex justify-center">
            <img
              src={`${getBaseUrl()}/${product.gambar}`}
              alt={product.nama}
              className="h-32 w-32 sm:h-40 sm:w-40 object-contain"
            />
          </div>
          <div className="p-4 text-center flex flex-col flex-grow">
            <h3 className="font-medium text-lg">{product.nama}</h3>
            <p className="text-green-700 font-medium mt-1">
              Rp. {parseInt(product.harga).toLocaleString("id-ID")}
            </p>
            <button
              onClick={() =>
                navigate(`/customer/produk/${slugify(product.nama)}`)
              }
              className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-md w-full hover:bg-yellow-600 transition cursor-pointer"
            >
              Pesan Sekarang
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductList;
