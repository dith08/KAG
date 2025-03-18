import React from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";

const ProductPage: React.FC = () => {
  const products = [
    { id: 1, name: "majalah", stock: 500, image: "/images/product.png" },
    { id: 2, name: "majalah", stock: 500, image: "/images/product.png" },
    { id: 3, name: "majalah", stock: 500, image: "/images/product.png" },
    { id: 4, name: "majalah", stock: 500, image: "/images/product.png" },
    { id: 5, name: "majalah", stock: 500, image: "/images/product.png" },
  ];

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1">
        <NavbarAdmin />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Kelola Produk</h1>
          
          <div className="bg-white p-4 shadow rounded-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-orange-300">
                  <th className="p-3 text-left">No.</th>
                  <th className="p-3 text-left">Produk</th>
                  <th className="p-3 text-left">Stok</th>
                  <th className="p-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id} className="bg-orange-200 border-b">
                    <td className="p-3">{index + 1}.</td>
                    <td className="p-3 flex items-center space-x-2">
                      <img src={product.image} alt="Product" className="w-10 h-10" />
                      <span>{product.name}</span>
                    </td>
                    <td className="p-3">{product.stock}</td>
                    <td className="p-3 flex space-x-2">
                      <button className="p-2 bg-transparent hover:text-blue-600">
                        <FaEdit />
                      </button>
                      <button className="p-2 bg-transparent hover:text-red-600">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tombol Tambah Produk */}
          <button className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700">
            <FaPlus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
