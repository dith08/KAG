import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import ConfirmPopup from "../ConfirmPopup";
import { useToast } from "../toast/useToast";
import { ModernTable } from "../../components/admin/ModernTable";

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
  unit_id: number;
  kategori: "cover" | "isi" | "umum";
};

const StokBahanTabel = () => {
  const [bahanBakuList, setBahanBakuList] = useState<BahanBaku[]>([]);
  const [unitList, setUnitList] = useState<Unit[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
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
        console.log("Data bahan baku:", bahanResponse.data);

        // Ambil data unit
        const unitResponse = await api.get("/api/units", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUnitList(unitResponse.data);
        console.log("Data unit:", unitResponse.data);
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
    const id = Number(unitId);
    console.log("Mencari unit dengan ID:", id, "di unitList:", unitList);
    const unit = unitList.find((u) => u.id === id);
    return unit ? unit.nama : "Tidak diketahui";
  };

  const tableData = bahanBakuList
    .filter((bahan) => !selectedCategory || bahan.kategori === selectedCategory)
    .map((bahan) => ({
      Nama: bahan.nama,
      Jenis: bahan.jenis,
      Stok: bahan.stok,
      Satuan: bahan.satuan,
      "Harga (unit)": (
        <span>
          Rp {Number(bahan.harga).toLocaleString("id-ID")}{" "}
          <span>({getUnitName(bahan.unit_id)})</span>
        </span>
      ),
      Kategori: bahan.kategori,
      Aksi: (
        <div className="flex space-x-2">
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
      ),
    }));

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
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-black/50 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-700 w-full sm:w-auto"
          >
            <option value="">Semua Kategori</option>
            <option value="cover">Cover</option>
            <option value="isi">Isi</option>
            <option value="umum">Umum</option>
          </select>
          <button
            onClick={() => navigate("/admin/bahan-baku/add")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2 rounded-lg shadow cursor-pointer w-full sm:w-auto"
          >
            + Tambah
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-start items-center">
          <Icon icon="mdi:loading" className="animate-spin mr-2" />
          <p className="text-gray-500">Memuat data...</p>
        </div>
      ) : (
        <ModernTable
          headers={["Nama", "Jenis", "Stok", "Satuan", "Harga (unit)", "Kategori", "Aksi"]}
          data={tableData}
          keyField="id"
        />
      )}
    </div>
  );
};

export default StokBahanTabel;
