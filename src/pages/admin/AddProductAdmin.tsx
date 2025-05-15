import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import { Icon } from "@iconify/react";

interface Finishing {
  id: number;
  jenis: string;
  hargaTambahan: string;
  kategori: string;
  isEditing?: boolean; // Tambahkan properti untuk mode edit inline
}

interface Product {
  description: string;
  material: string;
}

const AddProductAdminPage: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [ukuranList, setUkuranList] = useState<string[]>([]);
  const [finishingList, setFinishingList] = useState<Finishing[]>([]);

  const [newUkuran, setNewUkuran] = useState("");
  const [newFinishingJenis, setNewFinishingJenis] = useState("");
  const [newFinishingHargaTambahan, setNewFinishingHargaTambahan] = useState("");
  const [newFinishingKategori, setNewFinishingKategori] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [price, setPrice] = useState<number | string>("");
  const [product, setProduct] = useState<Product>({
    description: "",
    material: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddUkuran = () => {
    if (newUkuran.trim()) {
      setUkuranList([...ukuranList, newUkuran.trim()]);
      setNewUkuran("");
    }
  };

  const handleAddFinishing = () => {
    if (
      newFinishingJenis.trim() !== "" &&
      newFinishingHargaTambahan.trim() !== "" &&
      newFinishingKategori.trim() !== ""
    ) {
      setFinishingList([
        ...finishingList,
        {
          id: Date.now(),
          jenis: newFinishingJenis,
          hargaTambahan: newFinishingHargaTambahan,
          kategori: newFinishingKategori,
        },
      ]);
      setNewFinishingJenis("");
      setNewFinishingHargaTambahan("");
      setNewFinishingKategori("");
    } else {
      alert("Mohon isi semua field: kategori, jenis, dan harga");
    }
  };

  const handleDeleteFinishing = (id: number) => {
    setFinishingList(finishingList.filter((f) => f.id !== id));
  };

  const handleEditFinishing = (id: number) => {
    setFinishingList(
      finishingList.map((f) =>
        f.id === id ? { ...f, isEditing: true } : f
      )
    );
  };

  const handleSaveEditFinishing = (id: number, updatedJenis: string, updatedHarga: string, updatedKategori: string) => {
    setFinishingList(
      finishingList.map((f) =>
        f.id === id
          ? {
              ...f,
              jenis: updatedJenis,
              hargaTambahan: updatedHarga,
              kategori: updatedKategori,
              isEditing: false,
            }
          : f
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      name,
      ukuran: ukuranList.join(", "),
      finishing: finishingList,
      image: imageFile,
      price,
      description: product.description,
      material: product.material,
    };
    console.log("Produk Ditambahkan:", newProduct);
    // Setelah submit, redirect atau reset form sesuai kebutuhan
    navigate("/admin/produk");
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
                className="mt-3 w-full max-h-60 object-cover rounded-lg border"
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
              placeholder="- Masukkan deskripsi produk dalam bentuk list \n- Gunakan tanda (-) untuk setiap poin"
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
              <option value="kayu">Kayu</option>
              <option value="mdf">MDF</option>
              <option value="multiplek">Multiplek</option>
              <option value="hpl">HPL</option>
              <option value="taco">Taco</option>
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
              {ukuranList.map((ukr, idx) => (
                <li key={idx}>{ukr}</li>
              ))}
            </ul>
          </div>

          {/* Finishing */}
          <div>
            <label className="block mb-1 font-semibold">Finishing</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2 items-center">
              {/* Jenis Finishing */}
              <input
                type="text"
                placeholder="Jenis Finishing"
                className="border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700 col-span-1"
                value={newFinishingJenis}
                onChange={(e) => setNewFinishingJenis(e.target.value)}
              />
              {/* Harga Tambahan */}
              <input
                type="text"
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
                <option value="Cover">Cover</option>
                <option value="Isi">Isi</option>
                <option value="Umum">Umum</option>
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
            <ul className="mt-3 text-sm list-disc list-inside text-gray-700">
              {finishingList.map((f) => (
                <li key={f.id} className="mb-2">
                  {f.isEditing ? (
                    <div className="flex flex-col sm:flex-row gap-2 items-center">
                      {/* Inline edit fields */}
                      <input
                        type="text"
                        value={f.jenis}
                        onChange={(e) =>
                          setFinishingList(
                            finishingList.map((item) =>
                              item.id === f.id
                                ? { ...item, jenis: e.target.value }
                                : item
                            )
                          )
                        }
                        className="border border-black/50 rounded p-1 flex-1"
                      />
                      <input
                        type="text"
                        value={f.hargaTambahan}
                        onChange={(e) =>
                          setFinishingList(
                            finishingList.map((item) =>
                              item.id === f.id
                                ? { ...item, hargaTambahan: e.target.value }
                                : item
                            )
                          )
                        }
                        className="border border-black/50 rounded p-1 flex-1"
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
                        className="border border-black/50 rounded p-1 flex-1"
                      >
                        <option value="Cover">Cover</option>
                        <option value="Isi">Isi</option>
                        <option value="Umum">Umum</option>
                      </select>
                      <button
                        type="button"
                        className="text-green-600 font-semibold"
                        onClick={() =>
                          handleSaveEditFinishing(
                            f.id,
                            f.jenis,
                            f.hargaTambahan,
                            f.kategori
                          )
                        }
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="text-red-600 font-semibold"
                        onClick={() => handleCancelEdit(f.id)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        {f.jenis} - Rp {f.hargaTambahan} ({f.kategori})
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="text-blue-600 font-semibold"
                          onClick={() => handleEditFinishing(f.id)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="text-red-600 font-semibold"
                          onClick={() => handleDeleteFinishing(f.id)}
                        >
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