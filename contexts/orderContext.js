import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { assignRiderToOrder } from '../services/riderServices';

export const OrderContext = createContext({
  orders: [],
  orderHistory: [],
  addItem: () => {},
  removeItem: () => {},
  updateItemQuantity: () => {},
  clear: () => {},
  getTotal: () => 0,
  placeOrder: async () => {},
  updateOrderStatus: () => {},
  getActiveOrders: () => [],
  getCompletedOrders: () => [],
});

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem('orders');
        if (raw) setOrders(JSON.parse(raw));
        
        const historyRaw = await AsyncStorage.getItem('orderHistory');
        if (historyRaw) setOrderHistory(JSON.parse(historyRaw));
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

  useEffect(() => {
    const save = async () => {
      try {
        await AsyncStorage.setItem('orderHistory', JSON.stringify(orderHistory));
      } catch (e) {
        console.warn('Failed to save order history', e);
      }
    };
    save();
  }, [orderHistory]);

  const addItem = (item) => {
    setOrders(prev => [...prev, item]);
  };

  const removeItem = (id) => {
    setOrders(prev => prev.filter(i => i.id !== id));
  };

  const updateItemQuantity = (index, delta) => {
    setOrders(prev => {
      const updated = [...prev];
      const newQty = (updated[index].quantity || 1) + delta;
      if (newQty <= 0) {
        updated.splice(index, 1);
      } else {
        updated[index] = { ...updated[index], quantity: newQty };
      }
      return updated;
    });
  };

  const clear = () => setOrders([]);

  const getTotal = () => orders.reduce((s, i) => s + (i.price * (i.quantity || 1) || 0), 0);

  // Create a new order and add it to history
  const placeOrder = async (orderData) => {
    // Assign a rider to the order
    const rider = await assignRiderToOrder();
    
    const newOrder = {
      id: Date.now().toString(),
      items: orders.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      restaurant: orderData.restaurant || 'Unknown Vendor',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: orderData.total || getTotal(),
      status: 'On the way',
      deliveryStatus: `${rider.fullName} is on the way`,
      rider: {
        id: rider.id,
        fullName: rider.fullName,
        bikeType: rider.bikeType,
        bikePlateNumber: rider.bikePlateNumber,
        phone: rider.phone,
        rating: rider.rating,
      },
      isActive: true,
      timestamp: Date.now(),
    };
    
    setOrderHistory(prev => [newOrder, ...prev]);
    clear(); // Clear cart after placing order
    return newOrder;
  };

  // Update order status
  const updateOrderStatus = (orderId, status, deliveryStatus) => {
    setOrderHistory(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status, deliveryStatus, isActive: status === 'On the way' }
        : order
    ));
  };

  // Get active orders
  const getActiveOrders = () => orderHistory.filter(order => order.isActive);

  // Get completed orders
  const getCompletedOrders = () => orderHistory.filter(order => !order.isActive);

  return (
    <OrderContext.Provider value={{ 
      orders, 
      addItem, 
      removeItem, 
      updateItemQuantity, 
      clear, 
      getTotal,
      orderHistory,
      placeOrder,
      updateOrderStatus,
      getActiveOrders,
      getCompletedOrders,
    }}>
      {children}
    </OrderContext.Provider>
  );
};
