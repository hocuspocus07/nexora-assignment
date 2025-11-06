import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as api from '../services/api.js';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  const fetchCart = useCallback(async () => {
    try {
      const { data } = await api.getCart();
      setCartItems(data.items);
      setTotal(data.total);
      
      const count = data.items.reduce((acc, item) => acc + item.quantity, 0);
      setItemCount(count);

    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleAddToCart = async (productId, quantity) => {
    try {
      await api.addToCart(productId, quantity);
      await fetchCart(); // Refresh cart from server
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

const handleDecreaseQuantity = async (itemId) => {
  try {
    await api.decreaseCartItem(itemId);
    await fetchCart(); // Refresh cart
  } catch (error) {
    console.error("Failed to decrease quantity:", error);
  }
};

  const handleRemoveFromCart = async (itemId) => {
    try {
      await api.removeFromCart(itemId);
      await fetchCart(); // Refresh cart from server
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  const value = {
    cartItems,
    total,
    itemCount,
    fetchCart,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    decreaseQuantity: handleDecreaseQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};