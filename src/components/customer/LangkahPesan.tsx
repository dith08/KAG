import { FC } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

// Define types for the props
interface LangkahPesanProps {
  step: number;
  icon: string;
  title: string;
  color: string;
  description: string;
}

const LangkahPesan: FC<LangkahPesanProps> = ({
  step,
  icon,
  title,
  color,
  description,
}) => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-6 pt-16 relative group transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Icon Bulat */}
      <div
        className={`absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-${color} rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon icon={icon} className="text-white text-3xl" />
      </div>

      {/* Judul */}
      <h3 className="text-center text-lg md:text-xl font-semibold group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>

      {/* Nomor Langkah */}
      <p
        className={`text-${color} font-semibold italic text-xl md:text-2xl text-center mt-2`}
      >
        0{step}
      </p>

      {/* Deskripsi */}
      <p className="text-gray-600 mt-4 text-center text-sm md:text-base">
        {description}
      </p>
    </motion.div>
  );
};

export default LangkahPesan;
