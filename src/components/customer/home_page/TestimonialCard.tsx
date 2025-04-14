import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import React from "react";

interface Testimonial {
  id: number;
  name: string;
  image: string;
  review: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    image: "/images/man.png",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    rating: 4,
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "/images/man.png",
    review:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Johnson",
    image: "/images/man.png",
    review:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    rating: 4,
  },
  {
    id: 4,
    name: "Emily Brown",
    image: "/images/man.png",
    review:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rating: 4,
  },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  return (
    <motion.div
      className="w-full bg-yellow-500 rounded-lg shadow-lg flex flex-col md:flex-row transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
      initial={{ opacity: 0, y: 20 }} // Mulai dengan opacity 0 dan sedikit geser ke bawah
      animate={{ opacity: 1, y: 0 }} // Animasi ke opacity penuh dan posisi normal
      transition={{ duration: 0.8, ease: "easeOut" }} // Durasi dan easing animasi
    >
      {/* Bagian Gambar */}
      <div className="md:w-1/3 lg:w-1/4 w-full bg-green-600 rounded-t-lg md:rounded-l-lg md:rounded-tr-none flex items-center justify-center p-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-24 h-24 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover"
        />
      </div>

      {/* Bagian Konten */}
      <div className="md:w-2/3 lg:w-3/4 w-full p-6 flex flex-col text-start">
        <h3 className="font-bold text-white text-xl md:text-xl lg:text-2xl mb-2">
          {testimonial.name}
        </h3>
        <p className="text-base lg:text-lg text-white mb-4">
          {testimonial.review}
        </p>
        <div className="flex mt-auto pt-4">
          {Array.from({ length: 5 }, (_, i) => (
            <Icon
              key={i}
              icon={i < testimonial.rating ? "mdi:star" : "mdi:star-outline"}
              className="text-2xl text-white"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );
};

export default TestimonialList;
