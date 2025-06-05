import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { getBaseUrl } from "../../utils/getBaseUrl";
import { useToast } from "../toast/useToast";
import ConfirmPopup from "../ConfirmPopup";
import { ModernTable } from "../../components/admin/ModernTable";

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

  const tableData = filteredProducts.map((p) => ({
    Gambar: (
      <img
        src={p.imageUrl}
        onError={(e) => (e.currentTarget.src = "/default.png")}
        alt={p.name}
        className="w-20 h-20 object-cover rounded-lg border"
      />
    ),
    Nama: p.name,
    Harga: `Rp ${p.harga.toLocaleString()}`,
    Status: (
      <span
        className={`px-2 py-1 rounded-lg text-xs ${
          p.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}
      >
        {p.status ? "Tersedia" : "Tidak Tersedia"}
      </span>
    ),
    Aksi: (
      <div className="flex space-x-2">
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
    ),
  }));

  return (
    <div className="bg-white p-2 rounded-2xl">
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

      {isLoading ? (
        <div className="flex justify-start items-center">
          <Icon icon="mdi:loading" className="animate-spin mr-2" />
          <p className="text-gray-500">Memuat data...</p>
        </div>
      ) : (
        <ModernTable
          headers={["Gambar", "Nama", "Harga", "Status", "Aksi"]}
          data={tableData}
          keyField="id"
        />
      )}
    </div>
  );
};

export default ProdukTabel;
