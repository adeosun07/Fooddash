import React, { createContext, useContext } from 'react';
import { VendorContext } from './vendorContext';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const { vendors } = useContext(VendorContext);

  const getVendorById = (id) => vendors.find(v => v.id === id);

  return (
    <ShopContext.Provider value={{ getVendorById }}>
      {children}
    </ShopContext.Provider>
  );
};