import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    navShow : "home"
}

const commonSlice = createSlice({
    name : "commonSlice",
    initialState,
    reducers :{
        setNavdata : (state,action)=>{
            state.navShow = action.payload
        }
    }
})
export const {setNavdata} = commonSlice.actions;
export default commonSlice.reducer;