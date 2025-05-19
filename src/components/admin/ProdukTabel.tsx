import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { getBaseUrl } from "../../utils/getBaseUrl";
import { useToast } from "../toast/useToast";
import ConfirmPopup from "../ConfirmPopup";

type Product = {
  id: number;
  name: string;
  harga: number;
  imageUrl: string;
  status: boolean;
};

type FilterType = "all" | "tersedia" | "tidak";

const ProdukTabel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const res = await api.get("/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetched = res.data;

        const formatted = fetched.map(
          (item: {
            id: number;
            nama?: string;
            harga?: string | number;
            gambar?: string;
            status?: string;
          }) => ({
            id: item.id,
            name: item.nama || "Tanpa Nama",
            harga: Number(item.harga) || 0,
            imageUrl:
              item.gambar && item.gambar !== ""
                ? `${getBaseUrl()}/${item.gambar}`
                : "/images/default-product.png",
            status: item.status?.toLowerCase() === "tersedia",
          })
        );
        setProducts(formatted);
      } catch (err) {
        showToast("Gagal mengambil data produk.", "error");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [showToast]);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Gagal menghapus produk:", err);
      alert("Terjadi kesalahan saat menghapus produk.");
    }
  };

  const handleConfirm = () => {
    if (selectedId !== null) {
      handleDelete(selectedId);
    }
    setIsPopupOpen(false);
  };

  const handleCancel = () => {
    console.log("Cancelled!");
    setIsPopupOpen(false);
  };

  const handleOpenPopup = (id: number) => {
    setSelectedId(id);
    setIsPopupOpen(true);
  };

  const filteredProducts = products.filter((p) =>
    filter === "all" ? true : filter === "tersedia" ? p.status : !p.status
  );

  return (
    <div className="bg-white p-4 lg:p-6 rounded-2xl shadow-lg">
      <ConfirmPopup
        isOpen={isPopupOpen}
        message="Apakah Anda yakin ingin hapus produk ini?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onClose={() => setIsPopupOpen(false)}
        title="Hapus Produk"
      />
      <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-3">
        <h2 className="text-lg font-semibold text-green-700 flex items-center gap-1">
          <Icon icon="mdi:archive" className="w-5 h-5" />
          Produk
        </h2>
        <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-end w-full sm:w-auto">
          <div className="flex flex-wrap gap-2 justify-center w-full sm:w-auto">
            {["all", "tersedia", "tidak"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as FilterType)}
                className={`px-3 py-1 text-sm rounded-lg border ${
                  filter === f ? "bg-green-100" : "bg-white"
                }`}
              >
                {f === "all"
                  ? "Semua"
                  : f === "tersedia"
                  ? "Tersedia"
                  : "Tidak Tersedia"}
              </button>
            ))}
          </div>
          <button
            onClick={() => navigate("/admin/products/add")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2 rounded-lg shadow cursor-pointer w-full sm:w-auto"
          >
            + Tambah
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden space-y-4">
        {filteredProducts.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center gap-4">
              <img
                src={p.imageUrl}
                alt={p.name}
                className="w-20 h-20 object-contain rounded-lg border"
              />
              <div className="flex-1 space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Nama:</span>
                  <span>{p.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Harga:</span>
                  <span>Rp {p.harga.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Status:</span>
                  <span
                    className={`px-2 py-1 rounded-lg text-xs ${
                      p.status
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.status ? "Tersedia" : "Tidak Tersedia"}
                  </span>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => navigate(`/admin/products/${p.id}/edit`)}
                    className="text-green-700 hover:text-green-800 cursor-pointer"
                  >
                    <Icon icon="mdi:pencil-outline" width="20" height="20" />
                  </button>
                  <button
                    onClick={() => handleOpenPopup(p.id)}
                    className="text-red-600 hover:text-red-700 cursor-pointer"
                  >
                    <Icon icon="mdi:trash-can-outline" width="20" height="20" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      {isLoading ? (
        <div className="flex justify-start items-center">
          <Icon icon="mdi:loading" className="animate-spin mr-2" />
          <p className="text-gray-500">Memuat data...</p>
        </div>
      ) : (
        <div className="hidden lg:block overflow-x-auto rounded-xl shadow">
          <table className="w-full text-sm text-left">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="p-3 whitespace-nowrap">Gambar</th>
                <th className="p-3 whitespace-nowrap">Nama</th>
                <th className="p-3 whitespace-nowrap">Harga</th>
                <th className="p-3 whitespace-nowrap">Status</th>
                <th className="p-3 whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-gray-200 hover:bg-green-50 transition"
                >
                  <td className="p-3 whitespace-nowrap">
                    <img
                      src={p.imageUrl}
                      onError={(e) => (e.currentTarget.src = "/default.png")}
                      alt={p.name}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                  </td>
                  <td className="p-3 whitespace-nowrap">{p.name}</td>
                  <td className="p-3 whitespace-nowrap">
                    Rp {p.harga.toLocaleString()}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-lg text-xs ${
                        p.status
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {p.status ? "Tersedia" : "Tidak Tersedia"}
                    </span>
                  </td>
                  <td className="p-3 text-center space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => navigate(`/admin/products/${p.id}/edit`)}
                      className="text-green-700 hover:text-green-800 cursor-pointer"
                    >
                      <Icon icon="mdi:pencil-outline" width="20" height="20" />
                    </button>
                    <button
                      onClick={() => handleOpenPopup(p.id)}
                      className="text-red-600 hover:text-red-700 cursor-pointer"
                    >
                      <Icon
                        icon="mdi:trash-can-outline"
                        width="20"
                        height="20"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProdukTabel;
