import { createSlice } from "@reduxjs/toolkit";




const cartSlice = createSlice({
    name:'cartSlice',
    initialState:{
        cartItems: localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : [],
    },
    reducers:{
        addItem:(state,action)=>{
            state.cartItems.push(action.payload)
        }
    }

})


export const {addItem} = cartSlice.actions
export default cartSlice.reducer