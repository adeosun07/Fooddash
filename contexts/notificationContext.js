import React, { createContext, useState } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Order Delivered Successfully',
      body: 'Your order from Cushy Cuisine has been delivered. We hope you enjoyed your meal!',
      time: '2 hours ago',
      group: 'Today',
      isRead: false,
    },
    {
      id: '2',
      title: 'New Vendor Available',
      body: 'Chente Grills just joined Fooddash! Check out their amazing menu...',
      time: '4 hours ago',
      group: 'Today',
      isRead: false,
    },
    {
      id: '3',
      title: 'Order Confirmed',
      body: 'Your order from Boss Grills has been confirmed and is being prepared.',
      time: 'Yesterday at 8:30 PM',
      group: 'Yesterday',
      isRead: true,
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const hasUnread = notifications.some(n => !n.isRead);

  return (
    <NotificationContext.Provider value={{ notifications, markAllAsRead, hasUnread }}>
      {children}
    </NotificationContext.Provider>
  );
};