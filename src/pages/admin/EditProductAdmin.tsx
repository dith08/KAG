import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import { Icon } from "@iconify/react";
import api from "../../services/api"; // sesuaikan path

// Interface Finishing
interface Finishing {
  id: number;
  productId: number;
  jenis: string;
  hargaTambahan: string;
  kategori: string;
  isEditing?: boolean;
}

// Interface Produk
interface Product {
  id: number;
  name: string;
  deskripsi?: string;
  materials?: string;
  imageUrl?: string;
  harga?: string;
  sizes?: string[];
  finishings?: Finishing[];
  available?: boolean;
}

const EditProductAdminPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [material, setMaterial] = useState<string>("");
  const [ukuran, setUkuran] = useState<string[]>([]);
  const [finishing, setFinishing] = useState<Finishing[]>([]);
  const [bahanBakuList, setBahanBakuList] = useState<any[]>([]);
  const [ukuranList, setUkuranList] = useState<any[]>([]);

  const [newUkuran, setNewUkuran] = useState<string>("");
  const [newFinishing, setNewFinishing] = useState<string>("");
  const [newFinishingHargaTambahan, setNewFinishingHargaTambahan] = useState<string>("");
  const [newFinishingKategori, setNewFinishingKategori] = useState<string>("cover");
  const [newHarga, setNewHarga] = useState<string>("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imagePreviewRef = useRef<string | null>(null);

  // Fetch bahan, ukuran, finishing, produk
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        // bahan baku
        const bahanRes = await api.get("/api/materials", {
          headers: { Authorization: `Bearer ${token}` },
        }); 
        setBahanBakuList(bahanRes.data);

        // ukuran
        const ukuranRes = await api.get("/api/sizes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUkuranList(ukuranRes.data || []);

        // finishing
        const finishingRes = await api.get("/api/finishings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFinishing(Array.isArray(finishingRes.data?.data) ? finishingRes.data : []);

        // produk
        if (id) {
          const prodRes = await api.get(`/api/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = prodRes.data;
          console.log("Data produk:", data);
          setProduct(data);
          setName(data.nama);
          setDescription(data.deskripsi || "");
          setMaterial(data.materials || "");
          setUkuran(data.sizes || []);
          setFinishing(data.finishings || []);
          setNewHarga(data.harga || "");
          setImagePreview(data.gambar || null);
        }
      } catch (err) {
        console.error("Gagal fetch data:", err);
      }
    };
    fetchData();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      if (imagePreviewRef.current) {
        URL.revokeObjectURL(imagePreviewRef.current);
      }
      const url = URL.createObjectURL(file);
      imagePreviewRef.current = url;
      setImagePreview(url);
    }
  };

  const handleAddUkuran = () => {
    if (newUkuran.trim() && !ukuran.includes(newUkuran.trim())) {
      setUkuran([...ukuran, newUkuran.trim()]);
      setNewUkuran("");
    } else {
      alert("Mohon isi ukuran terlebih dahulu dan pastikan tidak duplikat");
    }
  };

  const handleRemoveUkuran = (index: number) => {
    setUkuran(ukuran.filter((_, i) => i !== index));
  };

  const handleAddFinishing = () => {
    if (
      newFinishing.trim() !== "" &&
      newFinishingHargaTambahan.trim() !== "" &&
      newFinishingKategori.trim() !== ""
    ) {
      const newF: Finishing = {
        id: Date.now(),
        productId: product?.id || 0,
        jenis: newFinishing.trim(),
        hargaTambahan: newFinishingHargaTambahan.trim(),
        kategori: newFinishingKategori,
        isEditing: false,
      };
      setFinishing([...finishing, newF]);
      setNewFinishing("");
      setNewFinishingHargaTambahan("");
      setNewFinishingKategori("cover");
    } else {
      alert("Mohon isi semua field Finishing");
    }
  };

  const handleDeleteFinishing = (id: number) => {
    setFinishing(finishing.filter((f) => f.id !== id));
  };

  const handleEditFinishing = (id: number) => {
    setFinishing(
      finishing.map((f) =>
        f.id === id ? { ...f, isEditing: true } : { ...f, isEditing: false }
      )
    );
  };

  const handleSaveEditFinishing = (
    id: number,
    jenis: string,
    hargaTambahan: string,
    kategori: string
  ) => {
    setFinishing(
      finishing.map((f) =>
        f.id === id ? { ...f, jenis, hargaTambahan, kategori, isEditing: false } : f
      )
    );
  };

  const handleCancelEdit = (id: number) => {
    setFinishing(
      finishing.map((f) => (f.id === id ? { ...f, isEditing: false } : f))
    );
  };

  const handleSave = async () => {
    if (!product) return;

    try {
      // Membuat FormData
      const formData = new FormData();

      // Tambahkan data produk
      formData.append("nama", name);
      formData.append("deskripsi", description);
      formData.append("harga", String(newHarga));

      if (imageFile) {
        formData.append("gambar", imageFile);
      }

      // Tambahkan list ukuran
      ukuran.forEach((size) => {
        formData.append("ukuran[]", size);
      });

      // Tambahkan list finishing
      finishing.forEach((f) => {
        formData.append("finishing[]", JSON.stringify(f));
      });

      // Tambahkan data lainnya dari produk yang sudah di-fetch
      // Pastikan data ini konsisten dengan backend
      // Jika backend perlu data lain, tambahkan di sini

      const token = localStorage.getItem("token");
      
      // Kirim data ke API
      await api.put(`/api/products/${product.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Produk berhasil disimpan");
      navigate("/admin/produk");
    } catch (err) {
      console.error("Gagal update:", err);
      alert("Gagal menyimpan produk");
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin />
      <SidebarAdmin />
      <div className="md:ml-64 pt-28 px-4 md:px-8 pb-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto space-y-6"
        >
          {/* Header */}
          <div className="flex flex-row items-center justify-between gap-4 mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-green-700 flex items-center gap-2">
              <Icon icon="mdi:archive-edit" className="w-7 h-7 md:w-9 md:h-9" />
              Edit Produk
            </h1>
            <div
              onClick={() =>
                setProduct({ ...product, available: !product.available })
              }
              className={`cursor-pointer flex items-center gap-2 p-2 md:p-3 rounded-lg transition-all duration-300 ${
                product.available
                  ? "bg-green-100 hover:bg-green-200"
                  : "bg-red-100 hover:bg-red-200"
              }`}
            >
              <div
                className={`w-3 md:w-4 h-3 md:h-4 rounded-full ${
                  product.available ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span
                className={`hidden md:block text-sm md:text-base font-medium ${
                  product.available ? "text-green-700" : "text-red-700"
                }`}
              >
                {product.available ? "Produk Tersedia" : "Produk Tidak Tersedia"}
              </span>
              <Icon
                icon={product.available ? "mdi:check-circle" : "mdi:close-circle"}
                className={`ml-1 md:ml-2 w-4 md:w-5 h-4 md:h-5 ${
                  product.available ? "text-green-600" : "text-red-600"
                }`}
              />
            </div>
          </div>

          {/* Nama Produk */}
          <div>
            <label className="block mb-1 font-semibold">Nama Produk</label>
            <input
              type="text"
              className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-xl shadow"
                />
              </div>
            )}
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block mb-1 font-semibold">Deskripsi Produk</label>
            <textarea
              className="w-full border border-black/50 rounded-lg min-h-[100px] p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={`- Masukkan deskripsi produk dalam bentuk list\n- Gunakan tanda (-) untuk setiap poin`}
            />
          </div>

          {/* Bahan */}
          <div>
            <label className="block mb-1 font-semibold">Bahan</label>
            <select
              className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            >
              <option value="">Pilih Bahan</option>
              {bahanBakuList.map((bahan) => (
                <option key={bahan.id} value={bahan.id}>
                  {bahan.nama}
                </option>
              ))}
            </select>
          </div>

          {/* Ukuran */}
          <div>
            <label className="block mb-1 font-semibold">Ukuran</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                value={newUkuran}
                onChange={(e) => setNewUkuran(e.target.value)}
              />
              <button
                type="button"
                className="bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-green-600"
                onClick={handleAddUkuran}
              >
                <Icon icon="mdi:plus" />
                Tambah
              </button>
            </div>
            {/* Daftar Ukuran */}
            <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
              {ukuran.map((size, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{size}</span>
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleRemoveUkuran(index)}
                  >
                    <Icon icon="mdi:trash-can-outline" width={18} height={18} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Finishing */}
          <div>
            <label className="block mb-1 font-semibold">Finishing</label>
            {/* Input Finishing Baru */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2 items-center">
              {/* Nama Finishing */}
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
              {/* Kategori */}
              <select
                className="border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700 col-span-1"
                value={newFinishingKategori}
                onChange={(e) => setNewFinishingKategori(e.target.value)}
              >
                <option value="cover">Cover</option>
                <option value="isi">Isi</option>
                <option value="umum">Umum</option>
              </select>
            </div>
            {/* Tombol Tambah Finishing */}
            <button
              type="button"
              className="bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-green-600"
              onClick={handleAddFinishing}
            >
              <Icon icon="mdi:plus" /> Tambah Finishing
            </button>
            {/* Daftar Finishing */}
            <ul className="mt-4 space-y-3">
              {finishing.map((f) => (
                <li
                  key={f.id}
                  className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                >
                  {f.isEditing ? (
                    <div className="grid sm:grid-cols-4 gap-3 items-center">
                      <input
                        type="text"
                        value={f.jenis}
                        onChange={(e) =>
                          setFinishing(
                            finishing.map((item) =>
                              item.id === f.id
                                ? { ...item, jenis: e.target.value }
                                : item
                            )
                          )
                        }
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                      <input
                        type="number"
                        value={f.hargaTambahan}
                        onChange={(e) =>
                          setFinishing(
                            finishing.map((item) =>
                              item.id === f.id
                                ? { ...item, hargaTambahan: e.target.value }
                                : item
                            )
                          )
                        }
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                      />
                      <select
                        value={f.kategori}
                        onChange={(e) =>
                          setFinishing(
                            finishing.map((item) =>
                              item.id === f.id
                                ? { ...item, kategori: e.target.value }
                                : item
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
                              f.jenis,
                              f.hargaTambahan,
                              f.kategori
                            )
                          }
                        >
                          <Icon icon="material-symbols:save" width={20} />
                          Simpan
                        </button>
                        <button
                          type="button"
                          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          onClick={() => handleCancelEdit(f.id)}
                        >
                          <Icon icon="mdi:cancel" width={20} />
                          Batal
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="text-gray-800 font-medium">
                        {f.jenis} - Rp {Number(f.hargaTambahan).toLocaleString()} ({f.kategori})
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="flex items-center gap-1 text-blue-600 hover:underline"
                          onClick={() => handleEditFinishing(f.id)}
                        >
                          <Icon icon="mdi:pencil" width={20} />
                          Edit
                        </button>
                        <button
                          type="button"
                          className="flex items-center gap-1 text-red-600 hover:underline"
                          onClick={() => handleDeleteFinishing(f.id)}
                        >
                          <Icon icon="mdi:trash-can" width={20} />
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
              value={newHarga}
              onChange={(e) => setNewHarga(e.target.value)}
            />
          </div>

          {/* Button */}
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

export default EditProductAdminPage;