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

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  return (
    <motion.div
      className="w-full bg-yellow-500 rounded-lg shadow-lg flex flex-col md:flex-row transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
      variants={itemVariants}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Bagian Gambar - Lebar lebih kecil di desktop */}
      <div className="md:w-1/4 lg:w-1/5 w-full bg-green-600 rounded-t-lg md:rounded-l-lg md:rounded-tr-none flex items-center justify-center p-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-20 h-20 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full object-cover" // Mengurangi ukuran gambar
        />
      </div>

      {/* Bagian Konten - Lebar lebih besar di desktop */}
      <div className="md:w-3/4 lg:w-4/5 w-full p-4 sm:p-6 flex flex-col text-start">
        {" "}
        {/* Mengurangi padding sedikit */}
        <h3 className="font-bold text-white text-lg md:text-xl lg:text-xl mb-1">
          {" "}
          {/* Mengurangi ukuran font judul */}
          {testimonial.name}
        </h3>
        <p className="text-sm lg:text-base text-white mb-3 line-clamp-4">
          {" "}
          {/* Mengurangi ukuran font review dan menambahkan line-clamp */}
          {testimonial.review}
        </p>
        <div className="flex mt-auto pt-2">
          {" "}
          {/* Mengurangi padding-top */}
          {Array.from({ length: 5 }, (_, i) => (
            <Icon
              key={i}
              icon={i < testimonial.rating ? "mdi:star" : "mdi:star-outline"}
              className="text-xl text-white" // Mengurangi ukuran ikon bintang
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialList: React.FC = () => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </motion.div>
  );
};

export default TestimonialList;
