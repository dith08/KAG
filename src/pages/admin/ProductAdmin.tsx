import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import { Icon } from "@iconify/react";

export type BahanBaku = {
  id: number;
  nama: string;
  jenis: string;
  stok: number;
  satuan: string;
  harga: string;
};

export type Finishing = {
  id: number;
  productId: number;
  jenis: string;
  hargaTambahan: string;
};

export type Product = {
  id: number;
  name: string;
  ukuran: string;
  bahanBakuId: number;
  finishing: Finishing[];
  available: boolean;
  imageUrl: string;
  harga: string;
};

const ProductAdminPage: React.FC = () => {
  const navigate = useNavigate();

  const [bahanBakuList] = useState<BahanBaku[]>([
    {
      id: 1,
      nama: "HVS 80gsm",
      jenis: "Kertas",
      stok: 1000,
      satuan: "lembar",
      harga: "Rp25.000/rim",
    },
    {
      id: 2,
      nama: "Tinta Hitam",
      jenis: "Tinta",
      stok: 500,
      satuan: "ml",
      harga: "Rp50.000/botol",
    },
  ]);

  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Brosur A",
      ukuran: "A4",
      bahanBakuId: 1,
      finishing: [
        {
          id: 1,
          productId: 1,
          jenis: "Laminasi Doff",
          hargaTambahan: "Rp2.000",
        },
      ],
      available: true,
      imageUrl:
        "https://i.pinimg.com/736x/36/94/59/3694591363764be875b716e96c25dbb1.jpg",
      harga: "5000",
    },
    {
      id: 2,
      name: "Brosur B",
      ukuran: "A5",
      bahanBakuId: 2,
      finishing: [],
      available: false,
      imageUrl:
        "https://i.pinimg.com/736x/36/94/59/3694591363764be875b716e96c25dbb1.jpg",
      harga: "6000",
    },
  ]);

  const [filter, setFilter] = useState<"all" | "tersedia" | "tidak">("all");

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 w-full lg:ml-64">
        <NavbarAdmin />
        <div className="p-4 lg:p-6 space-y-8 mt-18 lg:mt-24">
          <h1 className="text-xl md:text-2xl font-bold text-center lg:text-left text-green-700 flex items-center gap-2 mb-6">
            <Icon icon="mdi:archive-outline" className="w-8 h-8" />
            Kelola Produk & Bahan
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bahan Baku */}
            <div className="bg-white p-4 lg:p-6 rounded-2xl shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-3">
                <h2 className="text-lg font-semibold text-green-700 flex items-center gap-1">
                  <Icon icon="mdi:invoice-text" className="w-5 h-5" />
                  Stok Bahan Baku
                </h2>
                <button
                  onClick={() => navigate("/admin/bahan-baku/add")}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2 rounded-lg shadow cursor-pointer w-full sm:w-auto"
                >
                  + Tambah
                </button>
              </div>
              
              {/* Mobile View */}
              <div className="lg:hidden space-y-4">
                {bahanBakuList.map((bahan) => (
                  <div key={bahan.id} className="bg-white p-4 rounded-lg border shadow-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Nama:</span>
                        <span>{bahan.nama}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Jenis:</span>
                        <span>{bahan.jenis}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Stok:</span>
                        <span>{bahan.stok}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Satuan:</span>
                        <span>{bahan.satuan}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Harga:</span>
                        <span>{bahan.harga}</span>
                      </div>
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          onClick={() => navigate(`/admin/bahan-baku/${bahan.id}/edit`)}
                          className="text-green-700 hover:text-green-800"
                        >
                          <Icon icon="mdi:pencil-outline" width="20" height="20" />
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          <Icon icon="mdi:trash-can-outline" width="20" height="20" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-green-100 text-green-700">
                    <tr>
                      <th className="p-3 whitespace-nowrap">Nama</th>
                      <th className="p-3 whitespace-nowrap">Jenis</th>
                      <th className="p-3 whitespace-nowrap">Stok</th>
                      <th className="p-3 whitespace-nowrap">Satuan</th>
                      <th className="p-3 whitespace-nowrap">Harga</th>
                      <th className="p-3 text-center whitespace-nowrap">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bahanBakuList.map((bahan) => (
                      <tr key={bahan.id} className="border-b hover:bg-green-50 transition">
                        <td className="p-3 whitespace-nowrap">{bahan.nama}</td>
                        <td className="p-3 whitespace-nowrap">{bahan.jenis}</td>
                        <td className="p-3 whitespace-nowrap">{bahan.stok}</td>
                        <td className="p-3 whitespace-nowrap">{bahan.satuan}</td>
                        <td className="p-3 whitespace-nowrap">{bahan.harga}</td>
                        <td className="p-3 text-center space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => navigate(`/admin/bahan-baku/${bahan.id}/edit`)}
                            className="text-green-700 hover:text-green-800"
                          >
                            <Icon icon="mdi:pencil-outline" width="20" height="20" />
                          </button>
                          <button className="text-red-600 hover:text-red-700">
                            <Icon icon="mdi:trash-can-outline" width="20" height="20" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Produk */}
            <div className="bg-white p-4 lg:p-6 rounded-2xl shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-3">
                <h2 className="text-lg font-semibold text-green-700 flex items-center gap-1">
                  <Icon icon="mdi:archive" className="w-5 h-5" />
                  Produk
                </h2>
                <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-end w-full sm:w-auto">
                  <button
                    onClick={() => navigate("/admin/products/add")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2 rounded-lg shadow cursor-pointer w-full sm:w-auto"
                  >
                    + Tambah
                  </button>
                  <div className="flex flex-wrap gap-2 justify-center w-full sm:w-auto">
                    <button
                      onClick={() => setFilter("all")}
                      className={`px-3 py-1 text-sm rounded-lg border ${filter === "all" ? "bg-green-100" : "bg-white"}`}
                    >
                      Semua
                    </button>
                    <button
                      onClick={() => setFilter("tersedia")}
                      className={`px-3 py-1 text-sm rounded-lg border ${filter === "tersedia" ? "bg-green-100" : "bg-white"}`}
                    >
                      Tersedia
                    </button>
                    <button
                      onClick={() => setFilter("tidak")}
                      className={`px-3 py-1 text-sm rounded-lg border ${filter === "tidak" ? "bg-green-100" : "bg-white"}`}
                    >
                      Tidak Tersedia
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile View */}
              <div className="lg:hidden space-y-4">
                {products
                  .filter((p) =>
                    filter === "all"
                      ? true
                      : filter === "tersedia"
                      ? p.available
                      : !p.available
                  )
                  .map((p) => (
                    <div key={p.id} className="bg-white p-4 rounded-lg border shadow-sm">
                      <div className="flex items-center gap-4">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-20 h-20 object-cover rounded-lg border"
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">Nama:</span>
                            <span>{p.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Ukuran:</span>
                            <span>{p.ukuran}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Harga:</span>
                            <span>Rp {Number(p.harga).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Status:</span>
                            <span
                              className={`px-2 py-1 rounded-lg text-xs ${
                                p.available
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {p.available ? "Tersedia" : "Tidak Tersedia"}
                            </span>
                          </div>
                          <div className="flex justify-end gap-2 mt-2">
                            <button
                              onClick={() => navigate(`/admin/products/${p.id}/edit`)}
                              className="text-green-700 hover:text-green-800"
                            >
                              <Icon icon="mdi:pencil-outline" width="20" height="20" />
                            </button>
                            <button className="text-red-600 hover:text-red-700">
                              <Icon icon="mdi:trash-can-outline" width="20" height="20" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Desktop View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-green-100 text-green-700">
                    <tr>
                      <th className="p-3 whitespace-nowrap">Gambar</th>
                      <th className="p-3 whitespace-nowrap">Nama</th>
                      <th className="p-3 whitespace-nowrap">Ukuran</th>
                      <th className="p-3 whitespace-nowrap">Harga</th>
                      <th className="p-3 whitespace-nowrap">Status</th>
                      <th className="p-3 text-center whitespace-nowrap">Aksi</th>
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
                        <tr key={p.id} className="border-b hover:bg-green-50 transition">
                          <td className="p-3 whitespace-nowrap">
                            <img
                              src={p.imageUrl}
                              alt={p.name}
                              className="w-12 h-12 object-cover rounded-lg border"
                            />
                          </td>
                          <td className="p-3 whitespace-nowrap">{p.name}</td>
                          <td className="p-3 whitespace-nowrap">{p.ukuran}</td>
                          <td className="p-3 whitespace-nowrap">
                            Rp {Number(p.harga).toLocaleString()}
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 rounded-lg text-xs ${
                                p.available
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {p.available ? "Tersedia" : "Tidak Tersedia"}
                            </span>
                          </td>
                          <td className="p-3 text-center space-x-2 whitespace-nowrap">
                            <button
                              onClick={() => navigate(`/admin/products/${p.id}/edit`)}
                              className="text-green-700 hover:text-green-800"
                            >
                              <Icon icon="mdi:pencil-outline" width="20" height="20" />
                            </button>
                            <button className="text-red-600 hover:text-red-700">
                              <Icon icon="mdi:trash-can-outline" width="20" height="20" />
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
    </div>
  );
};

export default ProductAdminPage;