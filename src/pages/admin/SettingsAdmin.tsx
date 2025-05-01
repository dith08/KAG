import React, { useState } from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import { Pencil, X } from "lucide-react";

const AdminSettings: React.FC = () => {
  const [namaToko, setNamaToko] = useState("KARYA ADI GRAFIKA");
  const [alamat, setAlamat] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showShippingNotification, setShowShippingNotification] = useState(false);
  const [showBiayaPopup, setShowBiayaPopup] = useState(false);

  const [newKecamatan, setNewKecamatan] = useState("");
  const [newBiaya, setNewBiaya] = useState("");

  const [biayaPengiriman, setBiayaPengiriman] = useState([
    { kecamatan: "Bae", biaya: "15.000" },
    { kecamatan: "Gebog", biaya: "20.000" },
  ]);

  const [profilePicture, setProfilePicture] = useState<any>(null);

  const handleSaveChanges = () => {
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 3000);
  };

  const handleTambahLokasi = () => {
    setShowBiayaPopup(true);
  };

  const handleSubmitBiaya = () => {
    if (newKecamatan && newBiaya) {
      setBiayaPengiriman([...biayaPengiriman, { kecamatan: newKecamatan, biaya: newBiaya }]);
      setNewKecamatan("");
      setNewBiaya("");
      setShowBiayaPopup(false);
      setShowShippingNotification(true);
      setTimeout(() => setShowShippingNotification(false), 3000);
    }
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <SidebarAdmin />
      <div className="flex-1 w-full lg:ml-64">
        <NavbarAdmin />

        <div className="p-4 space-y-10 mt-20">
          <h1 className="text-2xl font-bold text-center lg:text-left">Pengaturan Toko</h1>

          {/* Profile Toko */}
          <section className="bg-white rounded-xl shadow p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <h2 className="text-green-700 font-bold text-xl mb-4">PROFILE TOKO</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <img
                      src={profilePicture || "/default-profile.jpg"}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <label className="absolute bottom-0 right-0 p-2 bg-white rounded-full cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        className="hidden"
                      />
                      <Pencil size={16} className="text-gray-600" />
                    </label>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{namaToko}</h3>
                    <span className="text-sm text-gray-500">Toko Anda</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold block mb-1">NAMA TOKO</label>
                  <input
                    type="text"
                    value={namaToko}
                    onChange={(e) => setNamaToko(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1">ALAMAT</label>
                  <input
                    type="text"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1">EMAIL</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1">NO HP</label>
                  <input
                    type="text"
                    value={noHp}
                    onChange={(e) => setNoHp(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <button
                  onClick={handleSaveChanges}
                  className="bg-yellow-400 text-white font-semibold px-4 py-2 rounded mt-4"
                >
                  Save Changes
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#FFA000] rounded-xl p-4 text-white font-semibold">Biaya Pengiriman</div>
              <div className="bg-[#FFE082] rounded-xl p-4 space-y-3">
                {biayaPengiriman.map((item, index) => (
                  <div key={index} className="bg-gray-200 p-2 flex justify-between rounded items-center">
                    <span>{item.kecamatan}</span>
                    <span>{item.biaya}</span>
                    <Pencil size={16} />
                  </div>
                ))}
                <button
                  onClick={handleTambahLokasi}
                  className="w-full bg-orange-400 text-white mt-4 py-2 rounded"
                >
                  TAMBAH LOKASI PENGIRIMAN
                </button>
              </div>
            </div>
          </section>

          {/* Notifikasi */}
          {showSuccessPopup && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow z-50">
              Perubahan berhasil disimpan!
            </div>
          )}

          {showShippingNotification && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded shadow z-50">
              Lokasi pengiriman berhasil ditambahkan!
            </div>
          )}

          {/* Popup Tambah Biaya */}
          {showBiayaPopup && (
            <div className="absolute inset-0 bg-black/50 z-40">
              <div className="absolute inset-0 bg-white p-6 overflow-auto">
                <button
                  onClick={() => setShowBiayaPopup(false)}
                  className="absolute top-4 right-4 text-gray-500"
                >
                  <X />
                </button>
                <div className="max-w-md mx-auto mt-20">
                  <h2 className="text-2xl font-bold mb-6">Tambah Biaya Pengiriman</h2>
                  <input
                    type="text"
                    placeholder="Nama Kecamatan"
                    value={newKecamatan}
                    onChange={(e) => setNewKecamatan(e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-4"
                  />
                  <input
                    type="text"
                    placeholder="Biaya Pengiriman"
                    value={newBiaya}
                    onChange={(e) => setNewBiaya(e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-6"
                  />
                  <button
                    onClick={handleSubmitBiaya}
                    className="w-full bg-green-600 text-white py-2 rounded font-semibold"
                  >
                    Tambah
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
