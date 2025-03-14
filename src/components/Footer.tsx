import React from "react";
import { Icon } from "@iconify/react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-700 text-white py-12">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex justify-around">
          {/* Company Info */}
          <div className="flex flex-col pl-4 md:pl-0">
            <h2 className="text-2xl font-bold mb-6">KARYA ADI GRAFIKA</h2>
            <div className="flex items-start mb-4">
              <Icon
                icon="mdi:map-marker"
                className="mt-1 mr-3 text-xl flex-shrink-0"
              />
              <span>Jl. Raya Percetakan No. 123, Kota XYZ, Indonesia</span>
            </div>
            <div className="flex items-center mb-6">
              <Icon
                icon="mdi:clock-outline"
                className="mr-3 text-xl flex-shrink-0"
              />
              <span>Senin - Sabtu: 08.00 - 16.00</span>
            </div>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-white text-green-700 p-2 rounded-full hover:bg-green-100 transition-colors"
              >
                <Icon icon="mdi:whatsapp" width="20" height="20" />
              </a>
              <a
                href="#"
                className="bg-white text-green-700 p-2 rounded-full hover:bg-green-100 transition-colors"
              >
                <Icon icon="mdi:facebook" width="20" height="20" />
              </a>
              <a
                href="#"
                className="bg-white text-green-700 p-2 rounded-full hover:bg-green-100 transition-colors"
              >
                <Icon icon="mdi:email" width="20" height="20" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col pl-4 md:pl-0">
            <h2 className="text-2xl font-bold mb-6">QUICK LINK</h2>
            <nav>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:underline block">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline block">
                    Produk
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline block">
                    Pesanan Saya
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline block">
                    Keranjang
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline block">
                    Profile
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Services */}
          <div className="flex flex-col pl-4 md:pl-0">
            <h2 className="text-2xl font-bold mb-6">SERVICES</h2>
            <nav>
              <ul className="space-y-3">
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

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-green-600 text-center">
          <p>© 2025 KARYA ADI GRAFIKA. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
