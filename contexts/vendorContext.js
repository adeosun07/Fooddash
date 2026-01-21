import React, { createContext, useState } from 'react';

export const VendorContext = createContext();

export const VendorProvider = ({ children }) => {
  const [vendors, setVendors] = useState([
    {
      id: '1',
      name: 'Cushy Cuisine',
      description: '..home of delicacies',
      rating: 4.9,
      deliveryFee: 'N500',
      time: '20-30min',
      status: 'Open',
      image: require('../assets/images/cuishy.png'),
      isFavorite: false,
      tags: ['Home Cooking', 'Rice', 'Chicken'],
      openingTime: '9:00am',
      menu: {
        meals: [
          { id: 'm1', name: 'Jollof Rice', description: 'Hot Nigerian jollof', price: 400, image: '' },
          { id: 'm2', name: 'Fried Rice', description: 'Delicious fried rice', price: 450, image: '' },
        ],
        sides: [
          { id: 's1', name: 'Plantain', description: 'Fried plantain', price: 150, image: '' },
        ],
        'special menus': [
          { id: 'sp1', name: 'Family Feast', description: 'Large portion for 4', price: 5000, image: '' }
        ]
      },
    },
    {
      id: '2',
      name: 'Orente Grills',
      description: '..every taste, an adventure',
      rating: 4.0,
      deliveryFee: 'N500',
      time: '25-30min',
      status: 'Open',
      image: require('../assets/images/orente.png'),
      isFavorite: true,
      tags: ['Grill', 'Beef', 'Chicken'],
      openingTime: '10:00am',
      menu: {
        meals: [
          { id: 'm3', name: 'Grilled Chicken', description: 'Juicy grilled chicken', price: 1200, image: '' },
        ],
        sides: [
          { id: 's2', name: 'Coleslaw', description: 'Fresh coleslaw', price: 200, image: '' },
        ],
        'special menus': []
      },
    },
  ]);

  const toggleFavorite = (id) => {
    setVendors(prev => {
      const idx = prev.findIndex(v => v.id === id);
      if (idx === -1) return prev;

      const vendor = prev[idx];
      const toggled = { ...vendor, isFavorite: !vendor.isFavorite };

      // If marking as favorite, move to top
      if (!vendor.isFavorite) {
        const others = prev.filter(v => v.id !== id);
        return [toggled, ...others];
      }

      // If un-favoriting, just update flag and keep order
      return prev.map(v => (v.id === id ? toggled : v));
    });
  };

  return (
    <VendorContext.Provider value={{ vendors, toggleFavorite }}>
      {children}
    </VendorContext.Provider>
  );
};