import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import { Icon as IconifyIcon } from "@iconify/react";
import StatusDropdown from "../../components/admin/StatusDropdown";

const DetailPesananAdmin: React.FC = () => {
  const location = useLocation();
  const order = location.state;

  const [statusPesanan, setStatusPesanan] = useState(order.status);
  const [statusDesain, setStatusDesain] = useState(
    order.status_desain || "Sedang Diverifikasi"
  );

  const markerIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const handleUpdateStatus = () => {
    alert(`Status pesanan: ${statusPesanan}\nStatus desain: ${statusDesain}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarAdmin />
      <SidebarAdmin />
      <div className="md:ml-64 pt-30 px-4 md:px-8 pb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-8 flex items-center gap-3">
            <IconifyIcon icon="mdi:clipboard-list" className="text-3xl" />
            Detail Pesanan #{order.id}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-yellow-600 mb-4 flex items-center gap-2">
                <IconifyIcon icon="mdi:map" className="text-2xl" />
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
                    attribution="&copy; OpenStreetMap contributors"
                  />
                  <Marker position={[order.lat, order.lng]} icon={markerIcon}>
                    <Popup>{order.alamat_pengiriman}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

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

              <div className="bg-gray-50 rounded-xl p-6">
                <label className="font-semibold block mb-3">
                  Status Pesanan:
                </label>
                <StatusDropdown
                  initialStatus={statusPesanan}
                  onStatusChange={(status: string) => setStatusPesanan(status)}
                  onDetailStatusChange={(detail: string) =>
                    setStatusDesain(detail)
                  }
                />

                {/* Menampilkan Detail Status hanya ketika statusPesanan adalah "Sedang Diproses" */}
                {statusPesanan === "Sedang Diproses" && (
                  <div className="mt-3 text-gray-700">
                    <span className="font-medium">Detail Status:</span>{" "}
                    {statusDesain}
                  </div>
                )}

                <button
                  onClick={handleUpdateStatus}
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg shadow transition duration-200"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-semibold text-green-600 flex items-center gap-2 mb-6">
              <IconifyIcon icon="mdi:package-variant" className="text-2xl" />
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

              <div className="pt-4 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-semibold">Status Desain:</span>
                  <select
                    className="border rounded-lg px-3 py-2 bg-white"
                    value={statusDesain}
                    onChange={(e) => setStatusDesain(e.target.value)}
                  >
                    <option>Sedang Diverifikasi</option>
                    <option>Diterima</option>
                    <option>Ditolak</option>
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">File Desain:</span>
                  <a
                    href={order.file_desain}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Download
                  </a>
                </div>
              </div>
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
    <IconifyIcon icon={icon} className="text-green-600 text-xl flex-shrink-0" />
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

export default DetailPesananAdmin;
