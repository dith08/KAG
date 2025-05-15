import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import { Icon } from "@iconify/react";

// Interface untuk finishing
interface Finishing {
  id: number;
  productId: number;
  jenis: string;
  hargaTambahan: string;
  kategori: string;
  isEditing?: boolean; // mode inline edit
}

// Interface produk
interface Product {
  id: number;
  name: string;
  description?: string;
  material?: string;
  imageUrl?: string;
  harga?: string;
}

// Extends dari Product, termasuk ukuran dan finishing
interface ExtendedProduct extends Product {
  ukuran?: string[];
  finishing?: Finishing[];
  available?: boolean;
}

const EditProductAdminPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ExtendedProduct | null>(null);
  const [newUkuran, setNewUkuran] = useState("");
  const [newFinishingJenis, setNewFinishingJenis] = useState("");
  const [newFinishingHargaTambahan, setNewFinishingHargaTambahan] = useState("");
  const [newFinishingKategori, setNewFinishingKategori] = useState("Cover");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newHarga, setNewHarga] = useState("");

  const imagePreviewRef = useRef<string | null>(null);

  // Dummy fetch data di mount
  useEffect(() => {
    if (id) {
      const dummyProduct: ExtendedProduct = {
        id: parseInt(id),
        name: "Brosur A",
        ukuran: ["A4"],
        finishing: [
          {
            id: 1,
            productId: parseInt(id),
            jenis: "Laminasi Doff",
            hargaTambahan: "Rp.5.000",
            kategori: "Cover",
          },
        ],
        available: true,
        imageUrl:
          "https://i.pinimg.com/736x/36/94/59/3694591363764be875b716e96c25dbb1.jpg",
        harga: "50000",
        description: "",
        material: "",
      };
      setProduct(dummyProduct);
      setNewHarga(dummyProduct.harga || "");
    }
    // Cleanup URL
    return () => {
      if (imagePreviewRef.current) {
        URL.revokeObjectURL(imagePreviewRef.current);
        imagePreviewRef.current = null;
      }
    };
  }, [id]);

  // Handle add ukuran
  const handleAddUkuran = () => {
    if (newUkuran.trim() && product) {
      setProduct({
        ...product,
        ukuran: [...(product.ukuran || []), newUkuran.trim()],
      });
      setNewUkuran("");
    } else {
      alert("Mohon isi ukuran terlebih dahulu");
    }
  };

  // Handle add finishing
  const handleAddFinishing = () => {
    if (
      newFinishingJenis.trim() !== "" &&
      newFinishingHargaTambahan.trim() !== "" &&
      newFinishingKategori.trim() !== "" &&
      product
    ) {
      const newFinishing: Finishing = {
        id: Date.now(),
        productId: product.id,
        jenis: newFinishingJenis.trim(),
        hargaTambahan: newFinishingHargaTambahan.trim(),
        kategori: newFinishingKategori,
      };
      setProduct({
        ...product,
        finishing: [...(product.finishing || []), newFinishing],
      });
      setNewFinishingJenis("");
      setNewFinishingHargaTambahan("");
      setNewFinishingKategori("Cover");
    } else {
      alert("Mohon isi semua field Finishing");
    }
  };

  // Handle delete finishing
  const handleDeleteFinishing = (id: number) => {
    if (product?.finishing) {
      setProduct({
        ...product,
        finishing: product.finishing.filter((f) => f.id !== id),
      });
    }
  };

  // Handle edit finishing
  const handleEditFinishing = (id: number) => {
    if (product?.finishing) {
      setProduct({
        ...product,
        finishing: product.finishing.map((f) =>
          f.id === id ? { ...f, isEditing: true } : f
        ),
      });
    }
  };

  // Handle save edit finishing
  const handleSaveEditFinishing = (
    id: number,
    jenis: string,
    hargaTambahan: string,
    kategori: string
  ) => {
    if (product?.finishing) {
      setProduct({
        ...product,
        finishing: product.finishing.map((f) =>
          f.id === id
            ? {
                ...f,
                jenis,
                hargaTambahan,
                kategori,
                isEditing: false,
              }
            : f
        ),
      });
    }
  };

  // Handle cancel edit
  const handleCancelEdit = (id: number) => {
    if (product?.finishing) {
      setProduct({
        ...product,
        finishing: product.finishing.map((f) =>
          f.id === id ? { ...f, isEditing: false } : f
        ),
      });
    }
  };

  // Handle save produk
  const handleSave = () => {
    if (!product) return;
    const updatedProduct = {
      ...product,
      harga: newHarga,
    };
    console.log("Disimpan:", updatedProduct);
    // Panggil API disini jika perlu
    navigate("/admin/produk");
  };

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (imagePreviewRef.current) {
        URL.revokeObjectURL(imagePreviewRef.current);
      }
      const url = URL.createObjectURL(file);
      imagePreviewRef.current = url;
      setNewImage(file);
    }
  };

  const imagePreview =
    newImage ? URL.createObjectURL(newImage) : product?.imageUrl;

  // Revoke URL saat image berubah
  useEffect(() => {
    if (newImage) {
      if (imagePreviewRef.current) {
        URL.revokeObjectURL(imagePreviewRef.current);
      }
      imagePreviewRef.current = URL.createObjectURL(newImage);
    }
    return () => {
      if (imagePreviewRef.current) {
        URL.revokeObjectURL(imagePreviewRef.current);
        imagePreviewRef.current = null;
      }
    };
  }, [newImage]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin />
      <SidebarAdmin />
      <div className="md:ml-64 pt-28 px-4 md:px-8 pb-10">
        <form className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto space-y-6">
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
                icon={
                  product.available ? "mdi:check-circle" : "mdi:close-circle"
                }
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
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
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
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              placeholder={`- Masukkan deskripsi produk dalam bentuk list\n- Gunakan tanda (-) untuk setiap poin`}
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
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                value={newUkuran}
                onChange={(e) => setNewUkuran(e.target.value)}
              />
              <button
                type="button"
                className="bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-green-600 cursor-pointer"
                onClick={handleAddUkuran}
              >
                <Icon icon="mdi:plus" />
                Tambah
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-700">
              Ukuran: {product.ukuran?.join(", ")}
            </p>
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
            {/* Tombol Tambah Finishing */}
            <button
              type="button"
              className="bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-green-600 cursor-pointer"
              onClick={handleAddFinishing}
            >
              <Icon icon="mdi:plus" /> Tambah Finishing
            </button>
            {/* Daftar Finishing dengan aksi edit & hapus */}
            <ul className="mt-3 text-sm list-disc list-inside text-gray-700">
              {product.finishing?.map((f) => (
                <li key={f.id} className="mb-2">
                  {f.isEditing ? (
                    <div className="flex flex-col sm:flex-row gap-2 items-center">
                      {/* Inline edit fields */}
                      <input
                        type="text"
                        value={f.jenis}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            finishing: product.finishing?.map((item) =>
                              item.id === f.id
                                ? { ...item, jenis: e.target.value }
                                : item
                            ),
                          })
                        }
                        className="border border-black/50 rounded p-1 flex-1"
                      />
                      <input
                        type="text"
                        value={f.hargaTambahan}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            finishing: product.finishing?.map((item) =>
                              item.id === f.id
                                ? { ...item, hargaTambahan: e.target.value }
                                : item
                            ),
                          })
                        }
                        className="border border-black/50 rounded p-1 flex-1"
                      />
                      <select
                        value={f.kategori}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            finishing: product.finishing?.map((item) =>
                              item.id === f.id
                                ? { ...item, kategori: e.target.value }
                                : item
                            ),
                          })
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
                        {f.jenis} - {f.hargaTambahan} ({f.kategori})
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
              value={newHarga}
              onChange={(e) => setNewHarga(e.target.value)}
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
              type="button"
              onClick={handleSave}
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