import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import { Product } from "./ProductAdmin";

interface Finishing {
  id: number;
  productId: number;
  jenis: string;
  keterangan: string;
}

const EditProductAdminPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [newTemplate, setNewTemplate] = useState("");
  const [newUkuran, setNewUkuran] = useState("");
  const [newFinishingJenis, setNewFinishingJenis] = useState("");
  const [newFinishingKeterangan, setNewFinishingKeterangan] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null); // State untuk gambar
  const [newHarga, setNewHarga] = useState<number>(0); // State untuk harga produk

  useEffect(() => {
    if (id) {
      const dummyProduct: Product = {
        id: parseInt(id),
        name: "Brosur A",
        template: "Template 1",
        ukuran: "A4",
        bahanBakuId: 1,
        finishing: [
          {
            id: 1,
            productId: parseInt(id),
            jenis: "Laminasi",
            keterangan: "Doff",
          },
        ],
        available: true,
        imageUrl:
          "https://i.pinimg.com/736x/36/94/59/3694591363764be875b716e96c25dbb1.jpg", // Placeholder image
        harga: 50000, // Dummy harga
      };
      setProduct(dummyProduct);
      setNewHarga(dummyProduct.harga); // Set harga awal dari product
    }
  }, [id]);

  const handleAddTemplate = () => {
    if (newTemplate.trim() && product) {
      setProduct({
        ...product,
        template: product.template + ", " + newTemplate,
      });
      setNewTemplate("");
    }
  };

  const handleAddUkuran = () => {
    if (newUkuran.trim() && product) {
      setProduct({
        ...product,
        ukuran: product.ukuran + ", " + newUkuran,
      });
      setNewUkuran("");
    }
  };

  const handleAddFinishing = () => {
    if (newFinishingJenis && newFinishingKeterangan && product) {
      const newFinishing: Finishing = {
        id: Date.now(),
        productId: product.id,
        jenis: newFinishingJenis,
        keterangan: newFinishingKeterangan,
      };
      setProduct({
        ...product,
        finishing: [...product.finishing, newFinishing],
      });
      setNewFinishingJenis("");
      setNewFinishingKeterangan("");
    }
  };

  const handleSave = () => {
    const updatedProduct = {
      ...product,
      harga: newHarga, // Simpan harga baru
    };
    console.log("Disimpan:", updatedProduct);
    navigate("/admin/produk");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const imagePreview = newImage ? URL.createObjectURL(newImage) : product?.imageUrl;

  if (!product) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin />
      <SidebarAdmin />
      <div className="md:ml-64 pt-28 px-4 md:px-8 pb-10">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-3xl mx-auto space-y-6">
          <h1 className="text-2xl md:text-3xl font-bold text-orange-600 mb-4">
            Edit Produk
          </h1>

          <div>
            <label className="block mb-1 font-medium">Nama Produk</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={product.name}
              onChange={(e) =>
                setProduct({ ...product, name: e.target.value })
              }
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="available"
              checked={product.available}
              onChange={(e) =>
                setProduct({ ...product, available: e.target.checked })
              }
            />
            <label htmlFor="available" className="font-medium">
              Tersedia untuk dijual
            </label>
          </div>

          {/* Gambar Produk */}
          <div>
            <label className="block mb-1 font-medium">Gambar Produk</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border p-2 rounded"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Harga Produk</label>
            <input
              type="number"
              className="w-full border p-2 rounded"
              value={newHarga}
              onChange={(e) => setNewHarga(Number(e.target.value))}
            />
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
                className="bg-blue-500 text-white px-4 rounded"
                onClick={handleAddTemplate}
              >
                Tambah
              </button>
            </div>
            <p className="mt-2 text-gray-600">Template: {product.template}</p>
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
                className="bg-blue-500 text-white px-4 rounded"
                onClick={handleAddUkuran}
              >
                Tambah
              </button>
            </div>
            <p className="mt-2 text-gray-600">Ukuran: {product.ukuran}</p>
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
              className="bg-blue-500 text-white px-4 py-1 rounded"
              onClick={handleAddFinishing}
            >
              Tambah Finishing
            </button>
            <ul className="mt-3 text-sm list-disc list-inside text-gray-700">
              {product.finishing.map((f) => (
                <li key={f.id}>
                  {f.jenis} - {f.keterangan}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t pt-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Detail Produk yang Sudah Ditambahkan
            </h2>

            <div className="space-y-4 text-sm text-gray-800">
              <div>
                <span className="font-medium text-gray-600">Template Desain:</span>
                <ul className="list-disc list-inside">
                  {product.template
                    .split(",")
                    .map((tpl, idx) => <li key={idx}>{tpl.trim()}</li>)}
                </ul>
              </div>

              <div>
                <span className="font-medium text-gray-600">Ukuran:</span>
                <ul className="list-disc list-inside">
                  {product.ukuran
                    .split(",")
                    .map((ukr, idx) => <li key={idx}>{ukr.trim()}</li>)}
                </ul>
              </div>

              <div>
                <span className="font-medium text-gray-600">Finishing:</span>
                <ul className="list-disc list-inside">
                  {product.finishing.map((f) => (
                    <li key={f.id}>
                      {f.jenis} - {f.keterangan}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-medium text-gray-600">Ketersediaan:</span>
                <p>{product.available ? "Tersedia" : "Tidak tersedia"}</p>
              </div>

              <div>
                <span className="font-medium text-gray-600">Harga:</span>
                <p>{newHarga.toLocaleString()}</p> {/* Format harga */}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => navigate("/admin/produk")}
            >
              Batal
            </button>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              onClick={handleSave}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductAdminPage;
