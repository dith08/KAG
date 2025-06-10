/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import Navbar from "../../components/customer/Navbar";
import CartItem, {
  Product,
} from "../../components/customer/keranjang_page/CartItem";
import CartSummary from "../../components/customer/keranjang_page/CartSummary";
import api from "../../services/api";
import { Icon } from "@iconify/react";
import { getBaseUrl } from "../../utils/getBaseUrl";
import { useNavigate } from "react-router-dom";

// Interface for cart item from backend
interface CartItemResponse {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  product: {
    id: number;
    nama: string;
    harga: number;
    gambar?: string;
    slug?: string;
  };
}

const KeranjangPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const [changedItems, setChangedItems] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  // Fetch cart data from backend
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Anda harus login terlebih dahulu!");
          return;
        }

        const response = await api.get("/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const transformedProducts: Product[] = response.data.map(
          (item: CartItemResponse) => ({
            id: item.id,
            name: item.product.nama,
            price: item.product.harga,
            image: item.product.gambar
              ? `${getBaseUrl()}/${item.product.gambar}`
              : "/images/default-product.png",
            quantity: Math.max(100, item.quantity),
            product_id: item.product.id,
          })
        );

        setProducts(transformedProducts);
        setOriginalProducts([...transformedProducts]);
        setChangedItems(new Set());
        setError(null);
      } catch (err: any) {
        console.error("Error fetching cart data:", err);
        if (err.response?.status === 401) {
          setError("Sesi Anda telah berakhir. Silakan login kembali!");
        } else {
          setError("Gagal memuat data keranjang. Silakan coba lagi.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  // Update isAllChecked
  useEffect(() => {
    if (products.length > 0 && checkedItems.length === products.length) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }, [checkedItems, products]);

  // Update footer height
  useEffect(() => {
    const updateFooterHeight = () => {
      if (footerRef.current) {
        const height = footerRef.current.getBoundingClientRect().height;
        console.log("Footer height detected:", height); // Debugging
        setFooterHeight(height);
      } else {
        console.log("Footer ref not found"); // Debugging
      }
    };

    updateFooterHeight();
    const observer = new ResizeObserver(updateFooterHeight);
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleQuantityChange = (id: number, quantity: number) => {
    const newQuantity = Math.max(100, quantity);
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, quantity: newQuantity } : product
      )
    );
    setChangedItems((prev) => new Set(prev).add(id));
  };

  const handleRemove = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Anda harus login terlebih dahulu!");
        return;
      }

      await api.delete(`/api/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(products.filter((product) => product.id !== id));
      setOriginalProducts(
        originalProducts.filter((product) => product.id !== id)
      );
      setChangedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    } catch (err: any) {
      console.error("Error removing item:", err);
      if (err.response?.status === 401) {
        alert("Sesi Anda telah berakhir. Silakan login kembali!");
      } else {
        alert("Gagal menghapus item. Silakan coba lagi.");
      }
    }
  };

  const updateCartQuantities = async () => {
    if (changedItems.size === 0) return true;

    setIsUpdating(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan");
      }

      const updatePromises = Array.from(changedItems).map(async (itemId) => {
        const product = products.find((p) => p.id === itemId);
        if (product) {
          return api.put(
            `/api/cart/${itemId}`,
            { quantity: product.quantity },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
      });

      await Promise.all(updatePromises);
      setOriginalProducts([...products]);
      setChangedItems(new Set());
      return true;
    } catch (err: any) {
      console.error("Error updating cart quantities:", err);
      if (err.response?.status === 401) {
        alert("Sesi Anda telah berakhir. Silakan login kembali!");
      } else {
        alert("Gagal mengupdate keranjang. Silakan coba lagi.");
      }
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCheckChange = (id: number, isChecked: boolean) => {
    setCheckedItems((prev) => {
      if (isChecked) {
        return [...prev, id];
      } else {
        return prev.filter((itemId) => itemId !== id);
      }
    });
  };

  const handleSelectAll = (isChecked: boolean) => {
    setIsAllChecked(isChecked);
    if (isChecked) {
      setCheckedItems(products.map((product) => product.id));
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckout = async () => {
    if (products.length === 0) {
      alert("Keranjang Anda kosong!");
      return;
    }

    if (checkedItems.length === 0) {
      alert("Pilih minimal satu produk untuk checkout!");
      return;
    }

    const invalidItems = products.filter(
      (p) => checkedItems.includes(p.id) && p.quantity < 100
    );

    if (invalidItems.length > 0) {
      alert(
        "Beberapa item yang dipilih memiliki jumlah kurang dari minimum (100). Silakan sesuaikan terlebih dahulu."
      );
      return;
    }

    try {
      // Update cart quantities first
      const updateSuccess = await updateCartQuantities();
      if (!updateSuccess) return;

      // Get checkout data for selected items
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/api/cart/checkout-data",
        {
          cart_ids: checkedItems,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        // Store checkout data in sessionStorage untuk diakses di checkout page
        sessionStorage.setItem(
          "checkoutData",
          JSON.stringify(response.data.data)
        );

        console.log("Proceeding to checkout with data:", response.data.data);
        navigate("/customer/checkout");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      if (error.response?.status === 401) {
        alert("Sesi Anda telah berakhir. Silakan login kembali!");
      } else {
        alert("Terjadi kesalahan saat checkout. Silakan coba lagi.");
      }
    }
  };

  const hasUnsavedChanges = changedItems.size > 0;

  if (loading) {
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
        <div className="flex justify-center items-center min-h-screen pt-24">
          <div className="flex items-center space-x-2">
            <Icon
              icon="eos-icons:loading"
              className="text-4xl text-green-700"
            />
            <span className="text-lg text-gray-600">Memuat keranjang...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
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
        <div className="flex justify-center items-center min-h-screen pt-24">
          <div className="text-center">
            <Icon
              icon="mdi:cart-remove"
              className="text-6xl text-gray-400 mx-auto mb-4"
            />
            <p className="text-lg text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#D9D9D9] min-h-screen relative">
      <Navbar
        brand="KARYA ADI GRAFIKA"
        navItems={[
          { label: "Home", to: "/" },
          { label: "Produk", to: "/customer/produk" },
          { label: "Pesanan Saya", to: "/customer/pesanan" },
          { label: "Keranjang", to: "/customer/keranjang" },
        ]}
      />

      <div className="container mx-auto px-4 md:px-10 py-4 pt-24 pb-[180px] md:pb-[200px]">
        {/* Header tabel - hanya tampil jika ada produk */}
        {products.length > 0 && (
          <div className="hidden md:flex items-center p-4 bg-white rounded-lg shadow-md mb-6 w-full border border-gray-200">
            <div className="flex-1 text-black/50 font-medium">Produk</div>
            <div className="w-32 text-center text-black/50 font-medium">
              Harga Satuan
            </div>
            <div className="w-32 text-center text-black/50 font-medium">
              Jumlah
            </div>
            <div className="w-32 text-center text-black/50 font-medium">
              Total Harga
            </div>
            <div className="w-32 text-center text-black/50 font-medium">
              Aksi
            </div>
          </div>
        )}

        <div>
          {products.length > 0 ? (
            products.map((product) => (
              <CartItem
                key={product.id}
                product={product}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
                onCheckChange={handleCheckChange}
                isChecked={checkedItems.includes(product.id)}
              />
            ))
          ) : (
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <Icon
                  icon="mdi:cart-off"
                  className="text-6xl text-gray-400 mx-auto mb-4"
                />
                <p className="text-lg text-gray-600 mb-4">
                  Keranjang Anda kosong
                </p>
                <a
                  href="/customer/produk"
                  className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 inline-block"
                >
                  Mulai Belanja
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Cart Summary */}
        <div className="mt-20 md:mt-0">
          {products.length > 0 && (
            <CartSummary
              products={products}
              onCheckout={handleCheckout}
              isLoading={isUpdating}
              hasUnsavedChanges={hasUnsavedChanges}
              checkedItems={checkedItems}
              onSelectAll={handleSelectAll}
              isAllChecked={isAllChecked}
              footerHeight={footerHeight}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default KeranjangPage;
