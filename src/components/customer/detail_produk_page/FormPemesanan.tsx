/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import api from "../../../services/api";
import { getBaseUrl } from "../../../utils/getBaseUrl";
import { slugify } from "../../../utils/slugify";
import { useToast } from "../../toast/useToast";

interface Product {
  id: number;
  nama: string;
  harga: number;
  slug?: string;
  materials?: {
    id: number;
    nama: string;
    kategori?: string;
  }[];
  sizes?: { id: number; nama: string }[];
  finishings?: {
    id: number;
    nama: string;
    kategori?: string;
  }[];
}

interface Option {
  id: number;
  nama: string;
  kategori?: string;
}

interface CategorizedOptions {
  umum: Option[];
  cover: Option[];
  isi: Option[];
}

interface Attribute {
  id: number;
  nama: string;
  tipe: string;
  opsi?: string[];
  value: string;
}

const FormPemesanan: React.FC = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Data yang sudah dikategorikan
  const [categorizedMaterials, setCategorizedMaterials] =
    useState<CategorizedOptions>({
      umum: [],
      cover: [],
      isi: [],
    });
  const [categorizedFinishings, setCategorizedFinishings] =
    useState<CategorizedOptions>({
      umum: [],
      cover: [],
      isi: [],
    });
  const [availableSizes, setAvailableSizes] = useState<Option[]>([]);
  const [attributes, setAttributes] = useState<Attribute[]>([]);

  // Selected values untuk setiap kategori
  const [selectedMaterials, setSelectedMaterials] = useState<{
    umum: number | null;
    cover: number | null;
    isi: number | null;
  }>({
    umum: null,
    cover: null,
    isi: null,
  });

  const [selectedFinishings, setSelectedFinishings] = useState<{
    umum: number | null;
    cover: number | null;
    isi: number | null;
  }>({
    umum: null,
    cover: null,
    isi: null,
  });

  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [hargaSatuan, setHargaSatuan] = useState<number>(0);
  const [jumlah, setJumlah] = useState<number>(100);
  const [catatan, setCatatan] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Calculate total price
  const totalHarga = hargaSatuan * jumlah;

  useEffect(() => {
    const fetchProdukBySlug = async () => {
      try {
        const res = await api.get("/api/products");
        const found = res.data.find(
          (item: Product) => slugify(item.nama) === slug
        );
        if (found) {
          setProducts({
            ...found,
            slug: slugify(found.nama),
            image: `${getBaseUrl()}/${found.gambar}`,
            deskripsi: found.deskripsi ? found.deskripsi.split("\r\n") : [],
          });
        }
      } catch (err) {
        console.error("Gagal fetch produk:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProdukBySlug();
  }, [slug]);

  // Helper function untuk mengkategorikan options
  const categorizeOptions = (options: Option[]): CategorizedOptions => {
    const result: CategorizedOptions = { umum: [], cover: [], isi: [] };

    options.forEach((option) => {
      const category = option.kategori?.toLowerCase() || "umum";
      if (category === "umum" || category === "cover" || category === "isi") {
        result[category as keyof CategorizedOptions].push(option);
      } else {
        result.umum.push(option);
      }
    });

    return result;
  };

  useEffect(() => {
    if (!products?.id) return;

    const fetchProductRelations = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch product detail dengan relasi materials, sizes, finishings
        const productDetailRes = await api.get(`/api/products/${products.id}`, {
          headers,
        });
        const productData = productDetailRes.data;

        console.log("Product data with relations:", productData);

        // Kategorikan materials dan finishings
        const materials = Array.isArray(productData.materials)
          ? productData.materials
          : [];
        const finishings = Array.isArray(productData.finishings)
          ? productData.finishings
          : [];

        console.log("Materials:", materials);
        console.log("Finishings:", finishings);

        setCategorizedMaterials(categorizeOptions(materials));
        setCategorizedFinishings(categorizeOptions(finishings));

        setAvailableSizes(
          Array.isArray(productData.sizes) ? productData.sizes : []
        );

        setHargaSatuan(productData.harga);

        // Fetch product attributes
        const attributesRes = await api.get(
          `/api/products/${products.id}/attributes`,
          { headers }
        );

        // Set attributes dengan struktur yang tepat
        const attributesData = Array.isArray(attributesRes.data?.data)
          ? attributesRes.data.data
          : Array.isArray(attributesRes.data)
          ? attributesRes.data
          : [];

        setAttributes(
          attributesData.map((attr: any) => ({
            id: attr.id,
            nama: attr.nama,
            tipe: attr.tipe,
            opsi:
              typeof attr.opsi === "string" ? JSON.parse(attr.opsi) : attr.opsi,
            value: "", // Default empty value for user input
          }))
        );
      } catch (err) {
        console.error("Gagal fetch data relasi produk:", err);
      }
    };

    fetchProductRelations();
  }, [products?.id]);

  const handleAttributeChange = (index: number, value: string) => {
    const newAttrs = [...attributes];
    newAttrs[index].value = value;
    setAttributes(newAttrs);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleMaterialChange = (
    category: keyof CategorizedOptions,
    value: number
  ) => {
    setSelectedMaterials((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleFinishingChange = (
    category: keyof CategorizedOptions,
    value: number
  ) => {
    setSelectedFinishings((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  // Helper function untuk render dropdown berdasarkan kategori
  const renderCategoryDropdown = (
    title: string,
    category: keyof CategorizedOptions,
    options: Option[],
    selectedValue: number | null,
    onChange: (category: keyof CategorizedOptions, value: number) => void,
    type: "material" | "finishing"
  ) => {
    if (options.length === 0) return null;

    const capitalizeCategory = (cat: string) => {
      return cat.charAt(0).toUpperCase() + cat.slice(1);
    };

    const getDisplayTitle = (cat: string) => {
      if (cat === "umum") return title;
      return `${title} ${capitalizeCategory(cat)}`;
    };

    return (
      <div key={`${type}-${category}`}>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {getDisplayTitle(category)}
        </label>
        <div className="relative">
          <select
            className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-2 focus:border-green-700 focus:outline-none appearance-none bg-white"
            value={selectedValue ?? ""}
            onChange={(e) => onChange(category, Number(e.target.value))}
            required
          >
            <option value="">Pilih {getDisplayTitle(category)}</option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.nama}
              </option>
            ))}
          </select>
          <Icon
            icon="mdi:chevron-down"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>
    );
  };

  // Validasi apakah semua input yang ada sudah terisi
  const isValidSelection = () => {
    // Cek materials
    const materialCategories = Object.keys(
      categorizedMaterials
    ) as (keyof CategorizedOptions)[];
    for (const category of materialCategories) {
      if (
        categorizedMaterials[category].length > 0 &&
        !selectedMaterials[category]
      ) {
        return false;
      }
    }

    // Cek finishings
    const finishingCategories = Object.keys(
      categorizedFinishings
    ) as (keyof CategorizedOptions)[];
    for (const category of finishingCategories) {
      if (
        categorizedFinishings[category].length > 0 &&
        !selectedFinishings[category]
      ) {
        return false;
      }
    }

    // Cek size
    if (availableSizes.length > 0 && !selectedSize) {
      return false;
    }

    // Cek dynamic attributes - pastikan semua attribute yang required telah diisi
    for (const attribute of attributes) {
      // Jika attribute tidak memiliki value atau value kosong, maka tidak valid
      if (!attribute.value || attribute.value.trim() === "") {
        return false;
      }
    }

    // Cek apakah file desain sudah diupload
    if (!selectedFile) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi
    if (!isValidSelection()) {
      alert("Harap lengkapi semua pilihan yang tersedia!");
      return;
    }

    try {
      // Collect selected materials and finishings
      const selectedMaterialIds = Object.values(selectedMaterials).filter(
        (id) => id !== null
      );
      const selectedFinishingIds = Object.values(selectedFinishings).filter(
        (id) => id !== null
      );

      const data = {
        product_id: products?.id,
        quantity: jumlah,
        material_ids: selectedMaterialIds,
        finishing_ids: selectedFinishingIds,
        size_id: selectedSize,
        harga: hargaSatuan,
        catatan,
        attributes: attributes
          .filter((attr) => attr.value.trim() !== "") // Only send attributes with values
          .map((a) => ({ id: a.id, value: a.value })),
      };

      console.log("Data pemesanan:", data);

      // Get token for authentication
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Anda harus login terlebih dahulu!");
        return;
      }

      // Submit to backend
      const response = await api.post("/api/cart", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        showToast("Produk berhasil ditambahkan ke keranjang", "success");

        // Reset form or redirect to cart page
        // Optional: Reset selections
        setSelectedMaterials({ umum: null, cover: null, isi: null });
        setSelectedFinishings({ umum: null, cover: null, isi: null });
        setSelectedSize(null);
        setJumlah(100);
        setCatatan("");
        setSelectedFile(null);
        setAttributes((prev) => prev.map((attr) => ({ ...attr, value: "" })));
      }

      navigate(`/customer/keranjang`);
    } catch (error: any) {
      console.error("Error adding to cart:", error);

      if (error.response?.status === 401) {
        alert("Sesi Anda telah berakhir. Silakan login kembali!");
      } else if (error.response?.status === 409) {
        alert("Produk ini sudah ada di keranjang!");
      } else if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert(
          "Terjadi kesalahan saat menambahkan ke keranjang. Silakan coba lagi."
        );
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Icon icon="eos-icons:loading" className="text-4xl text-green-700" />
          <span className="text-lg text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (!products) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Icon
            icon="mdi:package-variant-remove"
            className="text-6xl text-gray-400 mx-auto mb-4"
          />
          <p className="text-lg text-gray-600">Produk tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-left mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-2">
            Form Pemesanan
          </h1>
          <p className="text-xl text-gray-600">{products.nama}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Left Column - Input Fields */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Step 1 Header */}
            <div className="flex items-center mb-6">
              <div className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3">
                1
              </div>
              <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide">
                Tentukan Pilihanmu
              </h2>
            </div>

            <div className="space-y-6">
              {/* Materials Selection by Category */}
              {Object.entries(categorizedMaterials).map(
                ([category, materials]) =>
                  renderCategoryDropdown(
                    "Bahan",
                    category as keyof CategorizedOptions,
                    materials,
                    selectedMaterials[category as keyof CategorizedOptions],
                    handleMaterialChange,
                    "material"
                  )
              )}

              {/* Show warning if no materials available */}
              {Object.values(categorizedMaterials).every(
                (arr) => arr.length === 0
              ) && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bahan
                  </label>
                  <p className="text-sm text-red-500 mt-1 flex items-center">
                    <Icon icon="mdi:alert-circle" className="mr-1" />
                    Tidak ada pilihan bahan tersedia
                  </p>
                </div>
              )}

              {/* Ukuran Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ukuran
                </label>
                <div className="relative">
                  <select
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-2 focus:border-green-700 focus:outline-none appearance-none bg-white"
                    value={selectedSize ?? ""}
                    onChange={(e) => setSelectedSize(Number(e.target.value))}
                    required={availableSizes.length > 0}
                  >
                    <option value="">Pilih Ukuran</option>
                    {availableSizes.map((size) => (
                      <option key={size.id} value={size.id}>
                        {size.nama}
                      </option>
                    ))}
                  </select>
                  <Icon
                    icon="mdi:chevron-down"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
                {availableSizes.length === 0 && (
                  <p className="text-sm text-red-500 mt-1 flex items-center">
                    <Icon icon="mdi:alert-circle" className="mr-1" />
                    Tidak ada pilihan ukuran tersedia
                  </p>
                )}
              </div>

              {/* Finishings Selection by Category */}
              {Object.entries(categorizedFinishings).map(
                ([category, finishings]) =>
                  renderCategoryDropdown(
                    "Finishing",
                    category as keyof CategorizedOptions,
                    finishings,
                    selectedFinishings[category as keyof CategorizedOptions],
                    handleFinishingChange,
                    "finishing"
                  )
              )}

              {/* Show warning if no finishings available */}
              {Object.values(categorizedFinishings).every(
                (arr) => arr.length === 0
              ) && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Finishing
                  </label>
                  <p className="text-sm text-red-500 mt-1 flex items-center">
                    <Icon icon="mdi:alert-circle" className="mr-1" />
                    Tidak ada pilihan finishing tersedia
                  </p>
                </div>
              )}

              {/* Jumlah dan Harga Selection */}
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Jumlah
                  </label>
                  <input
                    type="number"
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-2 focus:border-green-700 focus:outline-none appearance-none bg-white"
                    value={jumlah}
                    onChange={(e) => setJumlah(Number(e.target.value))}
                    min={100}
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Harga Satuan
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-green-700 focus:border-green-700 bg-gray-100"
                    value={
                      hargaSatuan
                        ? `Rp ${Math.floor(hargaSatuan).toLocaleString(
                            "id-ID"
                          )}`
                        : "-"
                    }
                    disabled
                  />
                </div>
              </div>

              {/* Dynamic Attributes */}
              {attributes.length > 0 && (
                <div className="space-y-4">
                  {attributes.map((attr, index) => (
                    <div key={attr.id}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {attr.nama}
                      </label>
                      {attr.tipe === "select" && attr.opsi ? (
                        <div className="relative">
                          <select
                            className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-2 focus:border-green-700 focus:outline-none appearance-none bg-white"
                            value={attr.value}
                            onChange={(e) =>
                              handleAttributeChange(index, e.target.value)
                            }
                          >
                            <option value="">Pilih {attr.nama}</option>
                            {attr.opsi.map((option, optIndex) => (
                              <option key={optIndex} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                          <Icon
                            icon="mdi:chevron-down"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                          />
                        </div>
                      ) : attr.tipe === "number" ? (
                        <input
                          type="number"
                          placeholder={`Isi ${attr.nama}`}
                          className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-2 focus:border-green-700 focus:outline-none appearance-none bg-white"
                          value={attr.value}
                          onChange={(e) =>
                            handleAttributeChange(index, e.target.value)
                          }
                        />
                      ) : (
                        <input
                          type="text"
                          placeholder={`Isi ${attr.nama}`}
                          className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-2 focus:border-green-700 focus:outline-none appearance-none bg-white"
                          value={attr.value}
                          onChange={(e) =>
                            handleAttributeChange(index, e.target.value)
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Catatan */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Catatan
                </label>
                <textarea
                  className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-2 focus:border-green-700 focus:outline-none appearance-none bg-white"
                  rows={4}
                  placeholder="Tulis catatan tambahan jika ada..."
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Upload & Cart */}
          <div className="space-y-6">
            {/* Upload Design Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <div className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3">
                  2
                </div>
                <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide">
                  Upload Desain
                </h2>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Format yang didukung: CDR, PDF, PNG, JPG, PSD
                </p>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-green-700 transition-colors duration-200">
                  <input
                    type="file"
                    id="design-upload"
                    className="hidden"
                    accept=".cdr,.pdf,.png,.jpg,.jpeg,.psd"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="design-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Icon
                      icon="mdi:cloud-upload"
                      className="text-6xl text-gray-400 mb-4"
                    />
                    <span className="text-lg font-semibold text-gray-700 mb-2">
                      Klik untuk upload
                    </span>
                    <span className="text-sm text-gray-500">
                      atau drag and drop file disini
                    </span>
                  </label>
                </div>

                {!selectedFile && (
                  <p className="mt-4 text-sm">
                    Tidak punya desain?{" "}
                    <span className="text-blue-600 cursor-pointer hover:underline">
                      klik disini
                    </span>
                  </p>
                )}

                {selectedFile && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-center space-x-2">
                      <Icon icon="mdi:file-check" className="text-green-700" />
                      <span className="text-sm font-medium text-green-700">
                        {selectedFile.name}
                      </span>
                      <button
                        onClick={() => {
                          const uploadElement = document.getElementById(
                            "design-upload"
                          ) as HTMLInputElement;
                          if (uploadElement) {
                            uploadElement.value = "";
                          }
                          setSelectedFile(null);
                        }}
                        className="ml-2 text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <Icon icon="mdi:trash-can" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <div className="bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3">
                  3
                </div>
                <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide">
                  Tambah ke Keranjang
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-700">Total:</span>
                  <span className="text-2xl font-bold text-green-700">
                    Rp. {totalHarga.toLocaleString("id-ID")}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                  disabled={!isValidSelection()}
                >
                  <Icon icon="mdi:cart-plus" className="text-xl" />
                  <span className="text-lg">ADD TO CART</span>
                </button>

                {!isValidSelection() && (
                  <p className="text-sm text-red-500 text-center flex items-center justify-center">
                    <Icon icon="mdi:alert-circle" className="mr-1" />
                    Lengkapi pilihan untuk melanjutkan
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPemesanan;
