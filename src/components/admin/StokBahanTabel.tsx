import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import ConfirmPopup from "../ConfirmPopup";
import { useToast } from "../toast/useToast";

export type Unit = {
  id: number;
  nama: string;
};

export type BahanBaku = {
  id: number;
  nama: string;
  jenis: string;
  stok: number;
  satuan: string;
  harga: string;
  unit_id: number; // Ubah dari 'unit' menjadi 'unit_id' untuk konsistensi
  kategori: "cover" | "isi" | "umum";
};

const StokBahanTabel = () => {
  const [bahanBakuList, setBahanBakuList] = useState<BahanBaku[]>([]);
  const [unitList, setUnitList] = useState<Unit[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");

        // Ambil data bahan baku
        const bahanResponse = await api.get("/api/materials", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBahanBakuList(bahanResponse.data);
        console.log("Data bahan baku:", bahanResponse.data); // Log untuk debug

        // Ambil data unit
        const unitResponse = await api.get("/api/units", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUnitList(unitResponse.data);
        console.log("Data unit:", unitResponse.data); // Log untuk debug
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        showToast("Gagal memuat data.", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [showToast]);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/api/materials/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBahanBakuList((prev) => prev.filter((bahan) => bahan.id !== id));
      showToast("Bahan baku berhasil dihapus!", "success");
    } catch (error) {
      console.error("Gagal menghapus bahan baku:", error);
      showToast("Gagal menghapus bahan baku.", "error");
    }
  };

  const handleConfirm = () => {
    if (selectedId !== null) {
      handleDelete(selectedId);
    }
    setIsPopupOpen(false);
  };

  const handleCancel = () => {
    console.log("Cancelled!");
    setIsPopupOpen(false);
  };

  const handleOpenPopup = (id: number) => {
    setSelectedId(id);
    setIsPopupOpen(true);
  };

  const getUnitName = (unitId: number | string) => {
    const id = Number(unitId); // Konversi ke number jika string
    console.log("Mencari unit dengan ID:", id, "di unitList:", unitList); // Log untuk debug
    const unit = unitList.find((u) => u.id === id);
    return unit ? unit.nama : "Tidak diketahui";
  };

  return (
    <div className="bg-white p-2 rounded-2xl">
      <ConfirmPopup
        isOpen={isPopupOpen}
        message="Apakah Anda yakin ingin hapus bahan baku ini?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onClose={() => setIsPopupOpen(false)}
        title="Hapus Bahan Baku"
      />
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
                <span className="font-medium">Harga<br/>(per unit):</span>
                <span className="text-right">
                  Rp {Number(bahan.harga).toLocaleString("id-ID")}<br/>
                  <span>({getUnitName(bahan.unit_id)})</span>
                </span>              </div>
              <div className="flex justify-between">
                <span className="font-medium">Kategori:</span>
                <span>{bahan.kategori}</span>
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => navigate(`/admin/bahan-baku/${bahan.id}/edit`)}
                  className="text-green-700 hover:text-green-800 cursor-pointer"
                >
                  <Icon icon="mdi:pencil-outline" width="20" height="20" />
                </button>
                <button
                  onClick={() => handleOpenPopup(bahan.id)}
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
      {isLoading ? (
        <div className="flex justify-start items-center">
          <Icon icon="mdi:loading" className="animate-spin mr-2" />
          <p className="text-gray-500">Memuat data...</p>
        </div>
      ) : (
        <div className="hidden lg:block overflow-x-auto rounded-xl shadow-md">
          <table className="w-full text-sm text-left">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="p-3 whitespace-nowrap">Nama</th>
                <th className="p-3 whitespace-nowrap">Jenis</th>
                <th className="p-3 whitespace-nowrap">Stok</th>
                <th className="p-3 whitespace-nowrap">Satuan</th>
                <th className="p-3 whitespace-nowrap">Harga (unit)</th>
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
                    Rp {Number(bahan.harga).toLocaleString("id-ID")}{" "}
                    <span>({getUnitName(bahan.unit_id)})</span>
                  </td>
                  <td className="p-3 whitespace-nowrap">{bahan.kategori}</td>
                  <td className="p-3 text-center space-x-2 whitespace-nowrap">
                    <button
                      onClick={() =>
                        navigate(`/admin/bahan-baku/${bahan.id}/edit`)
                      }
                      className="text-green-700 hover:text-green-800 cursor-pointer"
                    >
                      <Icon icon="mdi:pencil-outline" width="20" height="20" />
                    </button>
                    <button
                      onClick={() => handleOpenPopup(bahan.id)}
                      className="text-red-600 hover:text-red-700 cursor-pointer"
                    >
                      <Icon
                        icon="mdi:trash-can-outline"
                        width="20"
                        height="20"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StokBahanTabel;
