import React from "react";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";

type Payment = {
  id: number;
  orderNumber: string;
  customerName: string;
  amount: number;
  paymentProof: string;
  status: "Pending" | "Confirmed";
};

const AdminPaymentPage: React.FC = () => {
  const payments: Payment[] = [
    {
      id: 1,
      orderNumber: "ORD001",
      customerName: "Radith",
      amount: 150000,
      paymentProof: "/images/bukti1.jpg",
      status: "Pending",
    },
    {
      id: 2,
      orderNumber: "ORD002",
      customerName: "Rifqi",
      amount: 230000,
      paymentProof: "/images/bukti2.jpg",
      status: "Confirmed",
    },
  ];

  return (
    <div className="flex ml-64 mt-24 p-6">
      <SidebarAdmin />
      <div className="flex-1">
        <NavbarAdmin />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Kelola Pembayaran</h1>

          <div className="bg-white shadow rounded-lg overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="p-3">No</th>
                  <th className="p-3">Nomor Pesanan</th>
                  <th className="p-3">Pelanggan</th>
                  <th className="p-3">Jumlah Bayar</th>
                  <th className="p-3">Bukti Pembayaran</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment.id} className="border-t bg-[#E8F5E9]">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 font-semibold">{payment.orderNumber}</td>
                    <td className="p-3">{payment.customerName}</td>
                    <td className="p-3">Rp{payment.amount.toLocaleString()}</td>
                    <td className="p-3">
                      <a
                        href={payment.paymentProof}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Lihat Bukti
                      </a>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          payment.status === "Confirmed"
                            ? "bg-green-500"
                            : "bg-orange-400"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {payment.status === "Pending" && (
                        <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                          Konfirmasi
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPaymentPage;
