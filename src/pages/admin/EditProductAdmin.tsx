/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import { Icon } from "@iconify/react";
import api from "../../services/api";
import { getBaseUrl } from "../../utils/getBaseUrl";
import { useToast } from "../../components/toast/useToast";

interface OptionItem {
  id: number;
  nama: string;
  status: boolean;
  kategori?: string;
}

interface ProductAttribute {
  id?: number;
  nama: string;
  tipe: "text" | "number" | "select";
  opsi: string[] | null;
}

const EditProductAdminPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // State untuk atribut produk
  const [attributes, setAttributes] = useState<ProductAttribute[]>([]);
  const [newAttribute, setNewAttribute] = useState<ProductAttribute>({
    nama: "",
    tipe: "text",
    opsi: null,
  });
  const [showAttributeForm, setShowAttributeForm] = useState(false);
  const [editingAttributeIndex, setEditingAttributeIndex] = useState<
    number | null
  >(null);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [product, setProduct] = useState<OptionItem | null>(null);
  const [price, setPrice] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imagePreviewRef = useRef<string | null>(null);

  // Fetch bahan, ukuran, finishing, produk
  useEffect(() => {
    const fetchData = async () => {
      try { 
        setIsFetching(true);
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        // Ambil data master
        const [bahanRes, ukuranRes, finishingRes] = await Promise.all([
          api.get("/api/materials", { headers }),
          api.get("/api/sizes", { headers }),
          api.get("/api/finishings", { headers }),
        ]);

        setMaterialList(
          Array.isArray(bahanRes.data?.data)
            ? bahanRes.data.data
            : bahanRes.data || []
        );
        setSizeList(
          Array.isArray(ukuranRes.data?.data)
            ? ukuranRes.data.data
            : ukuranRes.data || []
        );
        setFinishingList(
          Array.isArray(finishingRes.data?.data)
            ? finishingRes.data.data
            : finishingRes.data || []
        );

        // Fetch product attributes
        const attributesRes = await api.get(`/api/products/${id}/attributes`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Set attributes
        setAttributes(
          attributesRes.data.map((attr: any) => ({
            id: attr.id,
            nama: attr.nama,
            tipe: attr.tipe,
            opsi:
              typeof attr.opsi === "string" ? JSON.parse(attr.opsi) : attr.opsi,
          }))
        );

        // Jika edit mode dan id ada
        if (id) {
          const prodRes = await api.get(`/api/products/${id}`, { headers });
          const data = prodRes.data;

          console.log("Data produk:", data);

          // Set product berdasarkan data dari API
          setProduct({
            id: data.id,
            nama: data.nama,
            status: data.status === "Tersedia",
          });

          setName(data.nama || "");
          setDescription(data.deskripsi || "");
          setPrice(data.harga || "");
          setImagePreview(
            data.gambar ? `${getBaseUrl()}/${data.gambar}` : null
          );

          setMaterials(
            Array.isArray(data.materials)
              ? data.materials.map((m: any) => m.id.toString())
              : []
          );
          setSizes(
            Array.isArray(data.sizes)
              ? data.sizes.map((s: any) => s.id.toString())
              : []
          );
          setFinishings(
            Array.isArray(data.finishings)
              ? data.finishings.map((f: any) => f.id.toString())
              : []
          );
        }
      } catch (err) {
        showToast("Gagal mengambil data", "error");
        console.error("Gagal fetch data:", err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [id, showToast]);

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

  // Handle attribute form change
  const handleAttributeChange = (field: keyof ProductAttribute, value: any) => {
    setNewAttribute((prev) => {
      if (field === "tipe" && value === "select" && !prev.opsi) {
        return { ...prev, [field]: value, opsi: [""] };
      }
      if (field === "tipe" && value !== "select") {
        return { ...prev, [field]: value, opsi: null };
      }
      return { ...prev, [field]: value };
    });
  };

  // Handle option change for select attribute
  const handleOptionChange = (index: number, value: string) => {
    setNewAttribute((prev) => {
      if (!prev.opsi) return prev;
      const updatedOptions = [...prev.opsi];
      updatedOptions[index] = value;
      return { ...prev, opsi: updatedOptions };
    });
  };

  // Add option for select attribute
  const addOption = () => {
    setNewAttribute((prev) => {
      if (!prev.opsi) return { ...prev, opsi: [""] };
      return { ...prev, opsi: [...prev.opsi, ""] };
    });
  };

  // Remove option for select attribute
  const removeOption = (index: number) => {
    setNewAttribute((prev) => {
      if (!prev.opsi) return prev;
      const updatedOptions = prev.opsi.filter((_, i) => i !== index);
      return { ...prev, opsi: updatedOptions.length ? updatedOptions : [""] };
    });
  };

  // Add or update attribute
  const handleAddAttribute = () => {
    if (!newAttribute.nama.trim()) {
      showToast("Nama atribut tidak boleh kosong", "error");
      return;
    }

    if (
      newAttribute.tipe === "select" &&
      (!newAttribute.opsi || newAttribute.opsi.some((opt) => !opt.trim()))
    ) {
      showToast("Semua opsi harus diisi", "error");
      return;
    }

    if (editingAttributeIndex !== null) {
      // Update existing attribute
      const updatedAttributes = [...attributes];
      // Preserve the ID if it exists when editing
      const existingId = updatedAttributes[editingAttributeIndex].id;
      updatedAttributes[editingAttributeIndex] = {
        ...newAttribute,
        id: existingId,
      };
      setAttributes(updatedAttributes);
      setEditingAttributeIndex(null);
    } else {
      // Add new attribute (without ID for new attributes)
      setAttributes([...attributes, { ...newAttribute }]);
    }

    // Reset form
    setNewAttribute({
      nama: "",
      tipe: "text",
      opsi: null,
    });
    setShowAttributeForm(false);
  };

  // Edit attribute
  const editAttribute = (index: number) => {
    setNewAttribute({ ...attributes[index] });
    setEditingAttributeIndex(index);
    setShowAttributeForm(true);
  };

  // Remove attribute
  const removeAttribute = (index: number) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  const updateProductAttributes = async () => {
    const token = localStorage.getItem("token");
    try {
      // 1. Get existing attributes from server to compare
      const existingAttrsRes = await api.get(`/api/products/${id}/attributes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const existingAttrs = existingAttrsRes.data;

      // 2. Identify attributes to add, update, or delete
      const attrsToAdd = attributes.filter((attr) => !attr.id);
      const attrsToUpdate = attributes.filter(
        (attr) => attr.id && existingAttrs.some((ea: any) => ea.id === attr.id)
      );
      const attrsToDelete = existingAttrs.filter(
        (ea: any) => !attributes.some((attr) => attr.id === ea.id)
      );

      // 3. Delete attributes that were removed
      const deletePromises = attrsToDelete.map((attr: any) =>
        api.delete(`/api/products/${id}/attributes/${attr.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      );

      // 4. Update existing attributes
      const updatePromises = attrsToUpdate.map((attr) =>
        api.put(
          `/api/products/${id}/attributes/${attr.id}`,
          {
            nama: attr.nama,
            tipe: attr.tipe,
            opsi: attr.tipe === "select" ? attr.opsi : null,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      );

      // 5. Add new attributes
      const addPromises = attrsToAdd.map((attr) =>
        api.post(
          `/api/products/${id}/attributes`,
          {
            nama: attr.nama,
            tipe: attr.tipe,
            opsi: attr.tipe === "select" ? attr.opsi : null,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      );

      // Execute all promises
      await Promise.all([...deletePromises, ...updatePromises, ...addPromises]);

      return true;
    } catch (error) {
      console.error("Error updating product attributes:", error);
      throw error;
    }
  };

  const handleSave = async () => {
    if (!product) return;
    const token = localStorage.getItem("token");

    try {
      setIsSubmitting(true);
      const formData = new FormData();

      // Tambahkan data dasar
      formData.append("nama", name);
      formData.append("deskripsi", description);
      formData.append("harga", String(price));
      formData.append("status", product.status ? "Tersedia" : "Tidak Tersedia");

      // Gambar hanya dikirim jika diubah
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

      // Request
      await api.post(`/api/products/${product.id}?_method=PUT`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      await updateProductAttributes();

      showToast("Produk berhasil diperbarui!", "success");
      navigate("/admin/produk");
    } catch (err: any) {
      console.error("Gagal update:", err);
      if (err.response?.status === 422) {
        showToast("Validasi gagal. Cek data yang dimasukkan.", "error");
      } else if (err.response?.status === 500) {
        showToast(
          "Terjadi kesalahan di server. Cek data atau coba lagi nanti.",
          "error"
        );
      } else {
        showToast(
          "Gagal menyimpan produk. Cek koneksi atau coba lagi.",
          "error"
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin />
      <SidebarAdmin />
      <div className="md:ml-64 pt-28 px-4 md:px-8 pb-10">
        {isFetching ? (
          <div className="flex justify-start items-center">
            <Icon icon="mdi:loading" className="animate-spin mr-2" />
            <p className="text-gray-500">Memuat data...</p>
          </div>
        ) : product ? (
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
                <Icon
                  icon="mdi:archive-edit"
                  className="w-7 h-7 md:w-9 md:h-9"
                />
                Edit Produk
              </h1>
              <div
                onClick={() =>
                  product &&
                  setProduct({
                    ...product,
                    status: !product.status,
                  } as OptionItem)
                }
                className={`cursor-pointer flex items-center gap-2 p-2 md:p-3 rounded-lg transition-all duration-300 ${
                  product?.status
                    ? "bg-green-100 hover:bg-green-200"
                    : "bg-red-100 hover:bg-red-200"
                }`}
              >
                <div
                  className={`w-3 md:w-4 h-3 md:h-4 rounded-full ${
                    product?.status ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <span
                  className={`hidden md:block text-sm md:text-base font-medium ${
                    product?.status ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {product?.status
                    ? "Produk Tersedia"
                    : "Produk Tidak Tersedia"}
                </span>
                <Icon
                  icon={
                    product?.status ? "mdi:check-circle" : "mdi:close-circle"
                  }
                  className={`ml-1 md:ml-2 w-4 md:w-5 h-4 md:h-5 ${
                    product?.status ? "text-green-600" : "text-red-600"
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
                    className="w-40 h-40 object-contain rounded-xl shadow"
                  />
                </div>
              )}
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block mb-1 font-semibold">
                Deskripsi Produk
              </label>
              <textarea
                className="w-full border border-black/50 rounded-lg min-h-[100px] p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Masukkan deskripsi produk dalam bentuk list"
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
                    setNewMaterial(""); // reset dropdown
                  }}
                >
                  <option value="">Pilih Bahan</option>
                  {materialList.map((bahan) => (
                    <option
                      key={bahan.id}
                      value={bahan.id.toString()}
                      disabled={materials.includes(bahan.id.toString())}
                    >
                      {bahan.nama} ({bahan.kategori})
                    </option>
                  ))}
                </select>
              </div>

              <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
                {materials.map((mat) => {
                  const data = materialList.find(
                    (b) => b.id.toString() === mat
                  );
                  return (
                    <li key={mat} className="flex justify-between items-center">
                      <span>
                        {data
                          ? `${data.nama} (${data.kategori})`
                          : "Bahan tidak ditemukan"}
                      </span>
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        onClick={() => {
                          setMaterials(materials.filter((m) => m !== mat));
                        }}
                      >
                        <Icon
                          icon="mdi:trash-can-outline"
                          width={18}
                          height={18}
                        />
                      </button>
                    </li>
                  );
                })}
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
                  {sizeList.map((size) => (
                    <option
                      key={size.id}
                      value={size.id.toString()}
                      disabled={sizes.includes(size.id.toString())}
                    >
                      {size.nama}
                    </option>
                  ))}
                </select>
              </div>

              <ul className="mt-2 list-disc list-inside text-sm text-gray-700">
                {sizes.map((sz, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>
                      {sizeList.find((s) => s.id.toString() === sz)?.nama}
                    </span>
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                      onClick={() => {
                        setSizes(sizes.filter((_, i) => i !== index));
                      }}
                    >
                      <Icon
                        icon="mdi:trash-can-outline"
                        width={18}
                        height={18}
                      />
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
                {finishings.map((fnsId, index) => {
                  const finishing = finishingList.find(
                    (f) => f.id.toString() === fnsId
                  );
                  return (
                    <li
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span>
                        {finishing
                          ? `${finishing.nama} (${finishing.kategori})`
                          : "Finishing tidak ditemukan"}
                      </span>
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                        onClick={() => {
                          setFinishings(
                            finishings.filter((_, i) => i !== index)
                          );
                        }}
                      >
                        <Icon
                          icon="mdi:trash-can-outline"
                          width={18}
                          height={18}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold">Spesifikasi Baru</label>
                <button
                  type="button"
                  className="text-green-700 hover:text-green-800 text-md flex items-center gap-1 cursor-pointer"
                  onClick={() => {
                    setNewAttribute({ nama: "", tipe: "text", opsi: null });
                    setEditingAttributeIndex(null);
                    setShowAttributeForm(!showAttributeForm);
                  }}
                >
                  <Icon
                    icon={
                      showAttributeForm ? "mdi:minus-circle" : "mdi:plus-circle"
                    }
                    width={18}
                    height={18}
                  />
                  {showAttributeForm ? "Tutup Form" : "Tambah Spesifikasi"}
                </button>
              </div>

              {/* Form Tambah/Edit Spesifikasi Baru */}
              {showAttributeForm && (
                <div className="bg-gray-100 p-4 rounded-lg mb-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Nama Spesifikasi
                      </label>
                      <input
                        type="text"
                        className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                        value={newAttribute.nama}
                        onChange={(e) =>
                          handleAttributeChange("nama", e.target.value)
                        }
                        placeholder="contoh: Warna, Orientasi, dll"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Tipe Spesifikasi
                      </label>
                      <select
                        className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                        value={newAttribute.tipe}
                        onChange={(e) =>
                          handleAttributeChange("tipe", e.target.value)
                        }
                      >
                        <option value="text">Text</option>
                        <option value="number">Angka</option>
                        <option value="select">Pilihan</option>
                      </select>
                    </div>
                  </div>

                  {newAttribute.tipe === "select" && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Opsi Pilihan
                      </label>
                      {newAttribute.opsi?.map((option, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(index, e.target.value)
                            }
                            placeholder={`Opsi ${index + 1}`}
                          />
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-800 cursor-pointer"
                            onClick={() => removeOption(index)}
                            disabled={newAttribute.opsi?.length === 1}
                          >
                            <Icon
                              icon="mdi:trash-can-outline"
                              width={18}
                              height={18}
                            />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="text-green-700 hover:text-green-800 text-sm flex items-center gap-1 cursor-pointer"
                        onClick={addOption}
                      >
                        <Icon icon="mdi:plus-circle" width={16} height={16} />
                        Tambah Opsi
                      </button>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-green-700 text-white px-3 py-1 rounded-lg hover:bg-green-800 text-sm cursor-pointer"
                      onClick={handleAddAttribute}
                    >
                      {editingAttributeIndex !== null
                        ? "Update Spesifikasi"
                        : "Tambah Spesifikasi Baru"} 
                    </button>
                  </div>
                </div>
              )}

              {/* Daftar Spesfikasi*/}
              <div className="mt-2">
                <h3 className="font-medium mb-2">{attributes.length > 0 && "Daftar Spesifikasi"}</h3>
                {attributes.length > 0 ? (
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left">Nama</th>
                          <th className="px-4 py-2 text-left">Tipe</th>
                          <th className="px-4 py-2 text-left">Opsi</th>
                          <th className="px-4 py-2 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attributes.map((attr, index) => (
                          <tr key={index} className="border-t">
                            <td className="px-4 py-2">{attr.nama}</td>
                            <td className="px-4 py-2">
                              {attr.tipe === "text" && "Text"}
                              {attr.tipe === "number" && "Angka"}
                              {attr.tipe === "select" && "Pilihan"}
                            </td>
                            <td className="px-4 py-2">
                              {attr.tipe === "select" && attr.opsi?.join(", ")}
                            </td>
                            <td className="px-4 py-2 text-center">
                              <div className="flex justify-center gap-2">
                                <button
                                  type="button"
                                  className="text-green-600 hover:text-green-700 cursor-pointer"
                                  onClick={() => editAttribute(index)}
                                >
                                  <Icon
                                    icon="mdi:pencil"
                                    width={18}
                                    height={18}
                                  />
                                </button>
                                <button
                                  type="button"
                                  className="text-red-600 hover:text-red-800 cursor-pointer"
                                  onClick={() => removeAttribute(index)}
                                >
                                  <Icon
                                    icon="mdi:trash-can-outline"
                                    width={18}
                                    height={18}
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    Belum ada tambahan spesifikasi
                  </p>
                )}
              </div>
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
                {isSubmitting ? (
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
        ) : (
          <p className="text-red-500">Data produk tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default EditProductAdminPage;
