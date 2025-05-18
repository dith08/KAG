/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import { Icon } from "@iconify/react";
import api from "../../services/api";
import { useToast } from "../../components/toast/useToast";

const AddProductAdminPage: React.FC = () => {
  interface OptionItem {
    id: number;
    nama: string;
    kategori: string;
  }

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const [sizeList, setSizeList] = useState<OptionItem[]>([]);
  const [newSize, setNewSize] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);

  const [finishingList, setFinishingList] = useState<OptionItem[]>([]);
  const [newFinishing, setNewFinishing] = useState("");
  const [finishings, setFinishings] = useState<string[]>([]);

  const [materialList, setMaterialList] = useState<OptionItem[]>([]);
  const [newMaterial, setNewMaterial] = useState("");
  const [materials, setMaterials] = useState<string[]>([]);

  const [name, setName] = useState<string>("");
  const [product, setProduct] = useState<{
    description: string;
    material: string;
  }>({ description: "", material: "" });
  const [price, setPrice] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchBahan = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/api/materials", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMaterialList(response.data);
      } catch (error) {
        showToast("Gagal mengambil data bahan baku", "error");
        console.error("Gagal mengambil data bahan baku", error);
      }
    };
    fetchBahan();
  }, [showToast]);

  useEffect(() => {
    const fetchSizeAndFinishing = async () => {
      try {
        const token = localStorage.getItem("token");

        const [sizeRes, finishingRes] = await Promise.all([
          api.get("/api/sizes", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("/api/finishings", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setSizeList(sizeRes.data);
        setFinishingList(finishingRes.data.data);
      } catch (error) {
        showToast("Gagal mengambil data ukuran dan finishing", "error");
        console.error("Gagal mengambil data ukuran dan finishing:", error);
      }
    };

    fetchSizeAndFinishing();
  }, [showToast]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
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

    const materialIdList = materials;
    const sizeIdList = sizes;
    const finishingIdList = finishings;

    materialIdList.forEach((id) =>
      formData.append("material_ids[]", String(id))
    );
    sizeIdList.forEach((id) => formData.append("size_ids[]", String(id)));
    finishingIdList.forEach((id) =>
      formData.append("finishing_ids[]", String(id))
    );

    try {
      setIsLoading(true);
      const res = await api.post("/api/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      showToast("Produk berhasil ditambahkan!", "success");
      console.log("Produk berhasil ditambah:", res.data);
      navigate("/admin/produk");
    } catch (err: any) {
      console.error("Gagal tambah produk:", err);

      if (err.response?.status === 422) {
        showToast("Validasi gagal. Cek data yang dimasukkan.", "error");
      } else if (err.response?.status === 500) {
        showToast(
          "Terjadi kesalahan di server. Cek data atau coba lagi nanti.",
          "error"
        );
      } else {
        showToast("Gagal tambah produk. Cek koneksi atau coba lagi.", "error");
      }
    } finally {
      setIsLoading(false);
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
                className="mt-3 w-40 h-40 object-contain rounded-lg border"
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
            <div className="flex gap-2 mb-2">
              <select
                className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                value={newMaterial}
                onChange={(e) => {
                  const selected = e.target.value;
                  if (selected && !materials.includes(selected)) {
                    setMaterials([...materials, selected]);
                  }
                  setNewMaterial("");
                }}
              >
                <option value="">Pilih Bahan</option>
                {materialList.map((item) => (
                  <option
                    key={item.id}
                    value={item.id.toString()}
                    disabled={materials.includes(item.id.toString())}
                  >
                    {item.nama} ({item.kategori})
                  </option>
                ))}
              </select>
            </div>

            <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
              {materials.map((mat, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>
                    {materialList.find((m) => m.id === Number(mat))?.nama} (
                    {materialList.find((m) => m.id === Number(mat))?.kategori})
                  </span>
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-800"
                    onClick={() =>
                      setMaterials(materials.filter((_, i) => i !== index))
                    }
                  >
                    <Icon icon="mdi:trash-can-outline" width={18} height={18} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Ukuran */}
          <div>
            <label className="block mb-1 font-semibold">Ukuran</label>
            <div className="flex gap-2 mb-2">
              <select
                className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                value={newSize}
                onChange={(e) => {
                  const selected = e.target.value;
                  if (selected && !sizes.includes(selected)) {
                    setSizes([...sizes, selected]);
                  }
                  setNewSize("");
                }}
              >
                <option value="">Pilih Ukuran</option>
                {sizeList.map((item) => (
                  <option
                    key={item.id}
                    value={item.id.toString()}
                    disabled={sizes.includes(item.id.toString())}
                  >
                    {item.nama}
                  </option>
                ))}
              </select>
            </div>

            <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
              {sizes.map((sz, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>
                    {sizeList.find((uk) => uk.id === Number(sz))?.nama}
                  </span>
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-800"
                    onClick={() =>
                      setSizes(sizes.filter((_, i) => i !== index))
                    }
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
            <div className="flex gap-2 mb-2">
              <select
                className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                value={newFinishing}
                onChange={(e) => {
                  const selected = e.target.value;
                  if (selected && !finishings.includes(selected)) {
                    setFinishings([...finishings, selected]);
                  }
                  setNewFinishing("");
                }}
              >
                <option value="">Pilih Finishing</option>
                {finishingList.map((item) => (
                  <option
                    key={item.id}
                    value={item.id.toString()}
                    disabled={finishings.includes(item.id.toString())}
                  >
                    {item.nama} ({item.kategori})
                  </option>
                ))}
              </select>
            </div>

            <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
              {finishings.map((fns, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>
                    {finishingList.find((f) => f.id === Number(fns))?.nama} (
                    {finishingList.find((f) => f.id === Number(fns))?.kategori})
                  </span>
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-800"
                    onClick={() =>
                      setFinishings(finishings.filter((_, i) => i !== index))
                    }
                  >
                    <Icon icon="mdi:trash-can-outline" width={18} height={18} />
                  </button>
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

export default AddProductAdminPage;
