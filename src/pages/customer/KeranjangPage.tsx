import { useState, useRef, useEffect } from "react";
import Navbar from "../../components/customer/Navbar";
import CartItem, {
  Product,
} from "../../components/customer/keranjang_page/CartItem";
import CartSummary from "../../components/customer/keranjang_page/CartSummary";
import Footer from "../../components/customer/Footer";

const KeranjangPage = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Paperbag",
      price: 30000,
      image: "/images/paperbag3.png",
      quantity: 1,
    },
    {
      id: 2,
      name: "Paperbag",
      price: 30000,
      image: "/images/paperbag3.png",
      quantity: 1,
    },
    {
      id: 3,
      name: "Paperbag",
      price: 30000,
      image: "/images/paperbag3.png",
      quantity: 1,
    },
    {
      id: 4,
      name: "Paperbag",
      price: 30000,
      image: "/images/paperbag3.png",
      quantity: 1,
    },
    {
      id: 5,
      name: "Paperbag",
      price: 30000,
      image: "/images/paperbag3.png",
      quantity: 1,
    },
    {
      id: 6,
      name: "Paperbag",
      price: 30000,
      image: "/images/paperbag3.png",
      quantity: 1,
    },
  ]);

  const footerRef = useRef<HTMLDivElement>(null);
  const [bottomOffset, setBottomOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const newOffset = Math.max(0, windowHeight - footerRect.top);
        setBottomOffset(newOffset);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Panggil sekali saat pertama kali render

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleQuantityChange = (id: number, quantity: number) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, quantity } : product
      )
    );
  };

  const handleRemove = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout with products:", products);
  };

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

      <div className="container mx-auto px-4 md:px-10 py-4 pt-24 pb-32 md:pb-4">
        <div className="hidden md:flex items-center p-4 bg-white rounded-lg shadow-md mb-6 w-full border border-gray-200">
          <div className="w-5 mr-5 flex justify-center">
            <input
              type="checkbox"
              className="h-5 w-5 accent-green-700 cursor-pointer"
            />
          </div>
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
          <div className="w-32 text-center text-black/50 font-medium">Aksi</div>
        </div>

        <div className="md:pb-24 pb-10">
          {products.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          ))}
        </div>

        {/* Cart Summary dengan Dynamic Position */}
        <div
          className="fixed bottom-0 left-0 right-0 w-full transition-all duration-300"
          style={{
            transform: `translateY(-${bottomOffset}px)`,
          }}
        >
          <CartSummary products={products} onCheckout={handleCheckout} />
        </div>
      </div>

      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default KeranjangPage;
