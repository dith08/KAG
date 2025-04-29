import React, { useEffect } from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";

// AOS (Animate On Scroll)
import AOS from "aos";
import "aos/dist/aos.css";

// Plugins
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

const ProductGallery: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const images = [
    "/images/gallery1.jpg",
    "/images/gallery2.jpg",
    "/images/gallery3.jpg",
    "/images/gallery4.jpg",
    "/images/gallery5.jpg",
    "/images/gallery6.jpg",
    "/images/gallery7.jpg",
    "/images/gallery8.jpg",
    "/images/gallery9.jpg",
  ];

  return (
    <section className="py-16 px-6 sm:px-10 md:px-16 lg:px-24 bg-green-700">
      <div className="max-w-5xl mx-auto">
        {" "}
        {/* <-- Batas ukuran galeri */}
        <h2
          className="text-2xl md:text-3xl font-bold text-center mb-12 text-white"
          data-aos="fade-up"
        >
          GALERI PRODUK
        </h2>
        <LightGallery plugins={[lgThumbnail, lgZoom]} mode="lg-fade">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 justify-center">
            {images.map((src, index) => (
              <a
                key={index}
                href={src}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group block overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative w-full" style={{ paddingTop: "100%" }}>
                  {/* Pakai teknik padding-top 100% agar kotaknya kecil tetap 1:1 */}
                  <img
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    src={src}
                    alt={`Product ${index + 1}`}
                  />
                </div>
              </a>
            ))}
          </div>
        </LightGallery>
      </div>
    </section>
  );
};

export default ProductGallery;
