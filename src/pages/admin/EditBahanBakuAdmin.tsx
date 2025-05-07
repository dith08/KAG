import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BahanBaku } from "./ProductAdmin";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";

const dummyData: BahanBaku[] = [
  { id: 1, nama: "HVS 80gsm", jenis: "Kertas", stok: 1000, satuan: "lembar" },
  { id: 2, nama: "Tinta Hitam", jenis: "Tinta", stok: 500, satuan: "ml" },
];

const EditBahanBakuPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [bahan, setBahan] = useState<BahanBaku | null>(null);

  useEffect(() => {
    const data = dummyData.find((b) => b.id === Number(id));
    if (data) {
      setBahan(data);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (bahan) {
      setBahan({ ...bahan, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = () => {
    console.log("Data disimpan:", bahan);
    navigate("/admin/produk"); // kembali ke halaman utama
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 ml-64">
        <NavbarAdmin />
        <div className="p-6 mt-24 max-w-xl mx-auto space-y-4 bg-white rounded-lg shadow">
          <h1 className="text-xl font-bold text-orange-600">Edit Bahan Baku</h1>
          {bahan ? (
            <>
              <input
                type="text"
                name="nama"
                value={bahan.nama}
                onChange={handleChange}
                placeholder="Nama"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="jenis"
                value={bahan.jenis}
                onChange={handleChange}
                placeholder="Jenis"
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                name="stok"
                value={bahan.stok}
                onChange={handleChange}
                placeholder="Stok"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="satuan"
                value={bahan.satuan}
                onChange={handleChange}
                placeholder="Satuan"
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => navigate("/admin/produk")}
                  className="px-4 py-2 text-sm bg-gray-300 hover:bg-gray-400 rounded"
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 text-sm bg-green-600 text-white hover:bg-green-700 rounded"
                >
                  Simpan
                </button>
              </div>
            </>
          ) : (
            <p className="text-red-500">Data bahan tidak ditemukan.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditBahanBakuPage;
