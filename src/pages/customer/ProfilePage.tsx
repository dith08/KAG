import React, { useRef, useState, useEffect, useCallback } from "react";
import Navbar from "../../components/customer/Navbar";
import InputField from "../../components/InputField";
import { Icon } from "@iconify/react";
import Footer from "../../components/customer/Footer";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useToast } from "../../components/toast/useToast";
import Button from "../../components/Button";
import ConfirmPopup from "../../components/ConfirmPopup";
import MapPicker from "../../components/MapPicker";

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
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false); // State untuk loading upload foto

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string>();

  const { logout } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const fetchUserProfile = useCallback(() => {
    api
      .get("/api/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        console.log("Data profil:", res.data);
        const data = res.data;
        setUsername(data.name);
        setAddress(data.alamat || "");
        setPhone(data.phone);
        setEmail(data.email);
        setPassword("");
        setLatitude(data.lat || "");
        setLongitude(data.lng || "");
        if (!selectedFile) {
          setPreviewImage(
            data.avatar && data.avatar !== "" ? data.avatar : "/images/user.png"
          );
        }
      })
      .catch((err) => {
        console.error("Gagal ambil data profil:", err);
        showToast("Gagal mengambil data profil", "error");
      });
  }, [selectedFile, showToast]);

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
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", username);
      formData.append("alamat", address);
      formData.append("phone", phone);
      formData.append("email", email);
      if (latitude) formData.append("lat", latitude);
      if (longitude) formData.append("lng", longitude);
      if (password.trim() !== "") {
        formData.append("password", password);
        formData.append("password_confirmation", password);
      }
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
      setSelectedFile(null);
      setIsProfileUpdated(true);
    } catch (error) {
      console.error("Gagal memperbarui profil:", error);
      showToast("Gagal memperbarui profil", "error");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        showToast("Hanya file gambar yang diperbolehkan", "error");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        showToast("Ukuran gambar maksimal 2MB", "error");
        return;
      }

      setIsUploading(true); // Aktifkan loading
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setTimeout(() => setIsUploading(false), 1000); // Simulasi loading selesai
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickUpload = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleConfirm = () => {
    setIsPopupOpen(false);
    logout();
    navigate("/login");
  };

  const handleCancel = () => {
    console.log("Cancelled!");
    setIsPopupOpen(false);
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  return (
    <div className="bg-[#D9D9D9] min-h-screen transition-all duration-300">
      <ConfirmPopup
        isOpen={isPopupOpen}
        message="Apakah Anda yakin ingin keluar dari akun ini?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onClose={() => setIsPopupOpen(false)}
        title="Logout?"
      />
      <Navbar
        brand="KARYA ADI GRAFIKA"
        navItems={[
          { label: "Home", to: "/" },
          { label: "Produk", to: "/customer/produk" },
          { label: "Pesanan Saya", to: "/customer/pesanan" },
          { label: "Keranjang", to: "/customer/keranjang" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 pt-24 pb-18">
        <h1 className="text-3xl font-bold text-green-700 mb-6">PROFIL SAYA</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-md w-full transform transition-all duration-300 hover:shadow-lg">
          <form onSubmit={handleSaveChanges} className="space-y-6 w-full">
            {/* Foto Profil & Username */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative group">
                <img
                  src={previewImage}
                  alt="Profile"
                  className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shadow-md transition-opacity duration-300 ${
                    isUploading ? "opacity-50" : "opacity-100"
                  }`}
                />
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon
                      icon="mdi:loading"
                      className="text-3xl text-green-700 animate-spin"
                    />
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleClickUpload}
                  disabled={isUploading}
                  className={`absolute bottom-0 right-0 bg-white p-2 rounded-full border border-gray-300 shadow cursor-pointer transition-transform duration-200 transform hover:scale-110 ${
                    isUploading ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  <Icon
                    icon="mdi:image-edit"
                    className="text-lg text-gray-500"
                  />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={isUploading}
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
                  disabled={isUploading || isLoading}
                />
              </div>
            </div>

            {/* Form Fields */}
            <div className="relative">
              <label className="block text-base font-medium pb-2">
                Alamat (berdasarkan pinpoint)
              </label>
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-2xl">
                <Icon icon="mdi:map-marker" />
              </span>
              <textarea
                readOnly
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pl-12 p-3 border border-black/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-700 transition-all duration-200"
                rows={2}
                disabled={isUploading || isLoading}
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
                disabled={isUploading || isLoading}
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
                disabled={isUploading || isLoading}
              />
            </div>

            <div>
              <label className="block text-base font-medium pb-2">
                Password Baru (Opsional Diisi)
              </label>
              <InputField
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                icon="mdi:lock"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
                disabled={isUploading || isLoading}
              />
            </div>

            {/* Save Button */}
            <Button
              type="submit"
              text="Save Changes"
              className="bg-yellow-500 text-white hover:bg-yellow-600"
              loading={isLoading}
              disabled={isUploading}
            />

            {/* Logout button khusus tampil di desktop */}
            <div className="hidden md:block">
              <Button
                type="button"
                text="Logout"
                className="bg-red-500 text-white hover:bg-red-600"
                onClick={handleOpenPopup}
                disabled={isUploading || isLoading}
              />
            </div>
          </form>

          {/* Map Picker Section */}
          <div className="w-full">
            <div className="bg-white p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden w-full focus-within:ring-1 focus-within:ring-green-700 focus-within:outline-none transition-all duration-200">
                <input
                  type="text"
                  placeholder="Cari alamat atau nama tempat"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full p-2 focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  disabled={isUploading || isLoading}
                />
                <button
                  type="button"
                  className="bg-yellow-500 p-3 flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110"
                  onClick={handleSearch}
                  disabled={isUploading || isLoading}
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
                  setCoordinates={(lat, lng) => {
                    setLatitude(lat.toString());
                    setLongitude(lng.toString());
                  }}
                  searchLocation={searchTrigger}
                  latitude={latitude}
                  longitude={longitude}
                  initialAddress={address}
                />
              </div>
            </div>
          </div>
          {/* Logout button khusus tampil di mobile */}
          <div className="block md:hidden">
            <Button
              type="button"
              text="Logout"
              className="bg-red-500 text-white hover:bg-red-600 w-full"
              onClick={handleOpenPopup}
              disabled={isUploading || isLoading}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
