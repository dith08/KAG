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

type Finishing = {
  id: number;
  productId: number;
  jenis: string;
  keterangan: string;
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

  const [finishings, setFinishings] = useState<Finishing[]>([
    { id: 1, productId: 1, jenis: "Laminasi", keterangan: "Laminasi Doff" },
    { id: 2, productId: 1, jenis: "Jilid", keterangan: "Jilid Lem Panas" },
    { id: 3, productId: 2, jenis: "Laminasi", keterangan: "Laminasi Glossy" },
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(products[0] || null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const [selectedFinishing, setSelectedFinishing] = useState<Finishing | null>(null);
  const [isEditFinishingModalOpen, setEditFinishingModalOpen] = useState(false);

  const handleEditClick = (product: Product) => {
    setSelectedProduct({ ...product });
    setEditModalOpen(true);
  };

  const handleModalSubmit = () => {
    if (!selectedProduct) return;
    setProducts((prev) =>
      prev.map((p) => (p.id === selectedProduct.id ? { ...selectedProduct } : p))
    );
    setEditModalOpen(false);
  };

  const handleDeleteFinishing = (id: number) => {
    setFinishings((prev) => prev.filter((f) => f.id !== id));
  };

  const handleEditFinishing = (finishing: Finishing) => {
    setSelectedFinishing({ ...finishing });
    setEditFinishingModalOpen(true);
  };

  const handleSubmitEditFinishing = () => {
    if (!selectedFinishing) return;
    setFinishings((prev) =>
      prev.map((f) => (f.id === selectedFinishing.id ? { ...selectedFinishing } : f))
    );
    setEditFinishingModalOpen(false);
  };

  return (
    <div className="flex min-h-screen">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col p-4 pt-20 md:pt-28 md:ml-64">
        <NavbarAdmin />
        <h1 className="text-2xl font-bold mb-6">Kelola Produk</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* KIRI - PRODUK */}
          <div className="w-full lg:w-[70%] space-y-6">
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
                    <tr
                      key={product.id}
                      className={`border-t cursor-pointer ${
                        selectedProduct?.id === product.id ? "bg-orange-100" : "bg-[#FFECB3]"
                      }`}
                      onClick={() => setSelectedProduct(product)}
                    >
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3 font-semibold">{product.name}</td>
                      <td className="p-3">{product.stock}</td>
                      <td className="p-3">{product.bahanCetak}</td>
                      <td className="p-3">{product.bahanFinishing}</td>
                      <td className="p-3">{product.ukuran}</td>
                      <td className="p-3 space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(product);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setProducts(products.filter((p) => p.id !== product.id));
                          }}
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
          </div>

          {/* KANAN - FINISHING */}
          <div className="w-full lg:w-[30%] bg-white p-4 shadow rounded-lg h-fit">
            <h2 className="text-xl font-semibold mb-4 text-orange-600">
              Finishing Produk: {selectedProduct?.name}
            </h2>
            {selectedProduct ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-orange-200">
                    <th className="p-2 text-left">Jenis</th>
                    <th className="p-2 text-left">Keterangan</th>
                    <th className="p-2 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {finishings
                    .filter((f) => f.productId === selectedProduct.id)
                    .map((f) => (
                      <tr key={f.id} className="border-t">
                        <td className="p-2">{f.jenis}</td>
                        <td className="p-2">{f.keterangan}</td>
                        <td className="p-2 flex justify-center gap-2">
                          <button
                            onClick={() => handleEditFinishing(f)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteFinishing(f.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">Pilih produk untuk melihat finishing.</p>
            )}
          </div>
        </div>

        {/* Tambah Produk */}
        <button
          className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 z-50"
          onClick={() => alert("Fitur tambah produk belum dibuat")}
        >
          <FaPlus size={20} />
        </button>

        {/* Modal Edit Produk */}
        {isEditModalOpen && selectedProduct && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full sm:w-[400px] shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-orange-600">Edit Produk</h2>
              <div className="mb-3">
                <label className="block mb-1">Nama Produk</label>
                <input
                  type="text"
                  value={selectedProduct.name}
                  onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, name: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              {/* Tambahkan input lainnya sesuai kebutuhan */}
              <div className="flex justify-end space-x-2 mt-4">
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

        {/* Modal Edit Finishing */}
        {isEditFinishingModalOpen && selectedFinishing && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full sm:w-[400px] shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-orange-600">Edit Finishing</h2>
              <div className="mb-3">
                <label className="block mb-1">Jenis Finishing</label>
                <input
                  type="text"
                  value={selectedFinishing.jenis}
                  onChange={(e) =>
                    setSelectedFinishing({ ...selectedFinishing, jenis: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1">Keterangan</label>
                <input
                  type="text"
                  value={selectedFinishing.keterangan}
                  onChange={(e) =>
                    setSelectedFinishing({ ...selectedFinishing, keterangan: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setEditFinishingModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmitEditFinishing}
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
  );
};

export default ProductPage;
