import { useState } from "react";
import Navbar from "../../components/customer/Navbar";
import CheckoutProductItem from "../../components/customer/checkout_page/CheckoutProductItem";
import DeliveryMethodCard from "../../components/customer/checkout_page/DeliveryMethodCard";
import Footer from "../../components/customer/Footer";

const CheckoutPage = () => {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<
    "self-pickup" | "delivery"
  >("self-pickup");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "cash" | "digital"
  >("cash");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const deliveryMethods = [
    {
      id: "self-pickup",
      icon: "tdesign:undertake-delivery-filled",
      title: "Ambil Sendiri",
      description: "Jl. Pemuda Desa Mijen, Kaliwungu, Kudus",
      additionalInfo: "Senin - Sabtu: 08.00 - 16.00",
    },
    {
      id: "delivery",
      icon: "streamline:transfer-motorcycle-solid",
      title: "Dikirim",
      description: "JohnDoe (08123456789)",
      additionalInfo: "Jl. NYC - Solo Km 12 New York, USA",
    },
  ];

  const paymentMethods = [
    {
      id: "cash",
      icon: "mdi:cash",
      title: "Tunai",
      description:
        selectedDeliveryMethod === "self-pickup"
          ? "Bayar saat ambil di toko"
          : "Bayar saat barang sampai (COD)",
      additionalInfo: "",
    },
    {
      id: "digital",
      icon: "mdi:credit-card",
      title: "Pembayaran Digital",
      description: "Bayar via Kartu Kredit/Debit, GoPay, ShopeePay, atau QRIS",
      additionalInfo: "",
    },
  ];

  const subtotalProduct = 60000;
  const shippingCost = selectedDeliveryMethod === "delivery" ? 12000 : 0;
  const serviceCost = 1000;
  const totalPayment = subtotalProduct + shippingCost + serviceCost;

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

      <div className="w-full my-4 px-4 sm:px-6 md:px-8 pt-8 md:pt-10">
        <h2 className="text-2xl md:text-3xl font-bold mt-6 mb-6 text-green-700">
          CHECKOUT
        </h2>
        <div className="w-full bg-white rounded-lg shadow-md p-4 sm:p-6">
          {/* Delivery Method Section */}
          <div className="mb-4">
            <h3 className="text-lg md:text-xl font-semibold mb-2 uppercase">
              Pilih Metode Pengiriman
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
          <div className="mb-4">
            <h3 className="text-lg md:text-xl font-semibold uppercase mb-2">
              Produk yang Dipesan
            </h3>
            <div className="hidden md:grid grid-cols-[3fr_1fr_1fr_1fr] items-center text-base mb-2 gap-2">
              <div className="font-medium text-black/50">Produk</div>
              <div className="text-center text-black/50 font-medium">
                Harga Satuan
              </div>
              <div className="text-center text-black/50 font-medium">
                Jumlah
              </div>
              <div className="text-center text-black/50 font-medium">
                Subtotal
              </div>
            </div>
            <div className="space-y-2">
              <CheckoutProductItem
                name="Paperbag"
                price={3000}
                quantity={100}
                image="/images/paperbag3.png"
              />
              <CheckoutProductItem
                name="Paperbag"
                price={3000}
                quantity={100}
                image="/images/paperbag3.png"
              />
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="mb-4">
            <h3 className="text-lg md:text-xl font-semibold uppercase mb-2">
              Pilih Metode Pembayaran
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {paymentMethods.map((method) => (
                <DeliveryMethodCard
                  key={method.id}
                  icon={method.icon}
                  title={method.title}
                  description={method.description}
                  additionalInfo={method.additionalInfo}
                  isSelected={selectedPaymentMethod === method.id}
                  onSelect={() =>
                    setSelectedPaymentMethod(method.id as "cash" | "digital")
                  }
                />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white border border-black/50 rounded-lg p-4 sm:p-6 mb-4">
            <div className="flex justify-between mb-1 text-base">
              <span className="text-black/50 font-medium">Subtotal Produk</span>
              <span>Rp. {subtotalProduct.toLocaleString()}</span>
            </div>
            {selectedDeliveryMethod === "delivery" && (
              <div className="flex justify-between mb-1 text-base">
                <span className="text-black/50 font-medium">
                  Biaya Pengiriman
                </span>
                <span>Rp. {shippingCost.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between mb-2 text-base">
              <span className="text-black/50 font-medium">Biaya Layanan</span>
              <span>Rp. {serviceCost.toLocaleString()}</span>
            </div>
            <div className="border-t border-black/50 pt-2 flex justify-between font-medium text-base sm:text-lg">
              <span>Total Pembayaran</span>
              <span className="text-green-700">
                Rp. {totalPayment.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Terms and Order Button */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="mr-2 h-4 w-4 accent-green-700 cursor-pointer"
                onChange={() => setTermsAccepted(!termsAccepted)}
                aria-checked={termsAccepted}
              />
              <label htmlFor="terms" className="text-sm sm:text-base">
                Dengan melanjutkan, Saya setuju dengan{" "}
                <span className="text-green-700 font-medium">
                  Syarat & Ketentuan
                </span>{" "}
                yang berlaku.
              </label>
            </div>
            <button
              className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold text-base sm:text-lg hover:bg-yellow-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer sticky bottom-0 md:static"
              disabled={!termsAccepted}
            >
              Buat Pesanan
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
