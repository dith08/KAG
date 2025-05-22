import React from "react";
import { Icon } from "@iconify/react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-700 text-white py-8 sm:py-10 md:py-12 lg:py-14 lg:px-20">
      {" "}
      {/* Padding vertikal sedikit disesuaikan */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-20">
        {/* Main Content */}
        <div className="flex flex-col md:grid md:grid-cols-3 md:gap-8 lg:gap-10">
          {" "}
          {/* Gap antar kolom sedikit ditingkatkan */}
          {/* Company Info */}
          <div className="mb-8 md:mb-0">
            {" "}
            {/* Margin bawah disesuaikan */}
            <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">
              {" "}
              {/* Ukuran font judul dikurangi sedikit */}
              KARYA ADI <br /> GRAFIKA
            </h2>
            <div className="flex items-start mb-2">
              {" "}
              {/* Margin bawah disesuaikan */}
              <Icon
                icon="mdi:map-marker"
                className="mt-1 mr-2 text-base sm:text-lg flex-shrink-0" // Ukuran ikon dan margin disesuaikan
              />
              <span className="text-xs sm:text-sm md:text-sm">
                {" "}
                {/* Ukuran teks alamat dikurangi */}
                Jl. Pemuda Desa Mijen, Kaliwungu, Kudus
              </span>
            </div>
            <div className="flex items-center mb-3">
              {" "}
              {/* Margin bawah disesuaikan */}
              <Icon
                icon="mdi:clock-outline"
                className="mr-2 text-base sm:text-lg flex-shrink-0" // Ukuran ikon dan margin disesuaikan
              />
              <span className="text-xs sm:text-sm md:text-sm">
                {" "}
                {/* Ukuran teks waktu operasional dikurangi */}
                Senin - Sabtu: 08.00 - 16.00
              </span>
            </div>
            <div className="flex space-x-3 mt-4">
              {" "}
              {/* Spasi dan margin top disesuaikan */}
              <a
                href="#"
                className="bg-white text-green-700 p-2 rounded-full hover:bg-green-100 transition-colors"
              >
                <Icon
                  icon="ri:whatsapp-fill"
                  width="16" // Ukuran ikon media sosial dikurangi
                  height="16" // Ukuran ikon media sosial dikurangi
                  className="text-yellow-500 sm:w-4 sm:h-4" // Ukuran ikon media sosial disesuaikan untuk sm
                />
              </a>
              <a
                href="#"
                className="bg-white text-green-700 p-2 rounded-full hover:bg-green-100 transition-colors"
              >
                <Icon
                  icon="mdi:facebook"
                  width="16" // Ukuran ikon media sosial dikurangi
                  height="16" // Ukuran ikon media sosial dikurangi
                  className="text-yellow-500 sm:w-4 sm:h-4" // Ukuran ikon media sosial disesuaikan untuk sm
                />
              </a>
              <a
                href="#"
                className="bg-white text-green-700 p-2 rounded-full hover:bg-green-100 transition-colors"
              >
                <Icon
                  icon="mdi:email"
                  width="16" // Ukuran ikon media sosial dikurangi
                  height="16" // Ukuran ikon media sosial dikurangi
                  className="text-yellow-500 sm:w-4 sm:h-4" // Ukuran ikon media sosial disesuaikan untuk sm
                />
              </a>
            </div>
          </div>
          {/* Quick Links & Services in one row on mobile */}
          <div className="grid grid-cols-2 gap-6 md:col-span-2 md:grid md:grid-cols-2">
            {/* Quick Links */}
            <div>
              <h2 className="text-md sm:text-lg md:text-xl font-bold mb-3">
                {" "}
                {/* Ukuran font judul dikurangi */}
                QUICK LINK
              </h2>
              <nav>
                <ul className="space-y-1 text-xs sm:text-sm">
                  {" "}
                  {/* Spasi antar list dan ukuran teks dikurangi */}
                  <li>
                    <a href="/" className="hover:underline block">
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/customer/produk"
                      className="hover:underline block"
                    >
                      Produk
                    </a>
                  </li>
                  <li>
                    <a
                      href="/customer/pesanan"
                      className="hover:underline block"
                    >
                      Pesanan Saya
                    </a>
                  </li>
                  <li>
                    <a
                      href="/customer/keranjang"
                      className="hover:underline block"
                    >
                      Keranjang
                    </a>
                  </li>
                  <li>
                    <a
                      href="/customer/profile"
                      className="hover:underline block"
                    >
                      Profile
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Services */}
            <div>
              <h2 className="text-md sm:text-lg md:text-xl font-bold mb-3">
                {" "}
                {/* Ukuran font judul dikurangi */}
                SERVICES
              </h2>
              <nav>
                <ul className="space-y-1 text-xs sm:text-sm">
                  {" "}
                  {/* Spasi antar list dan ukuran teks dikurangi */}
                  <li>
                    <a href="#" className="hover:underline block">
                      Cetak Custom
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline block">
                      Jasa Desain
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline block">
                      Pengiriman Fleksibel
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline block">
                      Pembayaran Mudah
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline block">
                      Customer Service 24/7
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-white/50 text-center">
          {" "}
          {/* Margin top, padding top, dan border disesuaikan */}
          <p className="text-xs sm:text-sm">
            {" "}
            {/* Ukuran teks copyright dikurangi */}© 2025 KARYA ADI GRAFIKA. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
