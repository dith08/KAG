import React from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import ProductTableRow from "../../components/admin/ProductTableRowAdmin";

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
                  <ProductTableRow
                    key={product.id}
                    index={index}
                    name={product.name}
                    stock={product.stock}
                    image={product.image}
                    onEdit={() => console.log("Edit product", product.id)}
                    onDelete={() => console.log("Delete product", product.id)}
                  />
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
