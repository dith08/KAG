import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";

// Types
export type BahanBaku = {
  id: number;
  nama: string;
  jenis: string;
  stok: number;
  satuan: string;
};

export type Finishing = {
  id: number;
  productId: number;
  jenis: string;
  keterangan: string;
};

export type Product = {
  id: number;
  name: string;
  template: string;
  ukuran: string;
  bahanBakuId: number;
  finishing: Finishing[];
};

const ProductPage: React.FC = () => {
  const navigate = useNavigate();

  const [bahanBakuList] = useState<BahanBaku[]>([
    { id: 1, nama: "HVS 80gsm", jenis: "Kertas", stok: 1000, satuan: "lembar" },
    { id: 2, nama: "Tinta Hitam", jenis: "Tinta", stok: 500, satuan: "ml" },
  ]);

  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Brosur A",
      template: "Template 1",
      ukuran: "A4",
      bahanBakuId: 1,
      finishing: [{ id: 1, productId: 1, jenis: "Laminasi", keterangan: "Doff" }],
    },
  ]);

  const handleEditClick = (productId: number) => {
    navigate("/admin/products/${productId}/edit");
  };

  const handleAddBahanClick = () => {
    // Navigasi ke halaman tambah bahan baku
    navigate("/admin/bahan-baku/add");
  };

  const handleAddProductClick = () => {
    // Navigasi ke halaman tambah produk
    navigate("/admin/products/add");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col p-4 pt-20 md:pt-28 md:ml-64">
        <NavbarAdmin />
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b-4 border-orange-400 inline-block pb-1">
          Kelola Produk & Bahan
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* KARTU BAHAN BAKU */}
          <div className="bg-white p-5 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-orange-600">Stok Bahan Baku</h2>
              <button
                onClick={handleAddBahanClick}
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1 rounded-md shadow"
              >
                + Tambah
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 bg-orange-100">
                  <th className="p-2">Nama</th>
                  <th className="p-2">Jenis</th>
                  <th className="p-2">Stok</th>
                  <th className="p-2">Satuan</th>
                  <th className="p-2 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {bahanBakuList.map((bahan) => (
                  <tr key={bahan.id} className="border-b hover:bg-orange-50 transition">
                    <td className="p-2">{bahan.nama}</td>
                    <td className="p-2">{bahan.jenis}</td>
                    <td className="p-2">{bahan.stok}</td>
                    <td className="p-2">{bahan.satuan}</td>
                    <td className="p-2 text-center space-x-2">
                      <button className="bg-blue-100 p-2 rounded-full hover:bg-blue-200 text-blue-600">
                        <FaEdit />
                      </button>
                      <button className="bg-red-100 p-2 rounded-full hover:bg-red-200 text-red-600">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* KARTU PRODUK */}
          <div className="bg-white p-5 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-orange-600">Produk</h2>
              <button
                onClick={handleAddProductClick}
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1 rounded-md shadow"
              >
                + Tambah
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 bg-orange-100">
                  <th className="p-2">Nama Produk</th>
                  <th className="p-2">Template</th>
                  <th className="p-2">Ukuran</th>
                  <th className="p-2 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-orange-50 transition">
                    <td className="p-2">{p.name}</td>
                    <td className="p-2">{p.template}</td>
                    <td className="p-2">{p.ukuran}</td>
                    <td className="p-2 text-center space-x-2">
                      <button
                        onClick={() => handleEditClick(p.id)}
                        className="bg-blue-100 p-2 rounded-full hover:bg-blue-200 text-blue-600"
                      >
                        <FaEdit />
                      </button>
                      <button className="bg-red-100 p-2 rounded-full hover:bg-red-200 text-red-600">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;