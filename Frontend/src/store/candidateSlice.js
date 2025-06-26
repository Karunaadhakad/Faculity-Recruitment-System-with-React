import { createSlice } from "@reduxjs/toolkit";
import { candidateURL } from "../urls.js";
import axios from "axios";
import jscookie from 'js-cookie';
import { getDefaultNormalizer } from "@testing-library/dom";

const candidateToken = jscookie.get('candidate_jwt_token');
const initialState = {
    message : ""
}

const candidateSlice = createSlice({
    name : "candidateSlice",
    initialState,
    reducers :{
        setMessage : (state,action)=>{
            state.message = action.payload;
        }
    }
});

export const addCandidate = async(candidateList)=>{
    try{
           const result =   await axios.post(candidateURL+'/candidateRegistration',candidateList);
            console.log("Result : ",result);
            return result;
            
    }catch(error){
        console.log("Error while adding candidate",error);       
    }
}
// email - karunadhakad30@gmail.com
// password - 74100
export const loginCandidate = async(candidate)=>{
    try{
        const result =  await axios.post(candidateURL+'/candidateLogin',candidate);
        console.log("Result:",result);
         if(result.status==200){
                    console.log("result.data.email",result.data.email);
                    
                    jscookie.set("candidateEmail",result.data.email);
                    jscookie.set("candidate_jwt_token",result.data.token,{expires:1});
                }
        return result;
        
    }catch(error){
        console.log("Error while loginCandidate",error);
        
    }
}
export const getStatusData = async()=>{
    try{
          const result = await axios.get(candidateURL+'/myStatus?candidateToken='+candidateToken);
          return result;
    }catch(error){
        console.log("error occured while getting  candidate status",error);
        
    }
}
export const{setMessage} = candidateSlice.actions;
export default candidateSlice.reducer;