// components/admin/FinishingTabel.tsx
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import api from "../../services/api";
import { useToast } from "../toast/useToast";
import ConfirmPopup from "../ConfirmPopup";

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

  const handleSaveEditFinishing = async (
    id: number,
    updatedNama: string,
    updatedHarga: string,
    updatedKategori: string
  ) => {
    try {
      setIsUpdating(true);
      const token = localStorage.getItem("token");
      await api.put(
        `/api/finishings/${id}`,
        {
          nama: updatedNama,
          harga_tambahan: updatedHarga,
          kategori: updatedKategori,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showToast("Finishing berhasil diperbarui", "success");
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
    setFinishingList(
      finishingList.map((f) =>
        f.id === id ? { ...f, isEditing: true } : { ...f, isEditing: false }
      )
    );
  };

  const handleCancelEdit = (id: number) => {
    setFinishingList(
      finishingList.map((f) => (f.id === id ? { ...f, isEditing: false } : f))
    );
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
      <h2 className="text-lg font-semibold text-green-700 flex items-center gap-1 justify-center text-center lg:justify-start lg:text-left">
        <Icon icon="mdi:star-box-multiple" className="w-5 h-5" />
        Finishing
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2 items-center mt-4">
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
      </div>

      <button
        type="button"
        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 flex items-center gap-1 cursor-pointer"
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

      {/* Versi Desktop */}
      {isFetching ? (
        <div className="flex justify-start items-center mt-4">
          <Icon icon="mdi:loading" className="animate-spin mr-2" />
          <p className="text-gray-500">Memuat data...</p>
        </div>
      ) : (
        <div className="hidden lg:block overflow-x-auto rounded-xl shadow-md mt-4">
          <table className="min-w-full text-sm text-left bg-white">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-3 py-2">Nama</th>
                <th className="px-3 py-2">Harga Tambahan</th>
                <th className="px-3 py-2">Kategori</th>
                <th className="px-3 py-2 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {finishingList.map((f, index) => (
                <>
                  {index > 0 && (
                    <tr>
                      <td colSpan={4} className="border-b border-gray-200"></td>
                    </tr>
                  )}
                  <tr
                    key={f.id}
                    className="hover:bg-green-50 transition duration-200"
                  >
                    {f.isEditing ? (
                      <>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={f.nama}
                            onChange={(e) =>
                              setFinishingList(
                                finishingList.map((item) =>
                                  item.id === f.id
                                    ? { ...item, nama: e.target.value }
                                    : item
                                )
                              )
                            }
                            className="w-full border rounded px-2 py-1"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={f.harga_tambahan}
                            onChange={(e) =>
                              setFinishingList(
                                finishingList.map((item) =>
                                  item.id === f.id
                                    ? {
                                        ...item,
                                        harga_tambahan: e.target.value,
                                      }
                                    : item
                                )
                              )
                            }
                            className="w-full border rounded px-2 py-1"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <select
                            value={f.kategori}
                            onChange={(e) =>
                              setFinishingList(
                                finishingList.map((item) =>
                                  item.id === f.id
                                    ? { ...item, kategori: e.target.value }
                                    : item
                                )
                              )
                            }
                            className="w-full border rounded px-2 py-1"
                          >
                            <option value="cover">Cover</option>
                            <option value="isi">Isi</option>
                            <option value="umum">Umum</option>
                          </select>
                        </td>
                        <td className="px-3 py-2 text-center">
                          <div className="flex gap-2 justify-center">
                            <button
                              type="button"
                              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded cursor-pointer"
                              onClick={() =>
                                handleSaveEditFinishing(
                                  f.id,
                                  f.nama,
                                  f.harga_tambahan,
                                  f.kategori
                                )
                              }
                            >
                              {isUpdating ? (
                                <>
                                  <Icon
                                    icon="mdi:loading"
                                    className="animate-spin"
                                  />
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
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-3 py-2">{f.nama}</td>
                        <td className="px-3 py-2">
                          Rp {Number(f.harga_tambahan).toLocaleString()}
                        </td>
                        <td className="px-3 py-2 capitalize">{f.kategori}</td>
                        <td className="px-3 py-2 text-center">
                          <div className="flex gap-2 justify-center">
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
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                </>
              ))}
            </tbody>{" "}
          </table>
        </div>
      )}
      {/* Versi Mobile */}
      <div className="lg:hidden space-y-4 mt-4">
        {finishingList.map((f) => (
          <div
            key={f.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            {f.isEditing ? (
              <>
                <input
                  type="text"
                  value={f.nama}
                  onChange={(e) =>
                    setFinishingList(
                      finishingList.map((item) =>
                        item.id === f.id
                          ? { ...item, nama: e.target.value }
                          : item
                      )
                    )
                  }
                  className="w-full border rounded px-2 py-1 mb-2"
                  placeholder="Nama Finishing"
                />
                <input
                  type="number"
                  value={f.harga_tambahan}
                  onChange={(e) =>
                    setFinishingList(
                      finishingList.map((item) =>
                        item.id === f.id
                          ? { ...item, harga_tambahan: e.target.value }
                          : item
                      )
                    )
                  }
                  className="w-full border rounded px-2 py-1 mb-2"
                  placeholder="Harga Tambahan"
                />
                <select
                  value={f.kategori}
                  onChange={(e) =>
                    setFinishingList(
                      finishingList.map((item) =>
                        item.id === f.id
                          ? { ...item, kategori: e.target.value }
                          : item
                      )
                    )
                  }
                  className="w-full border rounded px-2 py-1 mb-2"
                >
                  <option value="cover">Cover</option>
                  <option value="isi">Isi</option>
                  <option value="umum">Umum</option>
                </select>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm cursor-pointer"
                    onClick={() =>
                      handleSaveEditFinishing(
                        f.id,
                        f.nama,
                        f.harga_tambahan,
                        f.kategori
                      )
                    }
                  >
                    {isUpdating ? (
                      <>
                        <Icon icon="mdi:loading" className="animate-spin" />
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Icon icon="mdi:content-save" width="18" />
                        Simpan
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm cursor-pointer"
                    onClick={() => handleCancelEdit(f.id)}
                  >
                    <Icon icon="mdi:cancel" width="18" />
                    Batal
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  <span className="font-semibold">Nama:</span> {f.nama}
                </p>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  <span className="font-semibold">Harga Tambahan:</span> Rp{" "}
                  {Number(f.harga_tambahan).toLocaleString()}
                </p>
                <p className="text-sm font-medium text-gray-700 mb-2 capitalize">
                  <span className="font-semibold">Kategori:</span> {f.kategori}
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="text-green-700 cursor-pointer"
                    onClick={() => handleEditFinishing(f.id)}
                  >
                    <Icon icon="mdi:pencil-outline" width="20" />
                  </button>
                  <button
                    type="button"
                    className="text-red-600 cursor-pointer"
                    onClick={() => handleOpenPopup(f.id)}
                  >
                    <Icon icon="mdi:trash-can-outline" width="20" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinishingTabel;
