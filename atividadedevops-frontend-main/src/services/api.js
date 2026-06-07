import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://favstorefaculdade.onrender.com';
const FAKE_STORE = 'https://fakestoreapi.com';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// injeta o id do usuário logado em cada requisição que precisar
export const setAuthUser = (user) => {
  api.defaults.headers['X-User-Id'] = user?.id ?? '';
};

// Auth / cadastro
export const authApi = {
  register: (data) => api.post('/customers', data),          // POST /customers
  login:    (data) => api.post('/customers/login', data),    // POST /customers/login  ← adaptar ao backend
  me:       (id)   => api.get(`/customers/${id}`),           // GET  /customers/:id
  update:   (id, data) => api.put(`/customers/${id}`, data), // PUT  /customers/:id
};

// Favoritos do usuário logado
export const favoritesApi = {
  list:   (userId)            => api.get(`/customers/${userId}/favorites`),
  add:    (userId, productId) => api.post(`/customers/${userId}/favorites`, { productId }),
  remove: (userId, productId) => api.delete(`/customers/${userId}/favorites/${productId}`),
};

// Fake Store
export const storeApi = {
  listProducts:   ()    => axios.get(`${FAKE_STORE}/products`),
  getProduct:     (id)  => axios.get(`${FAKE_STORE}/products/${id}`),
  listCategories: ()    => axios.get(`${FAKE_STORE}/products/categories`),
  byCategory:     (cat) => axios.get(`${FAKE_STORE}/products/category/${cat}`),
};
