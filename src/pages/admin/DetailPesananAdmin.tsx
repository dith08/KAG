import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import { Icon } from "@iconify/react";
import StatusDropdown from "../../components/admin/StatusDropdown";

// Dummy Data Pesanan (Tanggal diperbarui ke Juni 2025)
const dummyPesanan = [
  {
    id: "#ORD001",
    user_id: "USR001",
    alamat_pengiriman: "Jl. Raya No. 123, Jakarta",
    total_harga: 250000,
    metode_pembayaran: "Transfer Bank",
    metode_pengiriman: "JNE",
    nomor_resi: "JN123456789",
    catatan: "Harap antar pagi hari",
    lat: -6.1745,
    lng: 106.8227,
    status: "Menunggu Konfirmasi",
    status_desain: "Sedang Diverifikasi",
    order_id: "#ORD001",
    product_id: "PROD001",
    quantity: 2,
    harga: 125000,
    bahan: "Karton",
    ukuran: "A4",
    finishing: "Laminasi",
    file_desain: "https://example.com/design.pdf",
  },
  {
    id: "#ORD002",
    user_id: "USR002",
    alamat_pengiriman: "Jl. Sudirman No. 45, Bandung",
    total_harga: 300000,
    metode_pembayaran: "COD",
    metode_pengiriman: "J&T",
    nomor_resi: null,
    catatan: null,
    lat: -6.9175,
    lng: 107.6191,
    status: "Sedang Diproses",
    status_desain: "Diterima",
    order_id: "#ORD002",
    product_id: "PROD002",
    quantity: 1,
    harga: 300000,
    bahan: "HVS",
    ukuran: "A3",
    finishing: "Matte",
    file_desain: "https://example.com/design2.pdf",
  },
];

const DetailPesananAdminPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [statusPesanan, setStatusPesanan] = useState("");
  const [detailStatusPesanan, setDetailStatusPesanan] = useState("");
  const [statusDesain, setStatusDesain] = useState("Sedang Diverifikasi");

  useEffect(() => {
    // Simulasi pengambilan data berdasarkan id (ganti dengan API call)
    console.log("ID received from params:", id); // Logging untuk debugging
    const normalizedId = id ? `#${id.replace("#", "")}` : ""; // Tambahkan # jika tidak ada
    const foundOrder = dummyPesanan.find((p) => p.id === normalizedId || p.id === id);
    if (foundOrder) {
      setOrder(foundOrder);
      setStatusPesanan(foundOrder.status);
      setStatusDesain(foundOrder.status_desain || "Sedang Diverifikasi");
    } else {
      console.error("Pesanan tidak ditemukan untuk ID:", id);
      navigate("/admin/pesanan"); // Redirect jika tidak ditemukan
    }
  }, [id, navigate]);

  const markerIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const handleUpdateStatus = () => {
    alert(
      `Status pesanan: ${statusPesanan}\nDetail status: ${detailStatusPesanan}\nStatus desain: ${statusDesain}`
    );
  };

  if (!order) return <div className="p-4 text-center">Memuat...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin />
      <SidebarAdmin />
      <div className="md:ml-64 pt-30 px-4 md:px-8 pb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate("/admin/pesanan")} // Ubah ke /admin/pesanan untuk konsistensi
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition cursor-pointer"
            >
              <Icon icon="mdi:arrow-left" className="text-xl" />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-green-700 flex items-center gap-3">
              <Icon icon="mdi:clipboard-list" className="text-3xl" />
              Detail Pesanan {order.id}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-yellow-500 mb-4 flex items-center gap-2">
                <Icon icon="mdi:map" className="text-2xl" />
                Lokasi Pengiriman
              </h2>
              <div className="h-[400px] rounded-xl overflow-hidden shadow-md relative z-[5]">
                <MapContainer
                  center={[order.lat, order.lng]}
                  zoom={15}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="© OpenStreetMap contributors"
                  />
                  <Marker position={[order.lat, order.lng]} icon={markerIcon}>
                    <Popup>{order.alamat_pengiriman}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            {/* Info & Status */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <Info
                  label="User ID"
                  value={order.user_id}
                  icon="mdi:account"
                />
                <Info
                  label="Alamat"
                  value={order.alamat_pengiriman}
                  icon="mdi:map-marker"
                />
                <Info
                  label="Total Harga"
                  value={`Rp ${order.total_harga.toLocaleString()}`}
                  icon="mdi:cash"
                />
                <Info
                  label="Metode Pembayaran"
                  value={order.metode_pembayaran}
                  icon="mdi:credit-card"
                />
                <Info
                  label="Metode Pengiriman"
                  value={order.metode_pengiriman}
                  icon="mdi:truck-delivery"
                />
                <Info
                  label="Nomor Resi"
                  value={order.nomor_resi || "-"}
                  icon="mdi:barcode"
                />
                <Info
                  label="Catatan"
                  value={order.catatan || "-"}
                  icon="mdi:note-text"
                />
              </div>

              {/* Status Pesanan */}
              <div className="bg-gray-50 rounded-xl p-6">
                <label className="font-semibold block mb-3">
                  Status Pesanan:
                </label>
                <StatusDropdown
                  initialStatus={statusPesanan}
                  options={[
                    "Menunggu Konfirmasi",
                    "Sedang Diproses",
                    "Dikirim",
                    "Selesai",
                  ]}
                  onStatusChange={(status) => setStatusPesanan(status)}
                  onDetailStatusChange={(detail) =>
                    setDetailStatusPesanan(detail)
                  }
                />

                {statusPesanan === "Sedang Diproses" && (
                  <div className="mt-3 text-gray-700">
                    <span className="font-medium">Detail Status:</span>{" "}
                    {detailStatusPesanan || "-"}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Detail Produk + Status Desain + File Desain */}
          <div className="mt-12 space-y-6">
            <h2 className="text-xl font-semibold text-green-600 flex items-center gap-2">
              <Icon icon="mdi:package-variant" className="text-2xl" />
              Detail Produk
            </h2>

            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailItem label="Order ID" value={order.order_id} />
                <DetailItem label="Product ID" value={order.product_id} />
                <DetailItem label="Quantity" value={order.quantity} />
                <DetailItem label="Harga" value={`Rp ${order.harga}`} />
                <DetailItem label="Bahan" value={order.bahan} />
                <DetailItem label="Ukuran" value={order.ukuran} />
                <DetailItem label="Finishing" value={order.finishing} />
              </div>

              {/* Status Desain & File Desain */}
              <div className="pt-4 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-semibold">Status Desain:</span>
                  <StatusDropdown
                    initialStatus={statusDesain}
                    options={["Sedang Diverifikasi", "Diterima", "Ditolak"]}
                    onStatusChange={(status) => setStatusDesain(status)}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">File Desain:</span>
                  <a
                    href={order.file_desain}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
                  >
                    Download
                  </a>
                </div>
              </div>

              {/* BUTTON UPDATE STATUS */}
              <button
                onClick={handleUpdateStatus}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg shadow transition cursor-pointer"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) => (
  <div className="flex items-center gap-3">
    <Icon icon={icon} className="text-green-600 text-xl flex-shrink-0" />
    <div className="flex-1">
      <strong className="text-gray-700">{label}:</strong>{" "}
      <span className="text-gray-600">{value}</span>
    </div>
  </div>
);

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col space-y-1">
    <span className="text-gray-600 text-sm">{label}</span>
    <span className="font-semibold text-gray-800">{value}</span>
  </div>
);

export default DetailPesananAdminPage;
