/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
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
  shipping_cost: number;
  isEditing?: boolean;
  isAdding?: boolean;
}

const SettingsAdminPage: React.FC = () => {
  const [namaToko, setNamaToko] = useState("");
  const [alamat, setAlamat] = useState("");
  const [kontak, setKontak] = useState("");
  const [jamOperasional, setJamOperasional] = useState("");
  const [storeLocation, setStoreLocation] = useState<[number, number]>([0, 0]);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const [shippingRules, setShippingRules] = useState<ShippingRule[]>([]);
  const [editData, setEditData] = useState<ShippingRule | null>(null);
  const [newRule, setNewRule] = useState<ShippingRule | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoadingRules, setIsLoadingRules] = useState(false);

  const fetchShippingRules = useCallback(async () => {
    setIsLoadingRules(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token tidak ditemukan");

      const response = await api.get("/api/shipping-rules", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const rulesData = response.data?.data || [];
      setShippingRules(
        rulesData.map((rule: any) => ({
          id: rule.id,
          maxDistance: rule.max_distance,
          shipping_cost: rule.shipping_cost,
          isEditing: false,
          isAdding: false,
        }))
      );
    } catch (error: any) {
      if (error.response?.status === 401) {
        showToast("Sesi telah berakhir, silakan login kembali", "error");
      } else if (error.response?.status === 403) {
        showToast("Anda tidak memiliki akses untuk melihat data ini", "error");
      } else if (error.response?.status >= 500) {
        showToast("Terjadi kesalahan server", "error");
      } else {
        showToast("Gagal mengambil aturan pengiriman", "error");
      }
    } finally {
      setIsLoadingRules(false);
    }
  }, []);

  const fetchWebsiteSettings = useCallback(() => {
    api
      .get("/api/website-settings/1", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const data = res.data;
        setNamaToko(data.nama_toko);
        setAlamat(data.alamat);
        setKontak(data.kontak);
        setJamOperasional(data.jam_operasional);
        if (data.lat && data.lng) {
          setStoreLocation([parseFloat(data.lat), parseFloat(data.lng)]);
        }
      })
      .catch((err) => {
        if (err.response?.status !== 404) {
          showToast("Gagal mengambil pengaturan website", "error");
        }
      });
  }, []);

  useEffect(() => {
    fetchWebsiteSettings();
    fetchShippingRules();
  }, [fetchWebsiteSettings, fetchShippingRules]);

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      const websiteSettings = {
        nama_toko: namaToko,
        alamat,
        kontak,
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

      showToast("Pengaturan toko berhasil disimpan", "success");
      fetchWebsiteSettings();
    } catch {
      showToast("Gagal memperbarui pengaturan toko", "error");
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const validateRule = (rule: ShippingRule): boolean => {
    if (rule.maxDistance <= 0) {
      showToast("Maks. jarak harus lebih besar dari 0", "error");
      return false;
    }
    if (rule.shipping_cost <= 0) {
      showToast("Biaya pengiriman harus lebih besar dari 0", "error");
      return false;
    }
    return true;
  };

  const handleAddRule = () => {
    if (isAdding) {
      showToast("Selesaikan penambahan aturan sebelumnya", "error");
      return;
    }

    const newId = Date.now();
    const newRuleData = {
      id: newId,
      maxDistance: 0,
      shipping_cost: 0,
      isAdding: true,
      isEditing: true,
    };
    setNewRule(newRuleData);
    setShippingRules([...shippingRules, newRuleData]);
    setIsAdding(true);
  };

  const handleSaveNewRule = async () => {
    if (!newRule || !validateRule(newRule)) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showToast("Token tidak ditemukan", "error");
        return;
      }

      const response = await api.post(
        "/api/shipping-rules",
        {
          max_distance: newRule.maxDistance,
          shipping_cost: newRule.shipping_cost,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      showToast(
        response.data?.message || "Aturan baru berhasil ditambahkan",
        "success"
      );
      await fetchShippingRules();
      setNewRule(null);
      setIsAdding(false);
    } catch (error: any) {
      if (error.response?.status === 401) {
        showToast("Sesi telah berakhir", "error");
      } else if (error.response?.status === 403) {
        showToast("Anda tidak memiliki akses", "error");
      } else if (error.response?.status === 422) {
        const errorMessages = error.response.data?.errors;
        showToast(errorMessages?.[0]?.[0] || "Data tidak valid", "error");
      } else {
        setShippingRules(
          shippingRules.map((r) =>
            r.id === newRule.id
              ? { ...newRule, isAdding: false, isEditing: false }
              : r
          )
        );
        setNewRule(null);
        setIsAdding(false);
        showToast("Aturan baru disimpan (offline)", "success");
      }
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

  const handleSaveEditRule = async () => {
    if (!editData || !validateRule(editData)) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showToast("Token tidak ditemukan", "error");
        return;
      }

      const response = await api.put(
        `/api/shipping-rules/${editData.id}`,
        {
          max_distance: editData.maxDistance,
          shipping_cost: editData.shipping_cost,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      showToast(
        response.data?.message || "Aturan berhasil diperbarui",
        "success"
      );
      await fetchShippingRules();
      setEditData(null);
    } catch (error: any) {
      if (error.response?.status === 401) {
        showToast("Sesi telah berakhir", "error");
      } else if (error.response?.status === 403) {
        showToast("Anda tidak memiliki akses", "error");
      } else if (error.response?.status === 422) {
        const errorMessages = error.response.data?.errors;
        showToast(errorMessages?.[0]?.[0] || "Data tidak valid", "error");
      } else {
        setShippingRules(
          shippingRules.map((r) =>
            r.id === editData.id ? { ...editData, isEditing: false } : r
          )
        );
        setEditData(null);
        showToast("Aturan diperbarui (offline)", "success");
      }
    }
  };

  const handleCancelEdit = (id: number) => {
    setShippingRules(
      shippingRules.map((r) => (r.id === id ? { ...r, isEditing: false } : r))
    );
    setEditData(null);
  };

  const handleDeleteRule = async (id: number) => {
    if (isAdding) {
      showToast("Selesaikan penambahan aturan sebelum menghapus", "error");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showToast("Token tidak ditemukan", "error");
        return;
      }

      const response = await api.delete(`/api/shipping-rules/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      showToast(response.data?.message || "Aturan berhasil dihapus", "success");
      await fetchShippingRules();
    } catch (error: any) {
      if (error.response?.status === 401) {
        showToast("Sesi telah berakhir", "error");
      } else if (error.response?.status === 403) {
        showToast("Anda tidak memiliki akses", "error");
      } else {
        setShippingRules(shippingRules.filter((r) => r.id !== id));
        showToast("Aturan dihapus (offline)", "success");
      }
    }
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
              ? Math.floor(newRule.maxDistance) || ""
              : Math.floor(rule.maxDistance) || ""
            : editData?.id === rule.id
            ? Math.floor(editData.maxDistance) || ""
            : Math.floor(rule.maxDistance) || ""
        }
        onChange={(e) =>
          handleRuleChange(
            "maxDistance",
            Math.floor(parseFloat(e.target.value)) || 0
          )
        }
        className="w-full border rounded-lg px-2 py-1"
      />
    ) : (
      Math.floor(rule.maxDistance)
    ),
    "Biaya Pengiriman (Rp)": rule.isEditing ? (
      <input
        type="number"
        value={
          rule.isAdding
            ? newRule?.id === rule.id
              ? Math.floor(newRule.shipping_cost) || ""
              : Math.floor(rule.shipping_cost) || ""
            : editData?.id === rule.id
            ? Math.floor(editData.shipping_cost) || ""
            : Math.floor(rule.shipping_cost) || ""
        }
        onChange={(e) =>
          handleRuleChange(
            "shipping_cost",
            Math.floor(parseFloat(e.target.value)) || 0
          )
        }
        className="w-full border rounded-lg px-2 py-1"
      />
    ) : (
      `Rp ${Math.floor(rule.shipping_cost).toLocaleString()}`
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
                rule.isAdding
                  ? handleCancelAddRule(rule.id)
                  : handleCancelEdit(rule.id)
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
            <Icon icon="mdi:cog" className="text-green-700 w-8 h-8" />
            PENGATURAN TOKO
          </h1>
          <section className="bg-white border border-gray-200 rounded-xl shadow-md p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
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
            <div className="lg:col-span-2 space-y-4 lg:space-y-6">
              <h2 className="text-green-700 font-semibold text-xl flex items-center gap-2">
                <Icon icon="mdi:map-marker-radius" className="w-6 h-6" />
                PILIH LOKASI TOKO DI PETA
              </h2>
              <MapPicker
                setAddress={setAlamat}
                setCoordinates={(lat, lng) => setStoreLocation([lat, lng])}
                latitude={storeLocation[0].toString()}
                longitude={storeLocation[1].toString()}
                initialAddress={alamat}
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
              <div className="flex justify-between items-center">
                <h2 className="text-green-700 font-semibold text-xl flex items-center gap-2 mt-6">
                  <Icon icon="mdi:truck-delivery-outline" className="w-6 h-6" />
                  ATURAN BIAYA PENGIRIMAN
                </h2>
                <button
                  onClick={handleAddRule}
                  disabled={isLoadingRules}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer mt-6 disabled:opacity-50"
                >
                  <Icon icon="mdi:plus" />
                  Tambah Aturan
                </button>
              </div>
              {isLoadingRules ? (
                <div className="flex justify-center items-center py-4">
                  <Icon icon="mdi:loading" className="animate-spin w-6 h-6" />
                  <span className="ml-2">Memuat aturan pengiriman...</span>
                </div>
              ) : (
                <ModernTable
                  headers={[
                    "Maks. Jarak (km)",
                    "Biaya Pengiriman (Rp)",
                    "Aksi",
                  ]}
                  data={tableData}
                  keyField="id"
                />
              )}{" "}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsAdminPage;
