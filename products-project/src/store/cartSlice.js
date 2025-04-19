import { createSlice } from "@reduxjs/toolkit";


let storedCartItems = [];
try {
  const stored = JSON.parse(localStorage.getItem("cartItems"));
  if (Array.isArray(stored)) {
    storedCartItems = stored;
  }
} catch (error) {
  console.error("Error parsing cartItems from localStorage:", error);
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: storedCartItems,
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) =>
          item.name === newItem.name &&
          JSON.stringify(item.attributes) === JSON.stringify(newItem.attributes)
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push(newItem);
      }
    },

    removeQuantity: (state, action) => {
      const targetItem = action.payload;
      const index = state.cartItems.findIndex(
        (item) =>
          item.name === targetItem.name &&
          JSON.stringify(item.attributes) === JSON.stringify(targetItem.attributes)
      );

      if (index !== -1) {
        const item = state.cartItems[index];
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cartItems.splice(index, 1);
        }
      }
    },
  },
});

export const { addItem, removeQuantity } = cartSlice.actions;
export default cartSlice.reducer;
