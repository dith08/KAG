import React from "react";

interface Product {
  id: number;
  image: string;
  title: string;
  price: string;
}

const products: Product[] = [
  {
    id: 1,
    image: "/images/magazine.png",
    title: "Paperbag",
    price: "Rp. 30.000",
  },
  {
    id: 2,
    image: "/images/magazine.png",
    title: "Paperbag",
    price: "Rp. 30.000",
  },
  {
    id: 3,
    image: "/images/magazine.png",
    title: "Paperbag",
    price: "Rp. 30.000",
  },
  {
    id: 4,
    image: "/images/magazine.png",
    title: "Paperbag",
    price: "Rp. 30.000",
  },
  {
    id: 5,
    image: "/images/magazine.png",
    title: "Paperbag",
    price: "Rp. 30.000",
  },
  {
    id: 6,
    image: "/images/magazine.png",
    title: "Paperbag",
    price: "Rp. 30.000",
  },
];

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full flex-1">
      <div className="bg-green-700 p-4 flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="h-32 object-contain"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="font-medium text-lg">{product.title}</h3>
        <p className="text-green-700 font-medium">{product.price}</p>
        <button
          onClick={() => alert(`Pesan: ${product.title}`)}
          className="mt-3 bg-yellow-500 text-white px-4 py-2 rounded-md w-full hover:bg-yellow-600 transition cursor-pointer"
        >
          Pesan Sekarang
        </button>
      </div>
    </div>
  );
};

const ProductList = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 p-4 max-w-screen-lg mx-auto mt-10 mb-15">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
