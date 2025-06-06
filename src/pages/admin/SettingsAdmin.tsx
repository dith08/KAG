import React, { useCallback, useEffect, useState } from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import { Icon } from "@iconify/react";
import "leaflet/dist/leaflet.css";
import MapPicker from "../../components/MapPicker";
import api from "../../services/api";
import { useToast } from "../../components/toast/useToast";
import { ModernTable } from "../../components/admin/ModernTable";

interface ShippingRule {
  id: number;
  maxDistance: number;
  cost: number;
  isEditing?: boolean;
  isAdding?: boolean;
}

const SettingsAdminPage: React.FC = () => {
  const [namaToko, setNamaToko] = useState("");
  const [alamat, setAlamat] = useState("");
  const [kontak, setKontak] = useState("");
  const [jamOperasional, setJamOperasional] = useState("");
  const [storeLocation, setStoreLocation] = useState<[number, number]>([
    -6.2, 106.816666,
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const [shippingRules, setShippingRules] = useState<ShippingRule[]>([
    { id: 1, maxDistance: 10, cost: 15000 },
    { id: 2, maxDistance: 20, cost: 25000 },
    { id: 3, maxDistance: 30, cost: 35000 },
  ]);
  const [editData, setEditData] = useState<ShippingRule | null>(null);
  const [newRule, setNewRule] = useState<ShippingRule | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const fetchWebsiteSettings = useCallback(() => {
    api
      .get("/api/website-settings/1", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const data = res.data;
        console.log("Data pengaturan website:", data);

        setNamaToko(data.nama_toko);
        setAlamat(data.alamat);
        setKontak(data.kontak);
        setJamOperasional(data.jam_operasional);

        if (data.lat && data.lng) {
          setStoreLocation([parseFloat(data.lat), parseFloat(data.lng)]);
        }
      })
      .catch((err) => {
        console.error("Gagal ambil pengaturan website:", err);
        showToast("Gagal mengambil pengaturan website", "error");
      });
  }, [showToast]);

  useEffect(() => {
    fetchWebsiteSettings();
  }, [fetchWebsiteSettings]);

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      const websiteSettings = {
        nama_toko: namaToko,
        alamat: alamat,
        kontak: kontak,
        jam_operasional: jamOperasional,
        lat: storeLocation[0].toString(),
        lng: storeLocation[1].toString(),
      };

      await api.put("/api/website-settings/1", websiteSettings, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Pengaturan toko berhasil diperbarui");
      showToast("Pengaturan toko berhasil diperbarui", "success");

      fetchWebsiteSettings();
    } catch (error) {
      console.error("Gagal update pengaturan toko:", error);
      showToast("Gagal memperbarui pengaturan toko", "error");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const validateRule = (rule: ShippingRule): boolean => {
    if (rule.maxDistance <= 0) {
      showToast("Maks. Jarak harus lebih besar dari 0", "error");
      return false;
    }
    if (rule.cost <= 0) {
      showToast("Biaya Pengiriman harus lebih besar dari 0", "error");
      return false;
    }
    return true;
  };

  const handleAddRule = () => {
    if (isAdding) {
      showToast("Selesaikan penambahan aturan sebelum menambah yang baru", "error");
      return;
    }

    const newId = shippingRules.length > 0 ? Math.max(...shippingRules.map(r => r.id)) + 1 : 1;
    const newRuleData = { id: newId, maxDistance: 0, cost: 0, isAdding: true, isEditing: true };
    setNewRule(newRuleData);
    setShippingRules([...shippingRules, newRuleData]);
    setIsAdding(true);
  };

  const handleSaveNewRule = () => {
    if (newRule) {
      if (!validateRule(newRule)) return;

      setShippingRules(
        shippingRules.map((r) =>
          r.id === newRule.id
            ? { ...newRule, isAdding: false, isEditing: false }
            : r
        )
      );
      setNewRule(null);
      setIsAdding(false);
      showToast("Aturan baru berhasil ditambahkan", "success");
    }
  };

  const handleCancelAddRule = (id: number) => {
    setShippingRules(shippingRules.filter((r) => r.id !== id));
    setNewRule(null);
    setIsAdding(false);
  };

  const handleEditRule = (id: number) => {
    if (isAdding) {
      showToast("Selesaikan penambahan aturan sebelum mengedit", "error");
      return;
    }

    const ruleToEdit = shippingRules.find((r) => r.id === id);
    if (ruleToEdit) {
      setEditData({ ...ruleToEdit });
      setShippingRules(
        shippingRules.map((r) =>
          r.id === id ? { ...r, isEditing: true } : { ...r, isEditing: false }
        )
      );
    }
  };

  const handleSaveEditRule = () => {
    if (editData) {
      if (!validateRule(editData)) return;

      setShippingRules(
        shippingRules.map((r) =>
          r.id === editData.id
            ? { ...editData, isEditing: false }
            : r
        )
      );
      setEditData(null);
      showToast("Aturan berhasil diperbarui", "success");
    }
  };

  const handleCancelEdit = (id: number) => {
    setShippingRules(
      shippingRules.map((r) =>
        r.id === id ? { ...r, isEditing: false } : r
      )
    );
    setEditData(null);
  };

  const handleDeleteRule = (id: number) => {
    if (isAdding) {
      showToast("Selesaikan penambahan aturan sebelum menghapus", "error");
      return;
    }

    setShippingRules(shippingRules.filter((r) => r.id !== id));
    showToast("Aturan berhasil dihapus", "success");
  };

  const handleRuleChange = (field: string, value: number) => {
    if (editData) {
      setEditData({ ...editData, [field]: value });
    } else if (newRule) {
      setNewRule({ ...newRule, [field]: value });
    }
  };

  const tableData = shippingRules.map((rule) => ({
    "Maks. Jarak (km)": rule.isEditing ? (
      <input
        type="number"
        value={
          rule.isAdding
            ? newRule?.id === rule.id
              ? newRule.maxDistance
              : rule.maxDistance
            : editData?.id === rule.id
            ? editData.maxDistance
            : rule.maxDistance
        }
        onChange={(e) => handleRuleChange("maxDistance", parseFloat(e.target.value))}
        className="w-full border rounded-lg px-2 py-1"
      />
    ) : (
      rule.maxDistance
    ),
    "Biaya Pengiriman (Rp)": rule.isEditing ? (
      <input
        type="number"
        value={
          rule.isAdding
            ? newRule?.id === rule.id
              ? newRule.cost
              : rule.cost
            : editData?.id === rule.id
            ? editData.cost
            : rule.cost
        }
        onChange={(e) => handleRuleChange("cost", parseFloat(e.target.value))}
        className="w-full border rounded-lg px-2 py-1"
      />
    ) : (
      `Rp ${rule.cost.toLocaleString()}`
    ),
    Aksi: (
      <div className="flex space-x-2">
        {rule.isEditing ? (
          <>
            <button
              onClick={rule.isAdding ? handleSaveNewRule : handleSaveEditRule}
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded cursor-pointer"
            >
              <Icon icon="mdi:content-save" />
              Simpan
            </button>
            <button
              onClick={() =>
                rule.isAdding ? handleCancelAddRule(rule.id) : handleCancelEdit(rule.id)
              }
              className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
            >
              <Icon icon="mdi:cancel" width="18" />
              Batal
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleEditRule(rule.id)}
              className="text-green-700 hover:underline cursor-pointer"
            >
              <Icon icon="mdi:pencil-outline" width="18" height="18" />
            </button>
            <button
              onClick={() => handleDeleteRule(rule.id)}
              className="text-red-600 hover:underline cursor-pointer"
            >
              <Icon icon="mdi:trash-can-outline" width="18" height="18" />
            </button>
          </>
        )}
      </div>
    ),
  }));

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

          <section className="bg-white border border-gray-200 rounded-xl shadow-md p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Profile Toko */}
            <div className="lg:col-span-1 space-y-4 lg:space-y-6">
              <h2 className="text-green-700 font-semibold text-xl flex items-center gap-2">
                <Icon icon="mdi:storefront" className="w-6 h-6" />
                PROFILE TOKO
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-semibold block mb-1 text-green-700">
                    NAMA TOKO
                  </label>
                  <input
                    type="text"
                    value={namaToko}
                    onChange={(e) => setNamaToko(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-green-700"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1 text-green-700">
                    ALAMAT (berdasarkan pinpoint)
                  </label>
                  <textarea
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    readOnly
                    className="w-full border rounded-lg px-3 py-2 focus:outline-green-700"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1 text-green-700">
                    KONTAK
                  </label>
                  <input
                    type="text"
                    value={kontak}
                    onChange={(e) => setKontak(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-green-700"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold block mb-1 text-green-700">
                    JAM OPERASIONAL
                  </label>
                  <input
                    type="text"
                    value={jamOperasional}
                    onChange={(e) => setJamOperasional(e.target.value)}
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
                setAddress={setAlamat}
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
                <Icon icon="mdi:truck-delivery-outline" className="w-6 h-6" />
                ATURAN BIAYA PENGIRIMAN
              </h2>
              <ModernTable
                headers={["Maks. Jarak (km)", "Biaya Pengiriman (Rp)", "Aksi"]}
                data={tableData}
                keyField="id"
              />
              <button
                onClick={handleAddRule}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer mt-4"
              >
                <Icon icon="mdi:plus" />
                Tambah Aturan
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsAdminPage;