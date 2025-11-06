import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
});

export const getProducts = () => api.get('/products');

export const getCart = () => api.get('/cart');

export const addToCart = (productId, quantity) => 
  api.post('/cart', { productId, quantity });

export const removeFromCart = (itemId) => 
  api.delete(`/cart/${itemId}`);

export const decreaseCartItem = (itemId) =>
  api.patch(`/cart/${itemId}/decrease`);

export const checkout = (checkoutData) => 
  api.post('/checkout', checkoutData);