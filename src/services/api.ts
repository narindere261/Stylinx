import axios from 'axios';

const BASE_URL = 'https://api.escuelajs.co/api/v1';

export const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchProducts = () => api.get('/products');
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const fetchCategories = () => api.get('/categories');

// Filter Implementation
export const filterProducts = (params) => {
  // params example: { price_min: 10, categoryId: 1 }
  return api.get('/products', { params });
};