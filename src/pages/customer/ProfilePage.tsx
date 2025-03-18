import React, { useState } from "react";
import Navbar from "../../components/customer/Navbar";
import InputField from "../../components/InputField";
import { Icon } from "@iconify/react";
import Footer from "../../components/customer/Footer";

const ProfilePage = () => {
  const [username, setUsername] = useState("John Doe");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("08123456789");
  const [email, setEmail] = useState("johndoe@gmail.com");
  const [password, setPassword] = useState("johndoe123");
  const [showPassword, setShowPassword] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSaveChanges = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Profile updated");
  };

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

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 pt-24 pb-18">
        <h1 className="text-3xl font-bold text-green-700 mb-6">PROFILE SAYA</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-md w-full">
          <form onSubmit={handleSaveChanges} className="space-y-6 w-full">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative">
                <img
                  src="/images/man.png"
                  alt="Profile"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border border-gray-300"
                />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 bg-white p-2 rounded-full border border-gray-300 shadow"
                >
                  <Icon icon="mdi:pencil" className="text-lg text-gray-700" />
                </button>
              </div>
              <div className="flex-1 w-full">
                <label className="block text-base font-medium pb-2">
                  Username
                </label>
                <InputField
                  type="text"
                  placeholder="Username"
                  icon="mdi:account"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-medium pb-2">
                Alamat (berdasarkan pinpoint)
              </label>
              <textarea
                disabled
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 border border-black/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-700"
                rows={2}
              />
            </div>

            <div>
              <label className="block text-base font-medium pb-2">No HP</label>
              <InputField
                type="text"
                placeholder="Nomor Handphone"
                icon="mdi:phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-base font-medium pb-2">Email</label>
              <InputField
                type="email"
                placeholder="Email"
                icon="mdi:email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-base font-medium pb-2">
                Password
              </label>
              <InputField
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                icon="mdi:lock"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition font-medium cursor-pointer"
            >
              Save Changes
            </button>
          </form>

          <div className="w-full">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden w-full">
                <input
                  type="text"
                  placeholder="Cari alamat atau nama tempat"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full p-2 focus:outline-none"
                />
                <button className="bg-yellow-500 p-3 flex items-center justify-center cursor-pointer">
                  <Icon
                    icon="cuida:search-outline"
                    className="text-white text-xl"
                  />
                </button>
              </div>

              <div className="h-64 lg:h-96 w-full bg-gray-200 rounded-lg overflow-hidden mt-4">
                <img
                  src="/images/map.png"
                  alt="Location Map"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
