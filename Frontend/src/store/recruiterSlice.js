import {createSlice} from '@reduxjs/toolkit';
 import axios from 'axios';
import { recruiterURL } from "../urls.js";
import jscookie from 'js-cookie'; 
const recruiterToken = jscookie.get('recruiter_jwt_token');
const initialState = {
 message :""
}

const recruiterSlice = createSlice({
    name:"recruiterSlice",
    initialState,
    reducers:{
        setMessage : (state,action)=>{
            console.log("setMessage ",action.payload);
            state.message = action.payload;     
        }
    }
})

export const addRecruiter = async(recruiter)=>{
    try{
           const result =   await axios.post(recruiterURL+'/recruiterRegistration',recruiter);
            console.log("Result : ",result);
            return result;
            
    }catch(error){
        console.log("Error while adding recruiter");       
    }
}
/*
   email = karunadhakad30@gmail.com
   password = 74100
*/ 
export const loginRecruiter = async(recruiter)=>{
    try{
        const result =  await axios.post(recruiterURL+'/recruiterLogin',recruiter);
        console.log("Result:",result);
         if(result.status==200){
                    console.log("result.data.email",result.data.email);
                    
                    jscookie.set("recruiterEmail",result.data.email);
                    jscookie.set("recruiter_jwt_token",result.data.token,{expires:1});
                }
        return result;
        
    }catch(error){
        console.log("Error while loginRecruiter",error);
        
    }
}
export const candidateAppliedList = async()=>{
    try{
            const result = await axios.get(recruiterURL+'/appliedCandidateList?recruiterToken='+recruiterToken);  
            console.log("result rescruiterSlice:",result);
              
            return result;
    }catch(error){
        console.log("Error occured while candidate applied vacancy",error);
        
    }
}
export const recruiterUpdateStatus = async(candidateData)=>{
    try{
         const result = await axios.post(recruiterURL+'/recruiterUpdateStatus?recruiterToken='+recruiterToken,candidateData);
         return result;
    }catch(error){
        console.log("error occured while during recruiterUpdateStatus",error);
        
    }
}
export const {setMessage} = recruiterSlice.actions;
export default recruiterSlice.reducer;