import React, { useState } from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import OrderCard from "../../components/admin/OrderCardAdmin";

const PesananPage: React.FC = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      image: "https://i.pinimg.com/474x/93/93/e1/9393e1708a98f94b38c31216b6ebcf1c.jpg",
      title: "Buku Tulis",
      variant: "16cm x 21cm",
      quantity: "300pcs",
      price: "Rp. 671.000",
      buyer: "Isham",
      address: "Kaliwungu, Kudus, Jawa...",
      status: "Belum Diproses",
      note: "Catatan khusus...",
      payment: "Tunai",
      design: "Gambar",
    },
    {
      id: 2,
      image: "https://i.pinimg.com/474x/93/93/e1/9393e1708a98f94b38c31216b6ebcf1c.jpg",
      title: "Buku Tulis",
      variant: "16cm x 21cm",
      quantity: "300pcs",
      price: "Rp. 671.000",
      buyer: "Isham",
      address: "Kaliwungu, Kudus, Jawa...",
      status: "Diproses",
      note: "Catatan khusus...",
      payment: "Tunai",
      design: "Gambar",
    },
    {
      id: 3,
      image: "https://i.pinimg.com/474x/93/93/e1/9393e1708a98f94b38c31216b6ebcf1c.jpg",
      title: "Buku Tulis",
      variant: "16cm x 21cm",
      quantity: "300pcs",
      price: "Rp. 671.000",
      buyer: "Isham",
      address: "Kaliwungu, Kudus, Jawa...",
      status: "Diproses",
      note: "Catatan khusus...",
      payment: "Tunai",
      design: "Gambar",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [editedStatus, setEditedStatus] = useState<string>("");
  const [editedPayment, setEditedPayment] = useState<string>("");

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setEditedStatus(order.status);
    setEditedPayment(order.payment);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = (newStatus: string) => {
    setEditedStatus(newStatus);
  };

  const handlePaymentChange = (newPayment: string) => {
    setEditedPayment(newPayment);
  };

  const handleSaveChange = () => {
    if (!selectedOrder) return;

    const updatedOrders = orders.map((order) =>
      order.id === selectedOrder.id
        ? { ...order, status: editedStatus, payment: editedPayment }
        : order
    );

    setOrders(updatedOrders);
    setSelectedOrder(null);
    setIsModalOpen(false);

    // ✅ Jika ada koneksi API, bisa kirim PUT ke backend di sini
    console.log("Data tersimpan:", {
      id: selectedOrder.id,
      status: editedStatus,
      payment: editedPayment,
    });
  };

  const handlePrintInvoice = () => {
    alert("Fungsi cetak/unduh invoice belum diimplementasikan.");
  };

  return (
    <div className="flex flex-col lg:flex-row lg:ml-64 mt-24 p-4">
      <SidebarAdmin />
      <div className="flex-1 w-full">
        <NavbarAdmin />
        <div className="p-4 space-y-6">
          <h1 className="text-2xl font-bold mb-4 text-center lg:text-left">Kelola Pesanan</h1>

          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                id={order.id}
                image={order.image}
                title={order.title}
                variant={order.variant}
                quantity={order.quantity}
                price={order.price}
                design={order.design}
                buyer={order.buyer}
                address={order.address}
                status={order.status}
                note={order.note}
                payment={order.payment}
                onView={() => handleViewOrder(order)}
                onStatusChange={handleStatusChange}
                onPaymentChange={handlePaymentChange}
                onSave={handleSaveChange}
                isActive={selectedOrder?.id === order.id}
              />
            ))}
          </div>
        </div>

        {/* Modal Detail Pesanan */}
        {isModalOpen && selectedOrder && (
          <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-lg w-[90%] sm:w-[80%] max-w-4xl overflow-hidden">
              <div className="bg-[#FDD47D] px-6 py-4 flex gap-4 items-start">
                <img
                  src={selectedOrder.image}
                  alt={selectedOrder.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-5 gap-2 text-sm">
                  <div className="col-span-1 sm:col-span-2">
                    <h2 className="text-base font-semibold underline">{selectedOrder.title}</h2>
                    <p className="text-gray-800">Variasi</p>
                    <p className="text-gray-700">{selectedOrder.variant}</p>
                  </div>
                  <p className="col-span-1 self-center">{selectedOrder.quantity}</p>
                  <p className="col-span-1 self-center">{selectedOrder.price}</p>
                  <div className="col-span-1 self-center">
                    <p className="text-sm">Desain</p>
                    <button className="bg-gray-200 px-2 py-1 rounded text-sm font-medium">
                      {selectedOrder.design}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-[#FDC264] px-6 py-3 grid grid-cols-1 sm:grid-cols-6 gap-2 text-sm items-center">
                <div>
                  <p className="font-medium">Pembeli</p>
                  <p>{selectedOrder.buyer}</p>
                </div>
                <div>
                  <p className="font-medium">Alamat</p>
                  <p>{selectedOrder.address}</p>
                </div>
                <div>
                  <p className="font-medium">Status</p>
                  <p>{editedStatus}</p>
                </div>
                <div>
                  <p className="font-medium">Catatan</p>
                  <p>{selectedOrder.note}</p>
                </div>
                <div>
                  <p className="font-medium">Pembayaran</p>
                  <p>{editedPayment}</p>
                </div>
                <div className="flex flex-col items-end gap-2 mt-4 sm:mt-0">
                  <button
                    onClick={handlePrintInvoice}
                    className="bg-green-500 text-white py-1 px-3 rounded text-sm"
                  >
                    Cetak/Unduh Invoice
                  </button>
                  <button
                    onClick={handleModalClose}
                    className="bg-gray-300 text-black py-1 px-3 rounded text-sm"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PesananPage;
