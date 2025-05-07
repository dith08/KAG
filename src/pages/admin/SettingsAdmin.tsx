import React, { useCallback, useEffect, useState } from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import { Icon } from "@iconify/react";
import "leaflet/dist/leaflet.css";
import MapPicker from "../../components/MapPicker";
import api from "../../services/api";
import { useToast } from "../../components/toast/useToast";

const SettingsAdminPage: React.FC = () => {
  const [namaToko, setNamaToko] = useState("Karya Adi Grafika");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [storeLocation, setStoreLocation] = useState<[number, number]>([
    -6.2, 106.816666,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const [shippingRules, setShippingRules] = useState<
    { maxDistance: number; cost: number }[]
  >([{ maxDistance: 10, cost: 15000 }]);

  const fetchAdminProfile = useCallback(() => {
    api
      .get("/api/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const data = res.data;
        console.log("Data profil admin:", data);

        const alamatOnly = data.alamat?.split("| lat:")[0].trim() || "";
        const latMatch = data.alamat?.match(/lat:\s*(-?\d+\.?\d*)/);
        const lngMatch = data.alamat?.match(/lng:\s*(-?\d+\.?\d*)/);

        setUsername(data.name);
        setAddress(alamatOnly);
        setPhone(data.phone);
        setEmail(data.email);
        setStoreLocation([
          latMatch ? parseFloat(latMatch[1]) : -6.2,
          lngMatch ? parseFloat(lngMatch[1]) : 106.816666,
        ]);

        if (!selectedFile) {
          setProfilePicture(
            data.avatar && data.avatar !== "" ? data.avatar : "/images/user.png"
          );
        }
      })
      .catch((err) => {
        console.error("Gagal ambil data profil admin:", err);
        showToast("Gagal mengambil data profil admin", "error");
      });
  }, [selectedFile, showToast]);

  useEffect(() => {
    fetchAdminProfile();
  }, [fetchAdminProfile]);

  // === HANDLE SAVE ===
  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", username);
      formData.append(
        "alamat",
        `${address} | lat: ${storeLocation[0]}, lng: ${storeLocation[1]}`
      );
      formData.append("phone", phone);
      formData.append("email", email);

      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }

      const response = await api.post("/api/profile?_method=PUT", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Profil admin berhasil diperbarui:", response.data);
      showToast("Profil admin berhasil diperbarui", "success");
      setSelectedFile(null);
      fetchAdminProfile(); // refresh data setelah update
    } catch (error) {
      console.error("Gagal update profil admin:", error);
      showToast("Gagal memperbarui profil admin", "error");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  // === HANDLE SELECT FILE ===
  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
      setSelectedFile(file);
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleAddRule = () => {
    setShippingRules([...shippingRules, { maxDistance: 0, cost: 0 }]);
  };

  const handleRuleChange = (index: number, field: string, value: number) => {
    const newRules = [...shippingRules];
    newRules[index] = { ...newRules[index], [field]: value };
    setShippingRules(newRules);
  };

  const handleDeleteRule = (index: number) => {
    const newRules = [...shippingRules];
    newRules.splice(index, 1);
    setShippingRules(newRules);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 w-full lg:ml-64">
        <NavbarAdmin />

        <div className="p-4 lg:p-6 space-y-8 mt-18 lg:mt-24">
          <h1 className="text-xl md:text-2xl font-bold text-center lg:text-left text-green-700 flex items-center gap-2 mb-6">
            <Icon icon="mdi:cog" className="text-green-700 w-8 h-8" />{" "}
            PENGATURAN TOKO
          </h1>

          <section className="bg-white rounded-2xl shadow-xl p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Profile Toko */}
            <div className="lg:col-span-1 space-y-4 lg:space-y-6">
              <h2 className="text-green-700 font-semibold text-xl flex items-center gap-2">
                <Icon icon="mdi:storefront" className="w-6 h-6" />
                PROFILE TOKO
              </h2>
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <img
                    src={profilePicture || "/images/user.png"}
                    alt="Profile"
                    className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border-4 border-green-700"
                  />
                  <label className="absolute bottom-0 right-0 p-2 bg-white rounded-full cursor-pointer shadow">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      className="hidden"
                    />
                    <Icon
                      icon="mdi:image-edit"
                      className="text-lg text-gray-500"
                    />
                  </label>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-semibold block mb-1 text-green-700">
                    USERNAME PEMILIK
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-green-700"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-semibold block mb-1 text-green-700">
                    NAMA TOKO
                  </label>
                  <input
                    type="text"
                    value={namaToko}
                    readOnly
                    onChange={(e) => setNamaToko(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-green-700"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1 text-green-700">
                    ALAMAT (berdasarkan pinpoint)
                  </label>
                  <textarea
                    value={address}
                    readOnly
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1 text-green-700">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    value={email}
                    readOnly
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-green-700"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1 text-green-700">
                    NO HP
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-green-700"
                  />
                </div>
                <button
                  onClick={handleSaveChanges}
                  disabled={isLoading}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg w-full flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  {isLoading ? (
                    <>
                      <Icon icon="mdi:loading" className="animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:content-save" />
                      Simpan Perubahan
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Map Picker & Biaya Kirim */}
            <div className="lg:col-span-2 space-y-4 lg:space-y-6">
              <h2 className="text-green-700 font-semibold text-xl flex items-center gap-2">
                <Icon icon="mdi:map-marker-radius" className="w-6 h-6" />
                PILIH LOKASI TOKO DI PETA
              </h2>
              <MapPicker
                setAddress={setAddress}
                setCoordinates={(lat, lng) => setStoreLocation([lat, lng])}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold block mb-1 text-green-700">
                    KOORDINAT TOKO
                  </label>
                  <input
                    type="text"
                    value={`${storeLocation[0].toFixed(
                      6
                    )}, ${storeLocation[1].toFixed(6)}`}
                    readOnly
                    className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-600"
                  />
                </div>
              </div>
              {/* Aturan biaya kirim */}
              <h2 className="text-green-700 font-semibold text-xl flex items-center gap-2 mt-6">
                <Icon
                  icon="mdi:truck-delivery-outline"
                  className="w-6 h-6"
                />
                ATURAN BIAYA PENGIRIMAN
              </h2>
              <div className="space-y-3">
                {shippingRules.map((rule, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-3 items-center bg-gray-50 p-3 lg:p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex-1 w-full">
                      <label className="text-sm font-semibold block mb-1 text-green-700">
                        Maks. Jarak (km)
                      </label>
                      <input
                        type="number"
                        value={rule.maxDistance}
                        onChange={(e) =>
                          handleRuleChange(
                            index,
                            "maxDistance",
                            parseFloat(e.target.value)
                          )
                        }
                        className="w-full border rounded-lg px-3 py-2 focus:outline-green-700"
                      />
                    </div>
                    <div className="flex-1 w-full">
                      <label className="text-sm font-semibold block mb-1 text-green-700">
                        Biaya Pengiriman (Rp)
                      </label>
                      <input
                        type="number"
                        value={rule.cost}
                        onChange={(e) =>
                          handleRuleChange(
                            index,
                            "cost",
                            parseFloat(e.target.value)
                          )
                        }
                        className="w-full border rounded-lg px-3 py-2 focus:outline-green-700"
                      />
                    </div>
                    <div className="flex items-center mt-4 md:mt-6">
                      <button
                        onClick={() => handleDeleteRule(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Icon icon="mdi:delete" width={24} />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleAddRule}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer mt-4"
                >
                  <Icon icon="mdi:plus" />
                  Tambah Aturan
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsAdminPage;
