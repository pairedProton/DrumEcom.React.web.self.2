import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add product to cart (or increase qty if already exists)
  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + quantity }
            : item
        );
      }
      return [...prev, { ...product, qty: quantity }];
    });
  };

  // Remove a single item from cart
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  // Update qty for a specific cart item
  const updateQty = (productId, newQty) => {
    if (newQty < 1) return;
    setCartItems(prev =>
      prev.map(item => item.id === productId ? { ...item, qty: newQty } : item)
    );
  };

  // Clear entire cart
  const clearCart = () => setCartItems([]);

  // Total items count for badge
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  // Subtotal price
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.salePrice || item.sale_price || item.price || 0;
    return sum + price * item.qty;
  }, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      totalItems,
      subtotal,
    }}>
      {children}
    </CartContext.Provider>
  );
};
