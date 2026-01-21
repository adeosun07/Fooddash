import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem('orders');
        if (raw) setOrders(JSON.parse(raw));
      } catch (e) {
        console.warn('Failed to load orders', e);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const save = async () => {
      try {
        await AsyncStorage.setItem('orders', JSON.stringify(orders));
      } catch (e) {
        console.warn('Failed to save orders', e);
      }
    };
    save();
  }, [orders]);

  const addItem = (item) => {
    setOrders(prev => [...prev, item]);
  };

  const removeItem = (id) => {
    setOrders(prev => prev.filter(i => i.id !== id));
  };

  const clear = () => setOrders([]);

  const getTotal = () => orders.reduce((s, i) => s + (i.price || 0), 0);

  return (
    <OrderContext.Provider value={{ orders, addItem, removeItem, clear, getTotal }}>
      {children}
    </OrderContext.Provider>
  );
};
