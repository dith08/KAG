// pages/customer/checkout.tsx
import React, { useState } from "react";
import Navbar from "../../components/customer/Navbar";
import CheckoutProductItem from "../../components/customer/CheckoutProductItem";
import DeliveryMethodCard from "../../components/customer/DeliveryMethodCard";
import PaymentMethodCard from "../../components/customer/PaymentMethodCard";

const CheckoutPage = () => {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<
    "self-pickup" | "delivery"
  >("self-pickup");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "bank-transfer" | "e-wallet" | "cash"
  >("cash");

  const deliveryMethods = [
    {
      id: "self-pickup",
      icon: "mdi:hand-wave",
      title: "Ambil Sendiri",
      description: "Jl. Raya Percetakan No. 123, Kota XYZ, Indonesia",
      additionalInfo: "Senin - Sabtu 08.00 - 16.00",
    },
    {
      id: "delivery",
      icon: "mdi:truck-delivery",
      title: "Dikirim",
      description: "JohnDoe (08123456789)",
      additionalInfo: "Jl. NYC - Solo Km 12 New York, USA",
    },
  ];

  const paymentMethods = [
    {
      id: "bank-transfer",
      method: "Transfer Bank",
      icon: null,
    },
    {
      id: "e-wallet",
      method: "E-Wallet",
      icon: null,
    },
    {
      id: "cash",
      method: "Tunai",
      icon: null,
    },
  ];

  const subtotalProduct = 60000;
  const shippingCost = 12000;
  const serviceCost = 1000;
  const totalPayment = subtotalProduct + shippingCost + serviceCost;

  return (
    <div className="bg-[#D9D9D9] min-h-screen">
      <Navbar
        brand="KARYA ADI GRAFIKA"
        navItems={[
          { label: "Home", href: "/customer" },
          { label: "Produk", href: "/customer/produk" },
          { label: "Pesanan Saya", href: "/customer/pesanan" },
          { label: "Keranjang", href: "/customer/keranjang" },
        ]}
        isLoggedIn={true}
      />

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

        {/* Delivery Method Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">
            Pilih Metode Pengiriman
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {deliveryMethods.map((method) => (
              <DeliveryMethodCard
                key={method.id}
                icon={method.icon}
                title={method.title}
                description={method.description}
                additionalInfo={method.additionalInfo}
                isSelected={selectedDeliveryMethod === method.id}
                onSelect={() =>
                  setSelectedDeliveryMethod(
                    method.id as "self-pickup" | "delivery"
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* Product Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Produk yang Dipesan</h3>
          <CheckoutProductItem name="Paperbag" price={30000} quantity={2} />
        </div>

        {/* Payment Method Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Metode Pembayaran</h3>
          <div className="grid grid-cols-3 gap-4">
            {paymentMethods.map((method) => (
              <PaymentMethodCard
                key={method.id}
                method={method.method}
                icon={method.icon}
                isSelected={selectedPaymentMethod === method.id}
                onSelect={() =>
                  setSelectedPaymentMethod(
                    method.id as "bank-transfer" | "e-wallet" | "cash"
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg">
          <div className="flex justify-between mb-2">
            <span>Subtotal Produk</span>
            <span>Rp. {subtotalProduct.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Biaya Pengiriman</span>
            <span>Rp. {shippingCost.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Biaya Layanan</span>
            <span>Rp. {serviceCost.toLocaleString()}</span>
          </div>
          <div className="border-t pt-4 flex justify-between font-bold">
            <span>Total Pembayaran</span>
            <span className="text-green-600">
              Rp. {totalPayment.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Order Button */}
        <button className="w-full bg-yellow-500 text-white py-3 rounded-lg mt-6 font-semibold hover:bg-yellow-600 transition">
          Buat Pesanan
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
