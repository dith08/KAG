import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import api from "../../services/api";
import { useToast } from "../toast/useToast";
import ConfirmPopup from "../ConfirmPopup";
import { ModernTable } from "../../components/admin/ModernTable";

type Finishing = {
  id: number;
  nama: string;
  harga_tambahan: string;
  kategori: string;
  isEditing?: boolean;
};

const FinishingTabel = () => {
  const [finishingList, setFinishingList] = useState<Finishing[]>([]);
  const [newFinishing, setNewFinishing] = useState("");
  const [newFinishingHargaTambahan, setNewFinishingHargaTambahan] =
    useState("");
  const [newFinishingKategori, setNewFinishingKategori] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editData, setEditData] = useState<Finishing | null>(null);

  useEffect(() => {
    fetchFinishingList();
  }, []);

  const fetchFinishingList = async () => {
    try {
      setIsFetching(true);
      const token = localStorage.getItem("token");
      const res = await api.get("/api/finishings", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data?.data;
      if (Array.isArray(data)) {
        setFinishingList(data);
      } else {
        showToast("Data finishing tidak valid", "error");
        console.error("Data finishing bukan array:", data);
        setFinishingList([]);
      }
    } catch (err) {
      showToast("Gagal mengambil finishing", "error");
      console.error("Gagal mengambil finishing:", err);
      setFinishingList([]);
    } finally {
      setIsFetching(false);
    }
  };

  const handleAddFinishing = async () => {
    if (!newFinishing || !newFinishingHargaTambahan || !newFinishingKategori) {
      showToast("Mohon isi semua kolom", "error");
      return;
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");
      await api.post(
        "/api/finishings",
        {
          nama: newFinishing,
          harga_tambahan: Number(newFinishingHargaTambahan),
          kategori: newFinishingKategori,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showToast("Finishing berhasil ditambahkan", "success");
      setNewFinishing("");
      setNewFinishingHargaTambahan("");
      setNewFinishingKategori("");
      fetchFinishingList();
    } catch (err: any) {
      showToast("Gagal menambah finishing", "error");
      console.error(
        "Gagal menambah finishing:",
        err.response?.data || err.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteFinishing = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/api/finishings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast("Finishing berhasil dihapus", "success");
      fetchFinishingList();
    } catch (err) {
      showToast("Gagal menghapus finishing", "error");
      console.error("Gagal menghapus finishing:", err);
    }
  };

  const handleSaveEditFinishing = async () => {
    if (!editData) return;

    try {
      setIsUpdating(true);
      const token = localStorage.getItem("token");
      await api.put(
        `/api/finishings/${editData.id}`,
        {
          nama: editData.nama,
          harga_tambahan: editData.harga_tambahan,
          kategori: editData.kategori,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showToast("Finishing berhasil diperbarui", "success");
      setFinishingList(
        finishingList.map((f) =>
          f.id === editData.id
            ? { ...f, nama: editData.nama, harga_tambahan: editData.harga_tambahan, kategori: editData.kategori, isEditing: false }
            : f
        )
      );
      setEditData(null);
      fetchFinishingList();
    } catch (err) {
      showToast("Gagal mengedit finishing", "error");
      console.error("Gagal mengedit finishing:", err);
      fetchFinishingList();
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEditFinishing = (id: number) => {
    const finishingToEdit = finishingList.find((f) => f.id === id);
    if (finishingToEdit) {
      setEditData({ ...finishingToEdit });
      setFinishingList(
        finishingList.map((f) =>
          f.id === id ? { ...f, isEditing: true } : { ...f, isEditing: false }
        )
      );
    }
  };

  const handleCancelEdit = (id: number) => {
    setFinishingList(
      finishingList.map((f) => (f.id === id ? { ...f, isEditing: false } : f))
    );
    setEditData(null);
  };

  const handleConfirm = () => {
    if (selectedId !== null) {
      handleDeleteFinishing(selectedId);
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

  const tableData = finishingList
    .filter((f) => !selectedCategory || f.kategori === selectedCategory)
    .map((f) => ({
      Nama: f.isEditing ? (
        <input
          type="text"
          value={editData?.id === f.id ? editData.nama : f.nama}
          onChange={(e) =>
            setEditData((prev) =>
              prev ? { ...prev, nama: e.target.value } : null
            )
          }
          className="w-full border rounded px-2 py-1"
        />
      ) : (
        f.nama
      ),
      "Harga Tambahan": f.isEditing ? (
        <input
          type="number"
          value={
            editData?.id === f.id ? editData.harga_tambahan : f.harga_tambahan
          }
          onChange={(e) =>
            setEditData((prev) =>
              prev ? { ...prev, harga_tambahan: e.target.value } : null
            )
          }
          className="w-full border rounded px-2 py-1"
        />
      ) : (
        `Rp ${Number(f.harga_tambahan).toLocaleString()}`
      ),
      Kategori: f.isEditing ? (
        <select
          value={editData?.id === f.id ? editData.kategori : f.kategori}
          onChange={(e) =>
            setEditData((prev) =>
              prev ? { ...prev, kategori: e.target.value } : null
            )
          }
          className="w-full border rounded px-2 py-1"
        >
          <option value="cover">Cover</option>
          <option value="isi">Isi</option>
          <option value="umum">Umum</option>
        </select>
      ) : (
        f.kategori
      ),
      Aksi: (
        <div className="flex space-x-2">
          {f.isEditing ? (
            <>
              <button
                type="button"
                className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded cursor-pointer"
                onClick={handleSaveEditFinishing}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <>
                    <Icon icon="mdi:loading" className="animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:content-save" />
                    Simpan
                  </>
                )}
              </button>
              <button
                type="button"
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
                onClick={() => handleCancelEdit(f.id)}
              >
                <Icon icon="mdi:cancel" width="18" />
                Batal
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="flex items-center gap-1 text-green-700 hover:underline cursor-pointer"
                onClick={() => handleEditFinishing(f.id)}
              >
                <Icon icon="mdi:pencil-outline" width="18" />
              </button>
              <button
                type="button"
                className="flex items-center gap-1 text-red-600 hover:underline cursor-pointer"
                onClick={() => handleOpenPopup(f.id)}
              >
                <Icon icon="mdi:trash-can-outline" width="18" />
              </button>
            </>
          )}
        </div>
      ),
    }));

  return (
    <div className="bg-white p-2 rounded-2xl">
      <ConfirmPopup
        isOpen={isPopupOpen}
        message="Apakah Anda yakin ingin hapus finishing ini?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onClose={() => setIsPopupOpen(false)}
        title="Hapus Finishing"
      />
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <h2 className="text-lg font-semibold text-green-700 flex items-center gap-1">
          <Icon icon="mdi:star-box-multiple" className="w-5 h-5" />
          Finishing
        </h2>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700 text-sm"
        >
          <option value="">Semua Kategori</option>
          <option value="cover">Cover</option>
          <option value="isi">Isi</option>
          <option value="umum">Umum</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-2 items-center mt-4">
        <input
          type="text"
          placeholder="Nama Finishing"
          className="border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700 col-span-1"
          value={newFinishing}
          onChange={(e) => setNewFinishing(e.target.value)}
        />
        <input
          type="number"
          placeholder="Harga Tambahan"
          className="border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700 col-span-1"
          value={newFinishingHargaTambahan}
          onChange={(e) => setNewFinishingHargaTambahan(e.target.value)}
        />
        <select
          className="border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700 col-span-1"
          value={newFinishingKategori}
          onChange={(e) => setNewFinishingKategori(e.target.value)}
        >
          <option value="">Pilih Kategori</option>
          <option value="cover">Cover</option>
          <option value="isi">Isi</option>
          <option value="umum">Umum</option>
        </select>
        <button
          type="button"
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 flex items-center justify-center gap-1 cursor-pointer"
          onClick={handleAddFinishing}
        >
          {isSubmitting ? (
            <>
              <Icon icon="mdi:loading" className="animate-spin" />
              Menambahkan...
            </>
          ) : (
            <>
              <Icon icon="mdi:plus" />
              Tambah Finishing
            </>
          )}
        </button>
      </div>
      {isFetching ? (
        <div className="flex justify-start items-center mt-4">
          <Icon icon="mdi:loading" className="animate-spin mr-2" />
          <p className="text-gray-500">Memuat data...</p>
        </div>
      ) : (
        <ModernTable
          headers={["Nama", "Harga Tambahan", "Kategori", "Aksi"]}
          data={tableData}
          keyField="id"
        />
      )}
    </div>
  );
};

export default FinishingTabel;