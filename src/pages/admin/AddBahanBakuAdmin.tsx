import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";

const AddBahanBaku: React.FC = () => {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [jenis, setJenis] = useState("");
  const [stok, setStok] = useState<number>(0);
  const [satuan, setSatuan] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBahan = { nama, jenis, stok, satuan };
    console.log("Bahan Baku Ditambahkan:", newBahan);

    // Navigasi balik ke halaman utama
    navigate("/admin/produk");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin />
      <SidebarAdmin />
      <div className="md:ml-64 pt-28 px-4 md:px-8 pb-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-3xl mx-auto space-y-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-orange-600 mb-4">
            Tambah Bahan Baku
          </h1>

          <div>
            <label className="block mb-1 font-medium">Nama Bahan</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Jenis</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={jenis}
              onChange={(e) => setJenis(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Stok</label>
            <input
              type="number"
              className="w-full border p-2 rounded"
              value={stok}
              onChange={(e) => setStok(Number(e.target.value))}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Satuan</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={satuan}
              onChange={(e) => setSatuan(e.target.value)}
              placeholder="Contoh: lembar, ml"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => navigate("/admin/produk")}
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBahanBaku;
