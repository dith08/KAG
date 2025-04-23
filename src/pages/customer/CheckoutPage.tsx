import { useState } from "react";
import Navbar from "../../components/customer/Navbar";
import CheckoutProductItem from "../../components/customer/checkout_page/CheckoutProductItem";
import DeliveryMethodCard from "../../components/customer/checkout_page/DeliveryMethodCard";
import PaymentMethodCard from "../../components/customer/checkout_page/PaymentMethodCard";
import Footer from "../../components/customer/Footer";

const CheckoutPage = () => {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<
    "self-pickup" | "delivery"
  >("self-pickup");

  const deliveryMethods = [
    {
      id: "self-pickup",
      icon: "tdesign:undertake-delivery-filled",
      title: "Ambil Sendiri",
      description: "Jl. Raya Percetakan No. 123, Kota XYZ, Indonesia",
      additionalInfo: "Senin - Sabtu 08.00 - 16.00",
    },
    {
      id: "delivery",
      icon: "streamline:transfer-motorcycle-solid",
      title: "Dikirim",
      description: "JohnDoe (08123456789)",
      additionalInfo: "Jl. NYC - Solo Km 12 New York, USA",
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

      <div className="container mx-auto my-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold pt-16 pb-5 text-green-700">
          CHECKOUT
        </h2>
        <div className="w-full bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
          {/* Delivery Method Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 uppercase">
              Pilih Metode Pengiriman
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
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
            {/* Mobile Only: Tulisan Produk yang Dipesan di atas */}
            <h3 className="text-xl font-semibold uppercase mb-4 md:hidden">
              Produk yang Dipesan
            </h3>

            {/* Header untuk desktop */}
            <div className="hidden md:grid grid-cols-4 items-center text-sm mb-4 gap-2">
              <h3 className="text-xl font-semibold uppercase col-span-1">
                Produk yang Dipesan
              </h3>
              <div className="text-center text-black/50 font-medium">
                Harga Satuan
              </div>
              <div className="text-center text-black/50 font-medium">
                Jumlah
              </div>
              <div className="text-center text-black/50 font-medium">
                Subtotal Produk
              </div>
            </div>

            {/* Daftar produk */}
            <CheckoutProductItem name="Paperbag" price={30000} quantity={1} />
            <CheckoutProductItem name="Paperbag" price={30000} quantity={1} />
          </div>

          {/* Payment Method Section */}
          <div className="mb-6">
            <PaymentMethodCard />
          </div>

          {/* Order Summary */}
          <div className="bg-white border-2 border-black/50 rounded-lg p-6 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-black/50 font-medium">Subtotal Produk</span>
              <span>Rp. {subtotalProduct.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-black/50 font-medium">
                Biaya Pengiriman
              </span>
              <span>Rp. {shippingCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-black/50 font-medium">Biaya Layanan</span>
              <span>Rp. {serviceCost.toLocaleString()}</span>
            </div>
            <div className="border-t border-black/50 pt-4 flex justify-between font-medium">
              <span>Total Pembayaran</span>
              <span className="text-green-700">
                Rp. {totalPayment.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Order Button */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="terms"
              className="mr-2 accent-green-700 cursor-pointer"
            />
            <label htmlFor="terms" className="text-sm">
              Dengan melanjutkan, Saya setuju dengan{" "}
              <span className="text-green-700 font-medium">Syarat & Ketentuan</span> yang berlaku.
            </label>
          </div>

          <button className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition">
            Buat Pesanan
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
