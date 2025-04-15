import React from "react";
import { Icon } from "@iconify/react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-700 text-white py-6 sm:py-8 md:py-10 lg:py-12 lg:px-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-20">
        {/* Main Content */}
        <div className="flex flex-col md:grid md:grid-cols-3 md:gap-6 lg:gap-8">
          {/* Company Info */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6">
              KARYA ADI <br /> GRAFIKA
            </h2>
            <div className="flex items-start mb-3">
              <Icon
                icon="mdi:map-marker"
                className="mt-1 mr-3 text-lg sm:text-xl flex-shrink-0"
              />
              <span className="text-xs sm:text-sm md:text-base">
                Jl. Pemuda Desa Mijen, Kaliwungu, Kudus
              </span>
            </div>
            <div className="flex items-center mb-4">
              <Icon
                icon="mdi:clock-outline"
                className="mr-3 text-lg sm:text-xl flex-shrink-0"
              />
              <span className="text-xs sm:text-sm md:text-base">
                Senin - Sabtu: 08.00 - 16.00
              </span>
            </div>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-white text-green-700 p-2 rounded-full hover:bg-green-100 transition-colors"
              >
                <Icon
                  icon="ri:whatsapp-fill"
                  width="18"
                  height="18"
                  className="text-yellow-500 sm:w-5 sm:h-5"
                />
              </a>
              <a
                href="#"
                className="bg-white text-green-700 p-2 rounded-full hover:bg-green-100 transition-colors"
              >
                <Icon
                  icon="mdi:facebook"
                  width="18"
                  height="18"
                  className="text-yellow-500 sm:w-5 sm:h-5"
                />
              </a>
              <a
                href="#"
                className="bg-white text-green-700 p-2 rounded-full hover:bg-green-100 transition-colors"
              >
                <Icon
                  icon="mdi:email"
                  width="18"
                  height="18"
                  className="text-yellow-500 sm:w-5 sm:h-5"
                />
              </a>
            </div>
          </div>

          {/* Quick Links & Services in one row on mobile */}
          <div className="grid grid-cols-2 gap-6 md:col-span-2 md:grid md:grid-cols-2">
            {/* Quick Links */}
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 md:mb-4">
                QUICK LINK
              </h2>
              <nav>
                <ul className="space-y-2 text-xs sm:text-sm md:text-base">
                  <li>
                    <a href="/customer" className="hover:underline block">
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
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 md:mb-4">
                SERVICES
              </h2>
              <nav>
                <ul className="space-y-2 text-xs sm:text-sm md:text-base">
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
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 pt-4 border-t border-white text-center">
          <p className="text-xs sm:text-sm md:text-base">
            © 2025 KARYA ADI GRAFIKA. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
