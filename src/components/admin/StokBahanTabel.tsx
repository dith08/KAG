import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export type BahanBaku = {
  id: number;
  nama: string;
  jenis: string;
  stok: number;
  satuan: string;
  harga: string;
  unit: string;
  kategori: "cover" | "isi" | "umum";
};

const StokBahanTabel = () => {
  const [bahanBakuList, setBahanBakuList] = useState<BahanBaku[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBahanBaku = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/api/materials", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBahanBakuList(response.data);
      } catch (error) {
        console.error("Gagal mengambil data bahan baku:", error);
      }
    };

    fetchBahanBaku();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/api/materials/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBahanBakuList((prev) => prev.filter((bahan) => bahan.id !== id));
      alert("Bahan baku berhasil dihapus.");
    } catch (error) {
      console.error("Gagal menghapus bahan baku:", error);
      alert("Terjadi kesalahan saat menghapus bahan.");
    }
  };

  return (
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
          <div
            key={bahan.id}
            className="bg-white p-4 rounded-lg border shadow-sm"
          >
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
                <span>Rp {Number(bahan.harga).toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Kategori:</span>
                <span>{bahan.kategori}</span>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => navigate(`/admin/bahan-baku/${bahan.id}/edit`)}
                  className="text-green-700 hover:text-green-800"
                >
                  <Icon icon="mdi:pencil-outline" width="20" height="20" />
                </button>
                <button
                  onClick={() => handleDelete(bahan.id)}
                  className="text-red-600 hover:text-red-700 cursor-pointer"
                >
                  <Icon icon="mdi:trash-can-outline" width="20" height="20" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto rounded-xl shadow-md">
        <table className="w-full text-sm text-left">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="p-3 whitespace-nowrap">Nama</th>
              <th className="p-3 whitespace-nowrap">Jenis</th>
              <th className="p-3 whitespace-nowrap">Stok</th>
              <th className="p-3 whitespace-nowrap">Satuan</th>
              <th className="p-3 whitespace-nowrap">Harga</th>
              <th className="p-3 whitespace-nowrap">Kategori</th>
              <th className="p-3 text-center whitespace-nowrap">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {bahanBakuList.map((bahan) => (
              <tr
                key={bahan.id}
                className="border-b border-gray-200 hover:bg-green-50 transition"
              >
                <td className="p-3 whitespace-nowrap">{bahan.nama}</td>
                <td className="p-3 whitespace-nowrap">{bahan.jenis}</td>
                <td className="p-3 whitespace-nowrap">{bahan.stok}</td>
                <td className="p-3 whitespace-nowrap">{bahan.satuan}</td>
                <td className="p-3 whitespace-nowrap">
                  Rp {Number(bahan.harga).toLocaleString("id-ID")}
                </td>
                <td className="p-3 whitespace-nowrap">{bahan.kategori}</td>
                <td className="p-3 text-center space-x-2 whitespace-nowrap">
                  <button
                    onClick={() =>
                      navigate(`/admin/bahan-baku/${bahan.id}/edit`)
                    }
                    className="text-green-700 hover:text-green-800"
                  >
                    <Icon icon="mdi:pencil-outline" width="20" height="20" />
                  </button>
                  <button
                    onClick={() => handleDelete(bahan.id)}
                    className="text-red-600 hover:text-red-700 cursor-pointer"
                  >
                    <Icon icon="mdi:trash-can-outline" width="20" height="20" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StokBahanTabel;
