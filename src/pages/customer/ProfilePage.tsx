import React from "react";
import Navbar from "../../components/customer/Navbar";

const ProfilePage = () => {
  return (
    <div>
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
    </div>
  );
};

export default ProfilePage;
