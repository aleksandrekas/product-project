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
    totalItems:storedCartItems.reduce((sum, item) => sum + item.quantity, 0),
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) =>
          item.name === newItem.name &&
          JSON.stringify(item.selectedAttributes) === JSON.stringify(newItem.selectedAttributes)
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push(newItem);
      }
    },

    addQuantity:(state,action)=>{
      const targetItem = action.payload;
      const index = state.cartItems.findIndex(
        (item) =>
          item.name === targetItem.name &&
          JSON.stringify(item.selectedAttributes) === JSON.stringify(targetItem.selectedAttributes)
      );
      state.cartItems[index].quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

    },

    removeQuantity: (state, action) => {
      const targetItem = action.payload;
      const index = state.cartItems.findIndex(
        (item) =>
          item.name === targetItem.name &&
          JSON.stringify(item.selectedAttributes) === JSON.stringify(targetItem.selectedAttributes)
      );

      if (index !== -1) {
        const item = state.cartItems[index];
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cartItems.splice(index, 1);
        }
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

    },
    updateTotalItems: (state) => {
      let itemCount = 0;
      state.cartItems.forEach((item) => {
        itemCount += item.quantity;
      });
      state.totalItems = itemCount;
    }
  },
});

export const { addItem, removeQuantity,updateTotalItems,addQuantity } = cartSlice.actions;
export default cartSlice.reducer;
