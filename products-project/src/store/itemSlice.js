import { createSlice } from "@reduxjs/toolkit";


const itemSlice = createSlice({
    name:'itemSlice',
    initialState:'',
    reducers:{
        setId:(state,action)=>{
            return action.payload
        }
    }
})



export const {setId} = itemSlice.actions
export default itemSlice.reducer