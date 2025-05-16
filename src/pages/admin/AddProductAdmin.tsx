import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import { Icon } from "@iconify/react";
import api from "../../services/api";

type Finishing = {
  id: number;
  nama: string;
  harga_tambahan: string;
  kategori: string;
  isEditing?: boolean;
};

type BahanBaku = {
  id: number;
  nama: string;
  stok: number;
  satuan: string;
  harga: string;
  kategori: "cover" | "isi" | "umum";
};

const AddProductAdminPage: React.FC = () => {
  const navigate = useNavigate();

  const [ukuranList, setUkuranList] = useState<any[]>([]);
  const [newUkuran, setNewUkuran] = useState("");

  const [finishingList, setFinishingList] = useState<Finishing[]>([]);
  const [newFinishing, setNewFinishing] = useState("");
  const [newFinishingHargaTambahan, setNewFinishingHargaTambahan] = useState("");
  const [newFinishingKategori, setNewFinishingKategori] = useState("");

  const [name, setName] = useState<string>("");
  const [product, setProduct] = useState<{ description: string, material: string }>({ description: "", material: "" });
  const [price, setPrice] = useState<string>(""); // simpan string supaya bisa dikontrol inputnya
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [bahanBakuList, setBahanBakuList] = useState<BahanBaku[]>([]);

  useEffect(() => {
    const fetchBahan = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/api/materials", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBahanBakuList(response.data); // sesuaikan kalau respons beda
      } catch (error) {
        console.error("Gagal mengambil data bahan baku", error);
      }
    };
    fetchBahan();
  }, []);

  useEffect(() => {
    fetchUkuranList();
  }, []);

  const fetchUkuranList = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/api/sizes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUkuranList(response.data || []);
    } catch (error) {
      console.error("Gagal mengambil ukuran:", error);
    }
  };

  const handleAddUkuran = async () => {
    if (!newUkuran.trim()) return;
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/api/sizes",
        { nama: newUkuran.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewUkuran("");
      fetchUkuranList(); // refresh list
    } catch (error) {
      console.error("Gagal menambahkan ukuran:", error);
    }
  };

  const handleDeleteUkuran = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/api/sizes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUkuranList(); // refresh list
    } catch (error) {
      console.error("Gagal menghapus ukuran:", error);
    }
  };


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    fetchFinishingList();
  }, []);

  const fetchFinishingList = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/api/finishings", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data?.data;

      // Pastikan data adalah array
      if (Array.isArray(data)) {
        setFinishingList(data);
      } else {
        console.error("Data finishing bukan array:", data);
        setFinishingList([]); // fallback kosong
      }
    } catch (err) {
      console.error("Gagal mengambil finishing:", err);
      setFinishingList([]); // fallback agar .map tetap aman
    }
  };

  const handleAddFinishing = async () => {
    if (!newFinishing || !newFinishingHargaTambahan || !newFinishingKategori) {
      alert("Mohon isi semua field");
      return;
    }

    try {
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
      setNewFinishing("");
      setNewFinishingHargaTambahan("");
      setNewFinishingKategori("");
      fetchFinishingList(); // refresh list
    } catch (err: any) {
      console.error("Gagal menambah finishing:", err.response?.data || err.message);
      alert("Gagal menambah finishing: " + JSON.stringify(err.response?.data?.errors || err.response?.data || err.message));
    }
  };

  const handleDeleteFinishing = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/api/finishings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchFinishingList();
    } catch (err) {
      console.error("Gagal menghapus finishing:", err);
    }
  };

  const handleSaveEditFinishing = async (id: number, updatednama: string, updatedHarga: string, updatedKategori: string) => {
    try {
      const token = localStorage.getItem("token");
      await api.put(
        `/api/finishings/${id}`,
        {
          nama: updatednama,
          harga_tambahan: updatedHarga,
          kategori: updatedKategori,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchFinishingList(); // refresh
    } catch (err) {
      console.error("Gagal mengedit finishing:", err);
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
      finishingList.map((f) =>
        f.id === id ? { ...f, isEditing: false } : f
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token tidak ditemukan. Silakan login ulang.");
      return;
    }

    const formData = new FormData();
    formData.append("nama", name);
    formData.append("deskripsi", product.description);
    formData.append("harga", price);

    if (imageFile) {
      formData.append("gambar", imageFile);
    }

    // Ubah list menjadi FormData array (pakai tanda [] di nama field)
    const materialIdList = product.material ? [Number(product.material)] : [];
    const sizeIdList = ukuranList.map((ukr) => ukr.id);
    const finishingIdList = finishingList.map((f) => f.id);

    materialIdList.forEach((id) => formData.append("material_ids[]", String(id)));
    sizeIdList.forEach((id) => formData.append("size_ids[]", String(id)));
    finishingIdList.forEach((id) => formData.append("finishing_ids[]", String(id)));

    try {
      const res = await api.post("/api/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Produk berhasil ditambah:", res.data);
      navigate("/admin/produk");
    } catch (err: any) {
      console.error("Gagal tambah produk:", err);

      if (err.response?.status === 422) {
        alert("Validasi gagal. Cek data yang dimasukkan.");
      } else if (err.response?.status === 500) {
        alert("Terjadi kesalahan di server. Cek data atau coba lagi nanti.");
      } else {
        alert("Gagal tambah produk, cek console untuk detail.");
      }
    }
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin />
      <SidebarAdmin />
      <div className="md:ml-64 pt-28 px-4 md:px-8 pb-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto space-y-6"
        >
          {/* Header */}
          <h1 className="text-2xl sm:text-3xl font-bold text-green-700 flex items-center gap-2">
            <Icon icon="mdi:archive-plus" className="w-9 h-9" />
            Tambah Produk
          </h1>

          {/* Nama Produk */}
          <div>
            <label className="block mb-1 font-semibold">Nama Produk</label>
            <input
              type="text"
              className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Gambar Produk */}
          <div>
            <label className="block mb-1 font-semibold">Gambar Produk</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 w-40 h-40 object-cover rounded-lg border"
              />
            )}
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block mb-1 font-semibold">Deskripsi Produk</label>
            <textarea
              className="w-full border border-black/50 rounded-lg min-h-[100px] p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              placeholder="- Masukkan deskripsi produk dalam bentuk list 
- Gunakan tanda (-) untuk setiap poin"
            />
          </div>

          {/* Bahan */}
          <div>
            <label className="block mb-1 font-semibold">Bahan</label>
            <select
              className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
              value={product.material}
              onChange={(e) =>
                setProduct({ ...product, material: e.target.value })
              }
            >
              <option value="">Pilih Bahan</option>
              {bahanBakuList?.map((bahan) => (
                <option key={bahan.id} value={bahan.id}>
                  {bahan.nama}
                </option>
              ))}
            </select>
          </div>

          {/* Ukuran */}
          <div>
            <label className="block mb-1 font-semibold">Ukuran</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                value={newUkuran}
                onChange={(e) => setNewUkuran(e.target.value)}
              />
              <button
                type="button"
                className="bg-green-700 text-white px-4 rounded-lg hover:bg-green-600 flex items-center gap-1 cursor-pointer"
                onClick={handleAddUkuran}
              >
                <Icon icon="mdi:plus" />
                Tambah
              </button>
            </div>

            <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
              {ukuranList.map((ukr) => (
                <li key={ukr.id} className="flex justify-between items-center">
                  <span>{ukr.nama}</span>
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteUkuran(ukr.id)}
                  >
                    <Icon icon="mdi:trash-can-outline" width="18" height="18" />
                  </button>
                </li>
              ))}
            </ul>
          </div>


          {/* Finishing */}
          <div>
            <label className="block mb-1 font-semibold">Finishing</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2 items-center">
              {/* nama Finishing */}
              <input
                type="text"
                placeholder="Nama Finishing"
                className="border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700 col-span-1"
                value={newFinishing}
                onChange={(e) => setNewFinishing(e.target.value)}
              />
              {/* Harga Tambahan */}
              <input
                type="number"
                placeholder="Harga Tambahan"
                className="border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700 col-span-1"
                value={newFinishingHargaTambahan}
                onChange={(e) => setNewFinishingHargaTambahan(e.target.value)}
              />
              {/* Kategori Finishing */}
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
              className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-1 cursor-pointer"
              onClick={handleAddFinishing}
            >
              <Icon icon="mdi:plus" /> Tambah Finishing
            </button>
            {/* Daftar Finishing dengan aksi edit & hapus */}
            <ul className="mt-4 space-y-3">
              {finishingList.map((f) => (
                <li
                  key={f.id}
                  className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                >
                  {f.isEditing ? (
                    <div className="grid sm:grid-cols-4 gap-3 items-center">
                      <input
                        type="text"
                        value={f.nama}
                        onChange={(e) =>
                          setFinishingList(
                            finishingList.map((item) =>
                              item.id === f.id ? { ...item, nama: e.target.value } : item
                            )
                          )
                        }
                        placeholder="Nama Finishing"
                        className="border border-gray-300 rounded px-2 py-1 w-full"
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
                        placeholder="Harga Tambahan"
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                      <select
                        value={f.kategori}
                        onChange={(e) =>
                          setFinishingList(
                            finishingList.map((item) =>
                              item.id === f.id ? { ...item, kategori: e.target.value } : item
                            )
                          )
                        }
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      >
                        <option value="cover">Cover</option>
                        <option value="isi">Isi</option>
                        <option value="umum">Umum</option>
                      </select>
                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                          onClick={() =>
                            handleSaveEditFinishing(
                              f.id,
                              f.nama,
                              f.harga_tambahan,
                              f.kategori
                            )
                          }
                        >
                          <Icon icon="material-symbols:save" width="20" />
                          Simpan
                        </button>
                        <button
                          type="button"
                          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          onClick={() => handleCancelEdit(f.id)}
                        >
                          <Icon icon="mdi:cancel" width="20" />
                          Batal
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="text-gray-800 font-medium">
                        {f.nama} - Rp {Number(f.harga_tambahan).toLocaleString()} (
                        {f.kategori})
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="flex items-center gap-1 text-blue-600 hover:underline"
                          onClick={() => handleEditFinishing(f.id)}
                        >
                          <Icon icon="mdi:pencil" width="20" />
                          Edit
                        </button>
                        <button
                          type="button"
                          className="flex items-center gap-1 text-red-600 hover:underline"
                          onClick={() => handleDeleteFinishing(f.id)}
                        >
                          <Icon icon="mdi:trash-can" width="20" />
                          Hapus
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Harga */}
          <div>
            <label className="block mb-1 font-semibold">
              Harga per PCS (Rp)
            </label>
            <input
              type="number"
              min="0"
              className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* Tombol */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 flex items-center gap-1 cursor-pointer"
              onClick={() => navigate("/admin/produk")}
            >
              <Icon icon="mdi:arrow-left" /> Batal
            </button>
            <button
              type="submit"
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 flex items-center gap-1 cursor-pointer"
            >
              <Icon icon="mdi:content-save" /> Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductAdminPage;