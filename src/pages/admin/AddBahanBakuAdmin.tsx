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
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 w-full lg:ml-64">
        <NavbarAdmin />
        <div className="p-6 mt-24">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">Tambah Bahan Baku</h2>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4 max-w-lg">
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama Bahan"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              value={jenis}
              onChange={(e) => setJenis(e.target.value)}
              placeholder="Jenis"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              value={stok}
              onChange={(e) => setStok(Number(e.target.value))}
              placeholder="Stok"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              value={satuan}
              onChange={(e) => setSatuan(e.target.value)}
              placeholder="Satuan (contoh: lembar, ml)"
              className="w-full p-2 border rounded"
              required
            />
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/admin/produk")}
                className="bg-gray-300 hover:bg-gray-400 text-sm px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBahanBaku;
