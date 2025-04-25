import React, { useState } from "react";
import Navbar from "../../components/customer/Navbar";
import {
  Order,
  OrderStatus,
  PaymentStatus,
} from "../../components/customer/pesanan_page/Types";
import TabBar from "../../components/customer/pesanan_page/TabBar";
import OrderList from "../../components/customer/pesanan_page/OrderList";
import Footer from "../../components/customer/Footer";

const PesananSayaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<OrderStatus>(
    OrderStatus.COMPLETED
  );

  const orders: Order[] = [
    {
      id: "1",
      product: "Paperbag",
      price: 30000,
      quantity: 1,
      totalPrice: 73000,
      status: OrderStatus.WAITING_CONFIRMATION,
      paymentStatus: PaymentStatus.UNPAID,
      deliveryEstimate: "",
      verificationStep: "",
    },
    {
      id: "2",
      product: "Paperbag",
      price: 30000,
      quantity: 2,
      totalPrice: 73000,
      status: OrderStatus.WAITING_CONFIRMATION,
      paymentStatus: PaymentStatus.PAID,
      deliveryEstimate: "",
      verificationStep: "",
    },
    {
      id: "3",
      product: "Paperbag",
      price: 30000,
      quantity: 1,
      totalPrice: 73000,
      status: OrderStatus.PROCESSING,
      paymentStatus: PaymentStatus.PAID,
      deliveryEstimate: "",
      verificationStep: "Verifikasi desain dan file",
    },
    {
      id: "4",
      product: "Paperbag",
      price: 30000,
      quantity: 1,
      totalPrice: 73000,
      status: OrderStatus.SHIPPED,
      paymentStatus: PaymentStatus.PAID,
      deliveryEstimate: "14.30 WIB",
      verificationStep: "",
    },
    {
      id: "5",
      product: "Paperbag",
      price: 30000,
      quantity: 1,
      totalPrice: 73000,
      status: OrderStatus.COMPLETED,
      paymentStatus: PaymentStatus.PAID,
      deliveryEstimate: "",
      verificationStep: "",
    },
  ];

  const filteredOrders = orders.filter((order) => order.status === activeTab);

  return (
    <div className="bg-[#D9D9D9] min-h-screen">
      <Navbar
        brand="KARYA ADI GRAFIKA"
        navItems={[
          { label: "Home", href: "/" },
          { label: "Produk", href: "/customer/produk" },
          { label: "Pesanan Saya", href: "/customer/pesanan" },
          { label: "Keranjang", href: "/customer/keranjang" },
        ]}
      />
      <div className="w-full mx-auto pt-24 px-4 sm:px-6 md:px-10 lg:px-14 mb-10">
        <TabBar activeTab={activeTab} onChangeTab={setActiveTab} />
        <OrderList orders={filteredOrders} />
      </div>
      <Footer />
    </div>
  );
};

export default PesananSayaPage;
