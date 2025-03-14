import React from "react";

interface ProdukTerlarisCardProps {
  image: string;
  title: string;
}

const ProdukTerlarisCard: React.FC<ProdukTerlarisCardProps> = ({
  image,
  title,
}) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-2xl p-4 overflow-hidden h-100 w-70 group">
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-500 rounded-full transform -translate-x-1/2 translate-y-1/2 z-0"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <img
          src={image}
          alt="Product image"
          className="max-w-full max-h-64 object-contain"
        />
      </div>
      {/* Overlay saat hover */}
      <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <h3 className="text-white text-xl font-bold">{title}</h3>
      </div>
    </div>
  );
};

export default ProdukTerlarisCard;
