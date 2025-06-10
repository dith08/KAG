import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/customer/Navbar";
import CheckoutProductItem from "../../components/customer/checkout_page/CheckoutProductItem";
import DeliveryMethodCard from "../../components/customer/checkout_page/DeliveryMethodCard";
import Footer from "../../components/customer/Footer";
import api from "../../services/api";
import { getBaseUrl } from "../../utils/getBaseUrl";

interface CheckoutData {
  user_profile: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  products: Array<{
    cart_id: number;
    product_id: number;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
    image: string;
  }>;
  subtotal_product: number;
  total_items: number;
  total_quantity: number;
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<
    "Ambil di Toko" | "Dikirim"
  >("Ambil di Toko");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "Tunai" | "Midtrans"
  >("Tunai");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedData = sessionStorage.getItem("checkoutData");
    if (storedData) {
      const data = JSON.parse(storedData);
      setCheckoutData(data);
      setDeliveryAddress(data.user_profile.address);
    } else {
      navigate("/customer/keranjang");
      return;
    }
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          const { lat, lng } = response.data;
          setUserLocation({ lat: parseFloat(lat), lng: parseFloat(lng) });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        alert("Gagal mengambil data lokasi, Senpai. Silakan coba lagi.");
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (selectedDeliveryMethod === "Dikirim" && userLocation) {
      calculateShippingCost();
    } else {
      setShippingCost(0);
    }
  }, [selectedDeliveryMethod, userLocation]);

  const calculateShippingCost = async () => {
    if (!userLocation) return;

    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/api/shipping-cost/calculate",
        {
          lat: userLocation.lat,
          lng: userLocation.lng,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        setShippingCost(parseFloat(response.data.data.shipping_cost));
      }
    } catch (error) {
      console.error("Error calculating shipping cost:", error);
      alert("Gagal menghitung biaya pengiriman, Senpai. Silakan coba lagi.");
    }
  };

  const handleCheckout = async () => {
    if (!checkoutData || !termsAccepted) {
      alert("Harap setujui syarat dan ketentuan terlebih dahulu, Senpai!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const checkoutPayload = {
        metode_pembayaran: selectedPaymentMethod,
        metode_pengiriman: selectedDeliveryMethod,
        alamat_pengiriman: deliveryAddress,
        ...(selectedDeliveryMethod === "Dikirim" && userLocation && {
          lat: userLocation.lat,
          lng: userLocation.lng,
        }),
      };

      const response = await api.post("/api/checkout", checkoutPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === "success") {
        sessionStorage.removeItem("checkoutData");
        alert("Pesanan berhasil dibuat, Senpai!");
        navigate("/customer/pesanan");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      alert("Terjadi kesalahan saat membuat pesanan, Senpai. Silakan coba lagi.");
    }
  };

  const deliveryMethods = [
    {
      id: "Ambil di Toko",
      icon: "tdesign:undertake-delivery-filled",
      title: "Ambil di Toko",
      description: "Jl. Pemuda Desa Mijen, Kaliwungu, Kudus",
      additionalInfo: "Senin - Sabtu: 08.00 - 16.00",
    },
    {
      id: "Dikirim",
      icon: "streamline:transfer-motorcycle-solid",
      title: "Dikirim",
      description: `${checkoutData?.user_profile.name} (${checkoutData?.user_profile.phone})`,
      additionalInfo: checkoutData?.user_profile.address || "",
    },
  ];

  const paymentMethods = [
    {
      id: "Tunai",
      icon: "mdi:cash",
      title: "Tunai",
      description:
        selectedDeliveryMethod === "Ambil di Toko"
          ? "Bayar saat ambil di toko"
          : "Bayar saat barang sampai (COD)",
      additionalInfo: "",
    },
    {
      id: "Midtrans",
      icon: "mdi:credit-card",
      title: "Pembayaran Digital",
      description: "Bayar via Kartu Kredit/Debit, GoPay, ShopeePay, atau QRIS",
      additionalInfo: "",
    },
  ];

  if (loading || !checkoutData) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center text-base sm:text-lg font-medium text-gray-600">
        Memuat...
      </div>
    );
  }

  const subtotalProduct = Number(checkoutData.subtotal_product);
  const serviceCost = 1000;
  const totalPayment = subtotalProduct + shippingCost + serviceCost;

  return (
    <div className="bg-[#D9D9D9] min-h-screen">
      <Navbar
        brand="KARYA ADI GRAFIKA"
        navItems={[
          { label: "Home", to: "/" },
          { label: "Produk", to: "/customer/produk" },
          { label: "Pesanan Saya", to: "/customer/pesanan" },
          { label: "Keranjang", to: "/customer/keranjang" },
        ]}
      />

      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-green-700 mt-12 sm:mt-16">
          CHECKOUT
        </h2>
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8">
          {/* Delivery Method Section */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
              Pilih Metode Pengiriman
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                      method.id as "Ambil di Toko" | "Dikirim"
                    )
                  }
                />
              ))}
            </div>
          </div>

          {/* Product Section */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
              Produk yang Dipesan
            </h3>
            <div className="hidden sm:grid grid-cols-[3fr_1fr_1fr_1fr] items-center text-xs sm:text-sm font-medium text-gray-500 mb-3 sm:mb-4 gap-2 sm:gap-4">
              <div>Produk</div>
              <div className="text-center">Harga Satuan</div>
              <div className="text-center">Jumlah</div>
              <div className="text-center">Subtotal</div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {checkoutData.products.map((product) => (
                <CheckoutProductItem
                  key={product.cart_id}
                  name={product.name}
                  price={Number(product.price)}
                  quantity={product.quantity}
                  image={`${getBaseUrl()}/${product.image}`}
                />
              ))}
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
              Pilih Metode Pembayaran
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {paymentMethods.map((method) => (
                <DeliveryMethodCard
                  key={method.id}
                  icon={method.icon}
                  title={method.title}
                  description={method.description}
                  additionalInfo={method.additionalInfo}
                  isSelected={selectedPaymentMethod === method.id}
                  onSelect={() =>
                    setSelectedPaymentMethod(method.id as "Tunai" | "Midtrans")
                  }
                />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex justify-between mb-2 text-sm sm:text-base text-gray-600">
              <span className="font-medium">Subtotal Produk</span>
              <span>Rp. {subtotalProduct.toLocaleString()}</span>
            </div>
            {selectedDeliveryMethod === "Dikirim" && (
              <div className="flex justify-between mb-2 text-sm sm:text-base text-gray-600">
                <span className="font-medium">Biaya Pengiriman</span>
                <span>{shippingCost === 0 ? "Gratis" : `Rp. ${shippingCost.toLocaleString()}`}</span>
              </div>
            )}
            <div className="flex justify-between mb-2 text-sm sm:text-base text-gray-600">
              <span className="font-medium">Biaya Layanan</span>
              <span>Rp. {serviceCost.toLocaleString()}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 sm:pt-4 flex justify-between font-semibold text-base sm:text-lg text-gray-800">
              <span>Total Pembayaran</span>
              <span className="text-green-700">
                Rp. {totalPayment.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Terms and Order Button */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="mr-2 h-4 sm:h-5 w-4 sm:w-5 accent-green-700 cursor-pointer"
                onChange={() => setTermsAccepted(!termsAccepted)}
                aria-checked={termsAccepted}
              />
              <label htmlFor="terms" className="text-xs sm:text-base text-gray-700">
                Dengan melanjutkan, Saya setuju dengan{" "}
                <span className="text-green-700 font-medium">
                  Syarat & Ketentuan
                </span>{" "}
                yang berlaku.
              </label>
            </div>
            <button
              className="w-full bg-yellow-500 text-white py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg hover:bg-yellow-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={!termsAccepted}
              onClick={handleCheckout}
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