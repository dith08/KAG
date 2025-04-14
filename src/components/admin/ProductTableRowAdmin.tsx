// src/components/admin/ProductTableRow.tsx
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface ProductTableRowProps {
  index: number;
  name: string;
  stock: number;
  image: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ProductTableRow: React.FC<ProductTableRowProps> = ({
  index,
  name,
  stock,
  image,
  onEdit,
  onDelete,
}) => {
  return (
    <tr className="bg-orange-200 border-b">
      <td className="p-3">{index + 1}.</td>
      <td className="p-3 flex items-center space-x-2">
        <img src={image} alt="Product" className="w-10 h-10" />
        <span>{name}</span>
      </td>
      <td className="p-3">{stock}</td>
      <td className="p-3 flex space-x-2">
        <button onClick={onEdit} className="p-2 bg-transparent hover:text-blue-600">
          <FaEdit />
        </button>
        <button onClick={onDelete} className="p-2 bg-transparent hover:text-red-600">
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ProductTableRow;
