import React from "react";
import { Icon } from "@iconify/react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-700 text-white py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:justify-around gap-8 md:gap-4">
          {/* Company Info */}
          <div className="flex flex-col">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 md:text-left">
              KARYA ADI <br /> GRAFIKA
            </h2>
            <div className="flex items-start mb-3 md:mb-4">
              <Icon
                icon="mdi:map-marker"
                className="mt-1 mr-3 text-xl flex-shrink-0"
              />
              <span className="text-sm md:text-base">
                Jl. Pemuda Desa Mijen, Kaliwungu, Kudus
              </span>
            </div>
            <div className="flex items-center mb-4 md:mb-6">
              <Icon
                icon="mdi:clock-outline"
                className="mr-3 text-xl flex-shrink-0"
              />
              <span className="text-sm md:text-base">
                Senin - Sabtu: 08.00 - 16.00
              </span>
            </div>
            <div className="flex space-x-4 md:justify-start">
              <a
                href="#"
                className="bg-white text-green-700 p-2 rounded-full hover:bg-green-100 transition-colors"
              >
                <Icon
                  icon="ri:whatsapp-fill"
                  width="20"
                  height="20"
                  className="text-yellow-500"
                />
              </a>
              <a
                href="#"
                className="bg-white text-green-700 p-2 rounded-full hover:bg-green-100 transition-colors"
              >
                <Icon
                  icon="mdi:facebook"
                  width="20"
                  height="20"
                  className="text-yellow-500"
                />
              </a>
              <a
                href="#"
                className="bg-white text-green-700 p-2 rounded-full hover:bg-green-100 transition-colors"
              >
                <Icon
                  icon="mdi:email"
                  width="20"
                  height="20"
                  className="text-yellow-500"
                />
              </a>
            </div>
          </div>

          {/* Quick Links & Services in a row on mobile */}
          <div className="flex flex-row justify-start md:justify-around md:flex-row gap-8 md:gap-8">
            {/* Quick Links */}
            <div className="flex flex-col">
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-6 text-center md:text-left">
                QUICK LINK
              </h2>
              <nav>
                <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
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
            <div className="flex flex-col">
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-6 text-left md:text-left">
                SERVICES
              </h2>
              <nav>
                <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
                  <li>
                    <a href="#" className="hover:underline block">
                      Cetak Custom
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline block">
                      Template Desain
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
        <div className="mt-8 md:mt-20 pt-4 md:pt-6 border-t border-white text-center text-sm md:text-base">
          <p>© 2025 KARYA ADI GRAFIKA. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
