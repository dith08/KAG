import React, { useRef, useState, useEffect, useCallback } from "react";
import Navbar from "../../components/customer/Navbar";
import InputField from "../../components/InputField";
import { Icon } from "@iconify/react";
import Footer from "../../components/customer/Footer";
import MapPicker from "../../components/customer/profile_page/MapPicker";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useToast } from "../../components/toast/useToast";

const ProfilePage = () => {
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchTrigger, setSearchTrigger] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string>();

  const { logout } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Using useCallback to memoize the fetchUserProfile function
  const fetchUserProfile = useCallback(() => {
    api
      .get("/api/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const data = res.data;
        setUsername(data.name);
        setAddress(data.alamat || "");
        setPhone(data.phone);
        setEmail(data.email);
        setPassword("");

        // Only update preview image from server if no local file is selected
        if (!selectedFile) {
          setPreviewImage(data.avatar || "/images/user.png");
        }
      })
      .catch((err) => {
        console.error("Gagal ambil data profil:", err);
        showToast("Gagal mengambil data profil", "error");
      });
  }, [selectedFile, showToast]);

  // Load user profile on mount and when profile is updated
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  useEffect(() => {
    if (isProfileUpdated) {
      fetchUserProfile();
      setIsProfileUpdated(false);
    }
  }, [isProfileUpdated, fetchUserProfile]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSearch = () => {
    setSearchTrigger(searchLocation);
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", username);
      formData.append("alamat", address);
      formData.append("phone", phone);
      formData.append("email", email);

      if (password?.length > 0) {
        formData.append("password", password);
      }

      // Cek apakah ada file yang dipilih
      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }

      const response = await api.post("/api/profile?_method=PUT", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Profile berhasil diperbarui:", response.data);
      showToast("Profil berhasil diperbarui", "success");

      // Clear the selected file after successful upload
      setSelectedFile(null);

      // Set flag to trigger profile refresh
      setIsProfileUpdated(true);
    } catch (error) {
      console.error("Gagal memperbarui profil:", error);
      showToast("Gagal memperbarui profil", "error");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validasi ekstensi
      if (!file.type.startsWith("image/")) {
        showToast("Hanya file gambar yang diperbolehkan", "error");
        return;
      }

      // Validasi ukuran maksimal 2MB
      if (file.size > 2 * 1024 * 1024) {
        showToast("Ukuran gambar maksimal 2MB", "error");
        return;
      }

      // Simpan file yang dipilih
      setSelectedFile(file);

      // Tampilkan preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
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

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 pt-24 pb-18">
        <h1 className="text-3xl font-bold text-green-700 mb-6">PROFIL SAYA</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-md w-full">
          <form onSubmit={handleSaveChanges} className="space-y-6 w-full">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative">
                {/* Foto Profil */}
                <img
                  src={previewImage}
                  alt="Profile"
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shadow-md"
                />

                {/* Tombol Edit */}
                <button
                  type="button"
                  onClick={handleClickUpload}
                  className="absolute bottom-0 right-0 bg-white p-2 rounded-full border border-gray-300 shadow cursor-pointer"
                >
                  <Icon icon="mdi:pencil" className="text-lg text-gray-500" />
                </button>

                {/* Input File Disembunyikan */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                />
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
            <button
              type="button"
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition font-medium cursor-pointer"
            >
              Logout
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
                <button
                  type="button"
                  className="bg-yellow-500 p-3 flex items-center justify-center cursor-pointer"
                  onClick={handleSearch}
                >
                  <Icon
                    icon="cuida:search-outline"
                    className="text-white text-xl"
                  />
                </button>
              </div>

              <div className="h-64 lg:h-96 w-full bg-gray-200 rounded-lg overflow-hidden mt-4">
                <MapPicker
                  setAddress={setAddress}
                  searchLocation={searchTrigger}
                  setCoordinates={(lat, lng) => {
                    console.log("Latitude:", lat, "Longitude:", lng);
                  }}
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
