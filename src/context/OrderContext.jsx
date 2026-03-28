import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within an OrderProvider');
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const placeOrder = (cartItems, total, userInfo) => {
    const newOrder = {
      id: `TAU-${Date.now().toString().slice(-6)}`,
      items: cartItems,
      total,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Processing',
      paymentMethod: userInfo?.paymentMethod || 'Card',
      shippingAddress: userInfo?.address || 'Default Address',
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
