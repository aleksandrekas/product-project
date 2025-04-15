import { createSlice } from "@reduxjs/toolkit";




const cartSlice = createSlice({
    name:'cartSlice',
    initialState:{
        cartItems: localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : [],
    },
    reducers:{
        addItem:(state,action)=>{
            const newItem = action.payload
            const existingItem = state.cartItems.find((item) => {
                return (
                  item.name === newItem.name &&
                  JSON.stringify(item.attributes) === JSON.stringify(newItem.attributes)
                );
            });

            if(existingItem){
                existingItem.quantity += 1
            }else{
                state.cartItems.push(newItem)
            }
            
        },
        removeQuantity:(state,action)=>{}
    }

})


export const {addItem} = cartSlice.actions
export default cartSlice.reducer