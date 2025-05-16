import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import { Icon } from "@iconify/react";
import api from "../../services/api";

export interface BahanBaku {
  id: number;
  nama: string;
  jenis: string;
  stok: number;
  satuan: string;
  harga: string;
  kategori?: string;
}

const EditBahanBakuAdminPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [bahan, setBahan] = useState<BahanBaku | null>(null);
  const [kategori, setKategori] = useState<string>("umum");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBahan = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/api/materials/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBahan(response.data);
        setKategori(response.data.kategori || "umum");
      } catch (error) {
        console.error("Gagal mengambil data bahan baku:", error);
        alert("Gagal memuat data bahan baku.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBahan();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (bahan) {
      const { name, value } = e.target;
      setBahan({ ...bahan, [name]: value });
    }
  };

  const handleSubmit = async () => {
    if (!bahan) return;

    try {
      const token = localStorage.getItem("token");
      const dataToSave = { ...bahan, kategori };

      await api.put(`/api/materials/${id}`, dataToSave, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Data berhasil diperbarui.");
      navigate("/admin/produk");
    } catch (error) {
      console.error("Gagal menyimpan data bahan:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin />
      <SidebarAdmin />
      <div className="md:ml-64 pt-28 px-4 md:px-8 pb-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-10 max-w-3xl mx-auto space-y-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Icon
              icon="mdi:invoice-text-edit"
              className="text-green-700 text-4xl"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-green-700">
              Edit Bahan Baku
            </h1>
          </div>

          {loading ? (
            <p className="text-gray-500">Memuat data...</p>
          ) : bahan ? (
            <>
              <div>
                <label className="block mb-2 font-semibold">Nama Bahan</label>
                <input
                  type="text"
                  name="nama"
                  value={bahan.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama bahan baku"
                  className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Jenis</label>
                <input
                  type="text"
                  name="jenis"
                  value={bahan.jenis}
                  onChange={handleChange}
                  placeholder="Masukkan jenis bahan baku"
                  className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-semibold">Stok</label>
                  <input
                    type="number"
                    name="stok"
                    min="0"
                    value={bahan.stok}
                    onChange={handleChange}
                    placeholder="Masukkan stok bahan baku"
                    className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold">Satuan</label>
                  <input
                    type="text"
                    name="satuan"
                    value={bahan.satuan}
                    onChange={handleChange}
                    placeholder="Contoh: lembar, ml"
                    className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-semibold">Harga</label>
                <input
                  type="text"
                  name="harga"
                  value={bahan.harga}
                  onChange={handleChange}
                  placeholder="Contoh: Rp.75.000/rim"
                  className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Kategori</label>
                <select
                  className="w-full border border-black/50 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-green-700"
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  required
                >
                  <option value="cover">Cover</option>
                  <option value="isi">Isi</option>
                  <option value="umum">Umum</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  className="flex items-center bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transitio cursor-pointer"
                  onClick={() => navigate("/admin/produk")}
                >
                  <Icon icon="mdi:arrow-left" className="mr-2" />
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition cursor-pointer"
                >
                  <Icon icon="mdi:content-save" className="mr-2" />
                  Simpan
                </button>
              </div>
            </>
          ) : (
            <p className="text-red-500">Data bahan tidak ditemukan.</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditBahanBakuAdminPage;
