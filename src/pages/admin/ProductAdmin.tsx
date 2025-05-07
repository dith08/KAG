import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import { Icon } from "@iconify/react";

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
  available: boolean;
};

const Prod: React.FC = () => {
  const navigate = useNavigate();

  const [bahanBakuList, setBahanBakuList] = useState<BahanBaku[]>([
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
      finishing: [
        { id: 1, productId: 1, jenis: "Laminasi", keterangan: "Doff" },
      ],
      available: true,
    },
    {
      id: 2,
      name: "Brosur B",
      template: "Template 2",
      ukuran: "A5",
      bahanBakuId: 2,
      finishing: [],
      available: false,
    },
  ]);

  const [filter, setFilter] = useState<"all" | "tersedia" | "tidak">("all");

  const handleAddBahanClick = () => {
    navigate("/admin/bahan-baku/add");
  };

  const handleEditBahanClick = (bahan: BahanBaku) => {
    navigate(`/admin/bahan-baku/${bahan.id}/edit`);
  };

  const handleAddProductClick = () => {
    navigate("/admin/products/add");
  };

  const handleEditProductClick = (productId: number) => {
    navigate(`/admin/products/${productId}/edit`);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 w-full lg:ml-64">
        <NavbarAdmin />
        <div className="p-4 lg:p-6 space-y-8 mt-18 lg:mt-24">
          <h1 className="text-xl md:text-2xl font-bold text-center lg:text-left text-green-700 flex items-center gap-2 mb-6">
            <Icon icon="mdi:archive" className="text-green-700 w-8 h-8" /> KELOLA PRODUK & BAHAN
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* KARTU BAHAN BAKU */}
            <div className="bg-white p-5 rounded-xl shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-orange-600">
                  Stok Bahan Baku
                </h2>
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
                    <tr
                      key={bahan.id}
                      className="border-b hover:bg-orange-50 transition"
                    >
                      <td className="p-2">{bahan.nama}</td>
                      <td className="p-2">{bahan.jenis}</td>
                      <td className="p-2">{bahan.stok}</td>
                      <td className="p-2">{bahan.satuan}</td>
                      <td className="p-2 text-center space-x-2">
                        <button
                          onClick={() => handleEditBahanClick(bahan)}
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

            {/* KARTU PRODUK */}
            <div className="bg-white p-5 rounded-xl shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-orange-600">Produk</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddProductClick}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1 rounded-md shadow"
                  >
                    + Tambah
                  </button>
                  <button
                    onClick={() => setFilter("all")}
                    className={`text-sm px-3 py-1 rounded-md border ${filter === "all" ? "bg-gray-200" : ""}`}
                  >
                    Semua
                  </button>
                  <button
                    onClick={() => setFilter("tersedia")}
                    className={`text-sm px-3 py-1 rounded-md border ${filter === "tersedia" ? "bg-green-100" : ""}`}
                  >
                    Tersedia
                  </button>
                  <button
                    onClick={() => setFilter("tidak")}
                    className={`text-sm px-3 py-1 rounded-md border ${filter === "tidak" ? "bg-red-100" : ""}`}
                  >
                    Tidak Tersedia
                  </button>
                </div>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600 bg-orange-100">
                    <th className="p-2">Nama Produk</th>
                    <th className="p-2">Ukuran</th>
                    <th className="p-2">Status</th>
                    <th className="p-2 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {products
                    .filter((p) =>
                      filter === "all"
                        ? true
                        : filter === "tersedia"
                        ? p.available
                        : !p.available
                    )
                    .map((p) => (
                      <tr key={p.id} className="border-b hover:bg-orange-50 transition">
                        <td className="p-2">{p.name}</td>
                        <td className="p-2">{p.ukuran}</td>
                        <td className="p-2">
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded ${
                              p.available
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {p.available ? "Tersedia" : "Tidak Tersedia"}
                          </span>
                        </td>
                        <td className="p-2 text-center space-x-2">
                          <button
                            onClick={() => handleEditProductClick(p.id)}
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
    </div>
  );
};

export default Prod;
