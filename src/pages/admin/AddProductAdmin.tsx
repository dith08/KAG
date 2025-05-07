import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";

interface Finishing {
  id: number;
  jenis: string;
  keterangan: string;
}

const AddProduct: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [templateList, setTemplateList] = useState<string[]>([]);
  const [ukuranList, setUkuranList] = useState<string[]>([]);
  const [finishingList, setFinishingList] = useState<Finishing[]>([]);

  const [newTemplate, setNewTemplate] = useState("");
  const [newUkuran, setNewUkuran] = useState("");
  const [newFinishingJenis, setNewFinishingJenis] = useState("");
  const [newFinishingKeterangan, setNewFinishingKeterangan] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [price, setPrice] = useState<number | string>(""); // State untuk harga per pcs

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddTemplate = () => {
    if (newTemplate.trim()) {
      setTemplateList([...templateList, newTemplate.trim()]);
      setNewTemplate("");
    }
  };

  const handleAddUkuran = () => {
    if (newUkuran.trim()) {
      setUkuranList([...ukuranList, newUkuran.trim()]);
      setNewUkuran("");
    }
  };

  const handleAddFinishing = () => {
    if (newFinishingJenis && newFinishingKeterangan) {
      setFinishingList([
        ...finishingList,
        {
          id: Date.now(),
          jenis: newFinishingJenis,
          keterangan: newFinishingKeterangan,
        },
      ]);
      setNewFinishingJenis("");
      setNewFinishingKeterangan("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      name,
      template: templateList.join(", "),
      ukuran: ukuranList.join(", "),
      finishing: finishingList,
      image: imageFile,
      price: price, // Menambahkan harga per pcs
    };

    console.log("Produk Ditambahkan:", newProduct);
    navigate("/admin/produk");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin />
      <SidebarAdmin />
      <div className="md:ml-64 pt-28 px-4 md:px-8 pb-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-3xl mx-auto space-y-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-orange-600 mb-4">
            Tambah Produk
          </h1>

          <div>
            <label className="block mb-1 font-medium">Nama Produk</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Gambar Produk</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border p-2 rounded"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-3 max-h-48 object-contain border rounded"
              />
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Template Desain</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={newTemplate}
                onChange={(e) => setNewTemplate(e.target.value)}
              />
              <button
                type="button"
                className="bg-blue-500 text-white px-4 rounded"
                onClick={handleAddTemplate}
              >
                Tambah
              </button>
            </div>
            <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
              {templateList.map((tpl, idx) => (
                <li key={idx}>{tpl}</li>
              ))}
            </ul>
          </div>

          <div>
            <label className="block mb-1 font-medium">Ukuran</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={newUkuran}
                onChange={(e) => setNewUkuran(e.target.value)}
              />
              <button
                type="button"
                className="bg-blue-500 text-white px-4 rounded"
                onClick={handleAddUkuran}
              >
                Tambah
              </button>
            </div>
            <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
              {ukuranList.map((ukr, idx) => (
                <li key={idx}>{ukr}</li>
              ))}
            </ul>
          </div>

          <div>
            <label className="block mb-1 font-medium">Finishing</label>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                placeholder="Jenis Finishing"
                className="border p-2 rounded"
                value={newFinishingJenis}
                onChange={(e) => setNewFinishingJenis(e.target.value)}
              />
              <input
                type="text"
                placeholder="Keterangan"
                className="border p-2 rounded"
                value={newFinishingKeterangan}
                onChange={(e) => setNewFinishingKeterangan(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-1 rounded"
              onClick={handleAddFinishing}
            >
              Tambah Finishing
            </button>
            <ul className="mt-3 text-sm list-disc list-inside text-gray-700">
              {finishingList.map((f) => (
                <li key={f.id}>
                  {f.jenis} - {f.keterangan}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <label className="block mb-1 font-medium">Harga per PCS</label>
            <input
              type="number"
              className="w-full border p-2 rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => navigate("/admin/produk")}
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
