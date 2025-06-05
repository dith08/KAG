import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import api from "../../services/api";
import { useToast } from "../toast/useToast";
import ConfirmPopup from "../ConfirmPopup";
import { ModernTable } from "../../components/admin/ModernTable";

interface Ukuran {
  id: number;
  nama: string;
}

const UkuranTabel = () => {
  const [ukuranList, setUkuranList] = useState<Ukuran[]>([]);
  const [newUkuran, setNewUkuran] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedUkuran, setEditedUkuran] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const fetchUkuran = async () => {
    try {
      setIsFetching(true);
      const res = await api.get("/api/sizes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUkuranList(res.data);
    } catch (err) {
      console.error("Gagal fetch ukuran", err);
    } finally {
      setIsFetching(false);
    }
  };

  const handleAddUkuran = async () => {
    if (!newUkuran.trim()) {
      showToast("Mohon isi semua kolom", "error");
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await api.post(
        "/api/sizes",
        { nama: newUkuran },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      showToast("Ukuran berhasil ditambahkan!", "success");
      setUkuranList([...ukuranList, res.data]);
      setNewUkuran("");
    } catch (err) {
      showToast("Gagal menambahkan ukuran.", "error");
      console.error("Gagal tambah ukuran", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUkuran = async (id: number) => {
    try {
      await api.delete(`/api/sizes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      showToast("Ukuran berhasil dihapus!", "success");
      setUkuranList(ukuranList.filter((item) => item.id !== id));
    } catch (err) {
      showToast("Gagal menghapus ukuran.", "error");
      console.error("Gagal hapus ukuran", err);
    }
  };

  const handleUpdateUkuran = async () => {
    if (editingId === null || !editedUkuran.trim()) return;
    try {
      setIsUpdating(true);
      const res = await api.put(
        `/api/sizes/${editingId}`,
        { nama: editedUkuran },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUkuranList(
        ukuranList.map((ukr) =>
          ukr.id === editingId ? { ...ukr, nama: res.data.nama } : ukr
        )
      );
      showToast("Ukuran berhasil diperbarui!", "success");
      setEditingId(null);
      setEditedUkuran("");
    } catch (err) {
      showToast("Gagal memperbarui ukuran.", "error");
      console.error("Gagal update ukuran", err);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchUkuran();
  }, []);

  const handleConfirm = () => {
    if (selectedId !== null) {
      handleDeleteUkuran(selectedId);
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

  const tableData = ukuranList.map((ukr) => ({
    "Nama Ukuran": editingId === ukr.id ? (
      <input
        value={editedUkuran}
        onChange={(e) => setEditedUkuran(e.target.value)}
        className="w-full border px-2 py-1 rounded"
      />
    ) : (
      ukr.nama
    ),
    Aksi: (
      <div className="flex space-x-2">
        {editingId === ukr.id ? (
          <>
            <button
              onClick={handleUpdateUkuran}
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded cursor-pointer"
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
              onClick={() => {
                setEditingId(null);
                setEditedUkuran("");
              }}
              className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
            >
              <Icon icon="mdi:cancel" width="18" />
              Batal
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setEditingId(ukr.id);
                setEditedUkuran(ukr.nama);
              }}
              className="text-green-700 cursor-pointer"
            >
              <Icon icon="mdi:pencil-outline" width="18" height="18" />
            </button>
            <button
              onClick={() => handleOpenPopup(ukr.id)}
              className="text-red-600 cursor-pointer"
            >
              <Icon icon="mdi:trash-can-outline" width="18" height="18" />
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
        message="Apakah Anda yakin ingin hapus ukuran ini?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onClose={() => setIsPopupOpen(false)}
        title="Hapus Ukuran"
      />
      <h2 className="text-lg font-semibold text-green-700 flex items-center gap-1 mb-4">
        <Icon icon="mdi:ruler" className="w-5 h-5" />
        Data Ukuran
      </h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
          value={newUkuran}
          onChange={(e) => setNewUkuran(e.target.value)}
          placeholder="Tambah ukuran baru"
        />
        <button
          type="button"
          className="bg-yellow-500 text-white px-4 rounded-lg hover:bg-yellow-600 disabled:bg-yellow-500 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
          onClick={handleAddUkuran}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Icon icon="mdi:loading" className="animate-spin" />
              Menambahkan...
            </>
          ) : (
            <>
              <Icon icon="mdi:plus" />
              Tambah
            </>
          )}
        </button>
      </div>

      {isFetching ? (
        <div className="flex justify-start items-center">
          <Icon icon="mdi:loading" className="animate-spin mr-2" />
          <p className="text-gray-500">Memuat data...</p>
        </div>
      ) : (
        <ModernTable
          headers={["Nama Ukuran", "Aksi"]}
          data={tableData}
          keyField="id"
        />
      )}
    </div>
  );
};

export default UkuranTabel;