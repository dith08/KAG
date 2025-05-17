import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import api from "../../services/api";

interface Ukuran {
  id: number;
  nama: string;
}

const UkuranTabel = () => {
  const [ukuranList, setUkuranList] = useState<Ukuran[]>([]);
  const [newUkuran, setNewUkuran] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedUkuran, setEditedUkuran] = useState("");

  const fetchUkuran = async () => {
    try {
      const res = await api.get("/api/sizes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUkuranList(res.data);
    } catch (err) {
      console.error("Gagal fetch ukuran", err);
    }
  };

  const handleAddUkuran = async () => {
    if (!newUkuran.trim()) return;
    try {
      const res = await api.post(
        "/api/sizes",
        { nama: newUkuran },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUkuranList([...ukuranList, res.data]);
      setNewUkuran("");
    } catch (err) {
      console.error("Gagal tambah ukuran", err);
    }
  };

  const handleDeleteUkuran = async (id: number) => {
    try {
      await api.delete(`/api/sizes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUkuranList(ukuranList.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Gagal hapus ukuran", err);
    }
  };

  const handleUpdateUkuran = async () => {
    if (editingId === null || !editedUkuran.trim()) return;
    try {
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
      setEditingId(null);
      setEditedUkuran("");
    } catch (err) {
      console.error("Gagal update ukuran", err);
    }
  };

  useEffect(() => {
    fetchUkuran();
  }, []);

  return (
    <>
      {/* Versi Dekstop */}
      <div className="hidden lg:block overflow-x-auto rounded-xl shadow-md p-4 lg:p-6 bg-white">
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
            className="bg-yellow-500 text-white px-4 rounded-lg hover:bg-yellow-600 flex items-center gap-1"
            onClick={handleAddUkuran}
          >
            <Icon icon="mdi:plus" />
            Tambah
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl shadow-md">
          <table className="min-w-full text-sm text-left bg-white">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="p-3">Nama Ukuran</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {ukuranList.map((ukr) => (
                <tr key={ukr.id} className="border-b border-gray-200 hover:bg-green-50 transition duration-200">
                  <td className="p-3">
                    {editingId === ukr.id ? (
                      <input
                        value={editedUkuran}
                        onChange={(e) => setEditedUkuran(e.target.value)}
                        className="w-full border px-2 py-1 rounded"
                      />
                    ) : (
                      ukr.nama
                    )}
                  </td>
                  <td className="p-3 text-center space-x-2">
                    {editingId === ukr.id ? (
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={handleUpdateUkuran}
                          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                        >
                          <Icon icon="material-symbols:save" width="18" />
                          Simpan
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditedUkuran("");
                          }}
                          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          <Icon icon="mdi:cancel" width="18" />
                          Batal
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditingId(ukr.id);
                            setEditedUkuran(ukr.nama);
                          }}
                          className="text-green-700"
                        >
                          <Icon
                            icon="mdi:pencil-outline"
                            width="18"
                            height="18"
                          />
                        </button>
                        <button
                          onClick={() => handleDeleteUkuran(ukr.id)}
                          className="text-red-600"
                        >
                          <Icon
                            icon="mdi:trash-can-outline"
                            width="18"
                            height="18"
                          />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Versi Mobile */}
      <div className="lg:hidden bg-white rounded-xl shadow-md p-4">
        <h2 className="text-lg font-semibold text-green-700 flex items-center justify-center gap-1 mb-4">
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
            className="bg-yellow-500 text-white px-4 rounded-lg hover:bg-yellow-600 flex items-center gap-1"
            onClick={handleAddUkuran}
          >
            <Icon icon="mdi:plus" />
            Tambah
          </button>
        </div>

        {ukuranList.map((ukr) => (
          <div
            key={ukr.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 mb-4"
          >
            {editingId === ukr.id ? (
              <input
                value={editedUkuran}
                onChange={(e) => setEditedUkuran(e.target.value)}
                className="w-full border px-3 py-2 rounded mb-2"
              />
            ) : (
              <p className="text-sm font-medium text-gray-700 mb-2">
                {ukr.nama}
              </p>
            )}

            <div className="flex justify-end gap-2">
              {editingId === ukr.id ? (
                <>
                  <button
                    onClick={handleUpdateUkuran}
                    className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                  >
                    <Icon icon="material-symbols:save" width="18" />
                    Simpan
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditedUkuran("");
                    }}
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
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
                    className="text-green-700"
                  >
                    <Icon icon="mdi:pencil-outline" width="20" height="20" />
                  </button>
                  <button
                    onClick={() => handleDeleteUkuran(ukr.id)}
                    className="text-red-600"
                  >
                    <Icon icon="mdi:trash-can-outline" width="20" height="20" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UkuranTabel;
