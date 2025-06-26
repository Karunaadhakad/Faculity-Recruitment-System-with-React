import { createSlice } from "@reduxjs/toolkit";
import { candidateURL, vacancyURL } from "../urls.js";
import axios from "axios";
import jscookie from 'js-cookie';


const recruiterToken = jscookie.get('recruiter_jwt_token');
const candidateToken = jscookie.get('candidate_jwt_token');

const initialState = {
   message : ""
}

const vacancySlice = createSlice({
    name : "vacancySlice",
    initialState,
    reducers :{
                  setMessage : (state,action)=>{
                    state.message = action.payload
                  }
    }
});
export const addVacancy = async(vacancy)=>{
    try{
           const result = await axios.post(vacancyURL+'/addVacancy?recruiterToken='+recruiterToken,vacancy);
           return result;


    }catch(error){
        console.log("Error in addvacancy in vacancySlice");
        
    }
}
export const getVacancyList = async()=>{
    try{
            const result = await axios.get(candidateURL+'/vacancyList?candidateToken='+candidateToken);
            return result;
    }catch(error){
        console.log("Error while fetching vacancy List ",error);
        
    }
}

export const {setMessage} = vacancySlice.actions;
export default vacancySlice.reducer;