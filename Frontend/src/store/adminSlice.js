import { createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { adminURL } from "../urls.js";
import jscookie from 'js-cookie';
const adminToken = jscookie.get('admin_jwt_token');
const initialState = {
    message : ""
}

const adminSlice = createSlice({
    name : "adminSlice",
    initialState,
    reducers :{
        setMessage : (state,action)=>{
            state.navShow = action.payload
        }
    }
})



export const adminLogin = async(adminCredential)=>{
    try{
        //    console.log("adminCredential.adminEmail:",adminCredential.email);
          const result = await axios.post(adminURL+'/adminLogin',adminCredential);
          console.log("REsult:",result);
        if(result.status==200){
            console.log("result.data.email",result.data.email);
            
            jscookie.set("adminEmail",result.data.email);
            jscookie.set("admin_jwt_token",result.data.token,{expires:1});
        }
          
          
          return result ;
    }catch(error){
                    console.log("Error in adminLogin",error);
                   
    }
}
export const recruiterList = async()=>{
    try{
             const recruiterList =   await axios.get(adminURL+'/adminRecruiterList?adminToken='+adminToken);
               console.log("recruiterList:",recruiterList);
              return recruiterList;
               
    }catch(error){
                    console.log("Error while dealing with recruiter List in admin panel",error);
                   
    }
}
export const candidateList = async()=>{
    try{
             const candidateList =   await axios.get(adminURL+'/adminCandidateList?adminToken='+adminToken);
               console.log("candidateList:",candidateList);
              return candidateList;
               
    }catch(error){
                    console.log("Error while dealing with recruiter List in admin panel",error);
                   
    }
}
export const adminVerifyRecruiter = async(recruiterEmail)=>{
    try{
           const recruiterStatus = await axios.get(adminURL+'/adminVerifyRecruiter?adminToken='+adminToken+'&recruiterEmail='+recruiterEmail);
           return recruiterStatus;
    }catch(error){
        console.log("Error while verify recruiter");       
    }
}
export const adminVerifyCandidate = async(candidateEmail)=>{
    try{
           const candidateStatus = await axios.get(adminURL+'/adminVerifyCandidate?adminToken='+adminToken+'&candidateEmail='+candidateEmail);
           return candidateStatus;
    }catch(error){
        console.log("Error while verify recruiter");       
    }
}
export const {setMessage} = adminSlice.actions;
export default adminSlice.reducer;