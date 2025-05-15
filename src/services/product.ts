import api from './api';

// Interface for the API response
interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

// Products API
export const getProducts = () => {
  return api.get<ApiResponse<Product[]>>('/products');
};

export const getProduct = (id: number) => {
  return api.get<ApiResponse<Product>>(`/products/${id}`);
};

export const createProduct = (productData: Omit<Product, 'id'>) => {
  return api.post<ApiResponse<Product>>('/products', productData);
};

export const updateProduct = (id: number, productData: Partial<Product>) => {
  return api.put<ApiResponse<Product>>(`/products/${id}`, productData);
};

export const deleteProduct = (id: number) => {
  return api.delete<ApiResponse<void>>(`/products/${id}`);
};

// Materials API
export const getMaterials = () => {
  return api.get<ApiResponse<BahanBaku[]>>('/materials');
};

export const getMaterial = (id: number) => {
  return api.get<ApiResponse<BahanBaku>>(`/materials/${id}`);
};

export const createMaterial = (materialData: Omit<BahanBaku, 'id'>) => {
  return api.post<ApiResponse<BahanBaku>>('/materials', materialData);
};

export const updateMaterial = (id: number, materialData: Partial<BahanBaku>) => {
  return api.put<ApiResponse<BahanBaku>>(`/materials/${id}`, materialData);
};

export const deleteMaterial = (id: number) => {
  return api.delete<ApiResponse<void>>(`/materials/${id}`);
};

// Types for Products and Materials
export interface Product {
  id: number;
  name: string;  // name of the product
  size: string;  // 'ukuran' is changed to 'size' for consistency with English
  materialId: number;  // updated to match 'materialId' for consistency
  finishing: Finishing[];
  available: boolean;
  imageUrl: string;
  price: string;  // 'harga' is changed to 'price' for clarity in English
}

export interface Finishing {
  id: number;
  productId: number;
  type: string;  // 'jenis' is changed to 'type' for clarity
  additionalCost: string;  // 'hargaTambahan' changed to 'additionalCost' for clarity
}

export interface BahanBaku {
  id: number;
  name: string;  // 'nama' changed to 'name'
  type: string;  // 'jenis' changed to 'type'
  stock: number;  // 'stok' changed to 'stock'
  unit: string;  // 'satuan' changed to 'unit'
  price: string;  // 'harga' changed to 'price'
}
