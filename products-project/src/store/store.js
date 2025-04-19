import { configureStore } from "@reduxjs/toolkit";
import itemSlice from './itemSlice';
import cartSlice from './cartSlice';

export const store = configureStore({
  reducer: {
    id: itemSlice,
    cart: cartSlice  
  }
});
