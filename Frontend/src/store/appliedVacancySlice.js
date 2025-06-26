import { createSlice } from "@reduxjs/toolkit";
import { appliedVacancyURL } from "../urls.js";
import axios from "axios";
import jscookie from 'js-cookie';

const candidateToken = jscookie.get('candidate_jwt_token');


const initialState = {
    message : ""
}

const appliedVacancySlice = createSlice({
    name : "appliedVacancySlice",
    initialState,
    reducers:{
        setMessage : (state,action)=>{
            state.message = action.payload
        }
    }

});
export const candidateApplyVacancy = async(vacancyObj)=>{
    try{
         
             const result= await axios.get(appliedVacancyURL+'/candidateAppliedVacancy?candidateToken='+candidateToken+'&data='+JSON.stringify(vacancyObj));
              return result;
    }catch(error){
        console.log("Error occured while candidate apply for vacancy",error );
        
    }
}
export const{setMessage} = appliedVacancySlice.actions;
export default appliedVacancySlice.reducer;