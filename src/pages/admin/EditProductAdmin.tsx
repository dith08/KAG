import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import { Icon } from "@iconify/react";
import { Product } from "./ProductAdmin";

interface Finishing {
  id: number;
  productId: number;
  jenis: string;
  hargaTambahan: string;
}

interface ExtendedProduct extends Product {
  description?: string;
  material?: string;
}

const EditProductAdminPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ExtendedProduct | null>(null);
  const [newUkuran, setNewUkuran] = useState("");
  const [newFinishingJenis, setNewFinishingJenis] = useState("");
  const [newFinishingHargaTambahan, setnewFinishingHargaTambahan] =
    useState("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newHarga, setNewHarga] = useState("");

  useEffect(() => {
    if (id) {
      const dummyProduct: ExtendedProduct = {
        id: parseInt(id),
        name: "Brosur A",
        ukuran: "A4",
        bahanBakuId: 1,
        finishing: [
          {
            id: 1,
            productId: parseInt(id),
            jenis: "Laminasi Doff",
            hargaTambahan: "Rp.5.000",
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
      setNewHarga(dummyProduct.harga);
    }
  }, [id]);

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
    if (newFinishingJenis && newFinishingHargaTambahan && product) {
      const newFinishing: Finishing = {
        id: Date.now(),
        productId: product.id,
        jenis: newFinishingJenis,
        hargaTambahan: newFinishingHargaTambahan,
      };
      setProduct({
        ...product,
        finishing: [...product.finishing, newFinishing],
      });
      setNewFinishingJenis("");
      setnewFinishingHargaTambahan("");
    }
  };

  const handleSave = () => {
    const updatedProduct = {
      ...product,
      harga: newHarga,
    };
    console.log("Disimpan:", updatedProduct);
    navigate("/admin/produk");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const imagePreview = newImage
    ? URL.createObjectURL(newImage)
    : product?.imageUrl;

  if (!product) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin />
      <SidebarAdmin />
      <div className="md:ml-64 pt-28 px-4 md:px-8 pb-10">
        <form className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto space-y-6">
          <div className="flex flex-row items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-green-700 flex items-center gap-2">
              <Icon icon="mdi:archive-edit" className="w-7 h-7 md:w-9 md:h-9" />
              Edit Produk
            </h1>
            <div 
              onClick={() => setProduct({ ...product, available: !product.available })}
              className={`cursor-pointer flex items-center gap-2 p-2 md:p-3 rounded-lg transition-all duration-300 ${
                product.available 
                  ? 'bg-green-100 hover:bg-green-200' 
                  : 'bg-red-100 hover:bg-red-200'
              }`}
            >
              <div className={`w-3 md:w-4 h-3 md:h-4 rounded-full ${
                product.available ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className={`hidden md:block text-sm md:text-base font-medium ${
                product.available ? 'text-green-700' : 'text-red-700'
              }`}>
                {product.available ? 'Produk Tersedia' : 'Produk Tidak Tersedia'}
              </span>
              <Icon 
                icon={product.available ? 'mdi:check-circle' : 'mdi:close-circle'} 
                className={`ml-1 md:ml-2 w-4 md:w-5 h-4 md:h-5 ${
                  product.available ? 'text-green-600' : 'text-red-600'
                }`}
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-semibold">
              Nama Produk
            </label>
            <input
              type="text"
              className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              Gambar Produk
            </label>
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

          <div>
            <label className="block mb-1 font-semibold">
              Deskripsi Produk
            </label>
            <textarea
              className="w-full border border-black/50 rounded-lg min-h-[100px] p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              placeholder={`- Masukkan deskripsi produk dalam bentuk list\n- Gunakan tanda (-) untuk setiap poin`}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              Bahan
            </label>
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

          <div>
            <label className="block mb-1 font-semibol">
              Ukuran
            </label>
            <div className="flex gap-2">
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
              Ukuran: {product.ukuran}
            </p>
          </div>

          <div>
            <label className="block mb-1 font-semibold">
              Finishing
            </label>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                placeholder="Jenis Finishing"
                className="border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                value={newFinishingJenis}
                onChange={(e) => setNewFinishingJenis(e.target.value)}
              />
              <input
                type="text"
                placeholder="Harga Tambahan"
                className="border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                value={newFinishingHargaTambahan}
                onChange={(e) => setnewFinishingHargaTambahan(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-green-600 cursor-pointer"
              onClick={handleAddFinishing}
            >
              <Icon icon="mdi:plus" />
              Tambah Finishing
            </button>
            <ul className="mt-3 text-sm list-disc list-inside text-gray-700">
              {product.finishing.map((f) => (
                <li key={f.id}>
                  {f.jenis} - {f.hargaTambahan}
                </li>
              ))}
            </ul>
          </div>

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

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 flex items-center gap-1 cursor-pointer"
              onClick={() => navigate("/admin/produk")}
            >
              <Icon icon="mdi:arrow-left" />
              Batal
            </button>
            <button
              type="submit"
              onClick={handleSave}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 flex items-center gap-1 cursor-pointer"
            >
              <Icon icon="mdi:content-save" />
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductAdminPage;