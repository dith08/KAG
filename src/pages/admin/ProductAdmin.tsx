import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";

type Product = {
  id: number;
  name: string;
  stock: number;
  image: string;
  bahanCetak: string;
  bahanFinishing: string;
  ukuran: string;
};

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Majalah A",
      stock: 100,
      image: "/images/product.png",
      bahanCetak: "HVS",
      bahanFinishing: "Glossy",
      ukuran: "A4",
    },
    {
      id: 2,
      name: "Majalah B",
      stock: 200,
      image: "/images/product.png",
      bahanCetak: "Art Paper",
      bahanFinishing: "Doff",
      ukuran: "A5",
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleEditClick = (product: Product) => {
    setSelectedProduct({ ...product });
    setEditModalOpen(true);
  };

  const handleModalSubmit = () => {
    if (!selectedProduct) return;
    setProducts((prev) =>
      prev.map((p) =>
        p.id === selectedProduct.id ? { ...selectedProduct } : p
      )
    );
    setEditModalOpen(false);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:ml-64 mt-24 p-4">
      <SidebarAdmin />
      <div className="flex-1">
        <NavbarAdmin />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Kelola Produk</h1>

          <div className="bg-white p-4 shadow rounded-lg overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-orange-300 text-white">
                  <th className="p-3 text-left">No.</th>
                  <th className="p-3 text-left">Produk</th>
                  <th className="p-3 text-left">Stok</th>
                  <th className="p-3 text-left">Bahan Cetak</th>
                  <th className="p-3 text-left">Finishing</th>
                  <th className="p-3 text-left">Ukuran</th>
                  <th className="p-3 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id} className="bg-[#FFECB3] border-t">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 font-semibold">{product.name}</td>
                    <td className="p-3">{product.stock}</td>
                    <td className="p-3">{product.bahanCetak}</td>
                    <td className="p-3">{product.bahanFinishing}</td>
                    <td className="p-3">{product.ukuran}</td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() =>
                          setProducts(products.filter((p) => p.id !== product.id))
                        }
                        className="text-red-600 hover:text-red-800"
                      >
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

          {/* Modal Edit Produk */}
          {isEditModalOpen && selectedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-orange-600">Edit Produk</h2>

                <div className="mb-3">
                  <label className="block mb-1">Nama Produk</label>
                  <input
                    type="text"
                    value={selectedProduct.name}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        name: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div className="mb-3">
                  <label className="block mb-1">Stok</label>
                  <input
                    type="number"
                    value={selectedProduct.stock}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        stock: parseInt(e.target.value),
                      })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div className="mb-3">
                  <label className="block mb-1">Bahan Cetak</label>
                  <select
                    value={selectedProduct.bahanCetak}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        bahanCetak: e.target.value,
                      })
                    }
                    className="w-full p-2 bg-[#CFD8DC] border rounded-lg"
                  >
                    <option value="">Pilih Bahan</option>
                    <option value="HVS">HVS</option>
                    <option value="Art Paper">Art Paper</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="block mb-1">Bahan Finishing</label>
                  <select
                    value={selectedProduct.bahanFinishing}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        bahanFinishing: e.target.value,
                      })
                    }
                    className="w-full p-2 bg-[#CFD8DC] border rounded-lg"
                  >
                    <option value="">Pilih Finishing</option>
                    <option value="Glossy">Glossy</option>
                    <option value="Doff">Doff</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block mb-1">Ukuran</label>
                  <select
                    value={selectedProduct.ukuran}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        ukuran: e.target.value,
                      })
                    }
                    className="w-full p-2 bg-[#CFD8DC] border rounded-lg"
                  >
                    <option value="">Pilih Ukuran</option>
                    <option value="A4">A4</option>
                    <option value="A5">A5</option>
                    <option value="A6">A6</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setEditModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleModalSubmit}
                    className="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;