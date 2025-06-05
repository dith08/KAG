import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import { Icon } from "@iconify/react";
import api from "../../services/api";
import { useToast } from "../../components/toast/useToast";

interface Unit {
  id: string | number;
  nama: string;
}

const AddBahanBakuAdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const [nama, setNama] = useState("");
  const [jenis, setJenis] = useState("");
  const [stok, setStok] = useState("");
  const [satuan, setSatuan] = useState("");
  const [harga, setHarga] = useState("");
  const [unit, setUnit] = useState("");
  const [kategori, setKategori] = useState("umum");
  const [units, setUnits] = useState<Unit[]>([]);
  const [isLoadingUnits, setIsLoadingUnits] = useState(false);

  // Fetch units from API
  useEffect(() => {
    const fetchUnits = async () => {
      const token = localStorage.getItem("token");
      try {
        setIsLoadingUnits(true);
        const response = await api.get("/api/units", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        setUnits(response.data);
      } catch (error: any) {
        console.error(
          "Failed to fetch units:",
          error.response || error.message
        );
        showToast("Gagal mengambil data unit.", "error");
      } finally {
        setIsLoadingUnits(false);
      }
    };

    fetchUnits();
  }, [showToast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      setIsLoading(true);
      const newBahan = {
        nama,
        jenis,
        stok: parseInt(stok),
        satuan,
        harga: parseFloat(harga),
        unit_id: unit,
        kategori,
      };

      const response = await api.post("/api/materials", newBahan, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      showToast("Bahan baku berhasil ditambahkan!", "success");
      console.log("Response:", response.data);
      navigate("/admin/produk");
    } catch (error: any) {
      showToast("Gagal menambahkan bahan baku.", "error");
      console.error(
        "Gagal menambahkan bahan baku:",
        error.response || error.message
      );
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin />
      <SidebarAdmin />
      <div className="md:ml-64 pt-28 px-4 md:px-8 pb-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-10 max-w-3xl mx-auto space-y-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Icon
              icon="mdi:invoice-text-plus"
              className="text-green-700 text-4xl"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-green-700">
              Tambah Bahan Baku
            </h1>
          </div>

          {/* Nama Bahan */}
          <div>
            <label className="block mb-2 font-semibold">Nama Bahan</label>
            <input
              type="text"
              className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>

          {/* Jenis */}
          <div>
            <label className="block mb-2 font-semibold">Jenis</label>
            <input
              type="text"
              className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
              value={jenis}
              onChange={(e) => setJenis(e.target.value)}
              required
            />
          </div>

          {/* Stok dan Satuan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">Stok</label>
              <input
                type="number"
                min="0"
                className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                value={stok}
                onChange={(e) => setStok(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Satuan</label>
              <input
                type="text"
                className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                value={satuan}
                onChange={(e) => setSatuan(e.target.value)}
                placeholder="Contoh: lembar, ml"
                required
              />
            </div>
          </div>

          {/* Harga dan Unit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">
                Harga (per unit)
              </label>
              <input
                type="number"
                min="0"
                className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                placeholder="Contoh: 75000"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Unit</label>
              <select
                className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                required
                disabled={isLoadingUnits}
              >
                <option value="">Pilih Unit</option>
                {units.map((unitItem) => (
                  <option key={unitItem.id} value={unitItem.id}>
                    {unitItem.nama}
                  </option>
                ))}
              </select>
              {isLoadingUnits && (
                <p className="text-sm text-gray-500 mt-1">
                  <Icon
                    icon="mdi:loading"
                    className="inline mr-1 animate-spin"
                  />
                  Memuat data unit...
                </p>
              )}
            </div>
          </div>

          {/* Kategori */}
          <div>
            <label className="block mb-2 font-semibold">Kategori</label>
            <select
              className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              required
            >
              <option value="cover">Cover</option>
              <option value="isi">Isi</option>
              <option value="umum">Umum</option>
            </select>
          </div>

          {/* Tombol */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              className="flex items-center bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 cursor-pointer"
              onClick={() =>
                navigate("/admin/produk", { state: { activeTab: "bahan" } })
              }
            >
              <Icon icon="mdi:arrow-left" className="mr-2" />
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 cursor-pointer disabled:bg-yellow-500 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Icon icon="mdi:loading" className="mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Icon icon="mdi:content-save" className="mr-2" />
                  Simpan
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBahanBakuAdminPage;
