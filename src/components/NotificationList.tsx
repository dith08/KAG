import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/id"; // Import untuk format tanggal bahasa Indonesia
import { Icon } from "@iconify/react"; // Menggunakan iconify

type Notification = {
  id: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

interface NotificationListProps {
  userId: number;
  role: "admin" | "customer";
  apiUrl: string;
}

const NotificationList: React.FC<NotificationListProps> = ({
  userId,
  role,
  apiUrl,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false); // State untuk panel mobile

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      // Menggunakan setTimeout untuk simulasi API call
      setTimeout(() => {
        const dummyData: Notification[] = [
          {
            id: 1,
            title: "Pesanan Baru",
            message: "Ada pesanan baru dari Ali untuk produk Kaos Custom",
            is_read: false,
            created_at: "2025-04-23T09:30:00Z",
          },
          {
            id: 2,
            title: "Pembayaran Diterima",
            message: "Pembayaran untuk pesanan #123 telah dikonfirmasi",
            is_read: true,
            created_at: "2025-04-22T14:15:00Z",
          },
          {
            id: 3,
            title: "Desain Selesai",
            message: "Desain untuk pesanan #124 telah disetujui oleh customer",
            is_read: false,
            created_at: "2025-04-21T10:45:00Z",
          },
          {
            id: 4,
            title: "Pengiriman Diproses",
            message: "Pesanan #122 sedang dalam proses pengiriman",
            is_read: true,
            created_at: "2025-04-20T08:30:00Z",
          },
          {
            id: 5,
            title: "Ulasan Baru",
            message: "Anda mendapatkan ulasan bintang 5 dari customer Budi",
            is_read: false,
            created_at: "2025-04-19T16:45:00Z",
          },
        ];
        setNotifications(dummyData);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      // Simulasi API call untuk production
      // await axios.post(`${apiUrl}/${id}/read`);

      // Untuk sementara update state langsung
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      // Simulasi API call untuk production
      // await Promise.all(
      //   notifications
      //     .filter((n) => !n.is_read)
      //     .map((n) => axios.post(`${apiUrl}/${n.id}/read`))
      // );

      // Untuk sementara update state langsung
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  useEffect(() => {
    dayjs.locale("id"); // Set locale ke Indonesia
    fetchNotifications();
  }, [userId, role]);

  const hasUnread = notifications.some((n) => !n.is_read);
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  // Format waktu relatif
  const formatTimeAgo = (dateString: string) => {
    const date = dayjs(dateString);
    const now = dayjs();
    const diffMinutes = now.diff(date, "minute");

    if (diffMinutes < 60) {
      return `${diffMinutes} menit yang lalu`;
    } else if (diffMinutes < 24 * 60) {
      return `${Math.floor(diffMinutes / 60)} jam yang lalu`;
    } else if (diffMinutes < 48 * 60) {
      return "Kemarin";
    } else {
      return date.format("DD MMM YYYY");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4 flex justify-center items-center h-32 w-full">
        <div className="animate-pulse flex space-x-2">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md w-full mx-auto">
      {/* Header */}
      <div className="border-b border-gray-100 p-4 flex justify-between items-center sticky top-0 bg-white z-10 rounded-t-xl">
        <div className="flex items-center gap-2">
          <Icon
            icon="mdi:bell-outline"
            className="text-gray-600"
            width={20}
            height={20}
          />
          <h2 className="text-lg font-semibold">
            Notifikasi
            {unreadCount > 0 && (
              <span className="ml-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </h2>
        </div>

        {hasUnread && (
          <button
            onClick={markAllAsRead}
            className="text-xs text-green-600 hover:text-green-800 font-medium"
          >
            Tandai semua dibaca
          </button>
        )}
      </div>

      {/* Body */}
      <div
        className={`overflow-y-auto ${
          expanded ? "max-h-[80vh]" : "max-h-[60vh]"
        }`}
      >
        {notifications.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-gray-500">
            <Icon
              icon="mdi:bell-off-outline"
              className="text-gray-300 mb-3"
              width={48}
              height={48}
            />
            <p>Tidak ada notifikasi</p>
          </div>
        ) : (
          <div>
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`border-b border-gray-100 p-4 hover:bg-gray-50 transition-colors cursor-pointer relative ${
                  !notif.is_read ? "bg-green-50" : ""
                }`}
                onClick={() => !notif.is_read && markAsRead(notif.id)}
              >
                <div className="flex items-start space-x-3">
                  {/* Indicator dot for unread */}
                  {!notif.is_read && (
                    <div className="shrink-0 mt-1.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4
                        className={`font-medium text-sm ${
                          !notif.is_read ? "text-gray-900" : "text-gray-700"
                        }`}
                      >
                        {notif.title}
                      </h4>
                      <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                        {formatTimeAgo(notif.created_at)}
                      </span>
                    </div>
                    <p
                      className={`text-xs ${
                        !notif.is_read ? "text-gray-800" : "text-gray-600"
                      }`}
                    >
                      {notif.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer for mobile - Toggle expand */}
      <div className="md:hidden border-t border-gray-100 p-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex justify-center items-center text-gray-500 py-1"
        >
          <Icon
            icon={expanded ? "mdi:chevron-up" : "mdi:chevron-down"}
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
};

export default NotificationList;
