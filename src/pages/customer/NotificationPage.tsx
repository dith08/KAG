import Navbar from "../../components/customer/Navbar";
import NotificationList from "../../components/NotificationList";

const NotificationPage = () => {
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
        isLoggedIn={true} // Ganti ke true kalau user sudah login
      />
      <div className="pt-24 px-10 md:px-18">
        <NotificationList userId={5} role="customer" apiUrl="" />
      </div>
    </div>
  );
};

export default NotificationPage;
