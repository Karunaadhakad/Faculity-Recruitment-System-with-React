import { useEffect, useState } from "react";
import { adminLogin, adminVerifyRecruiter, recruiterList } from "../store/adminSlice.js";
import { Link } from "react-router-dom";
import '../css/style.css';


function AdminRecruiterList(){
    const[recruiterDataList,setRecruiterList] = useState([]);
    useEffect(()=>{ 
        async function myfun(){
                 const recruiterDataList = await recruiterList();
                 setRecruiterList(recruiterDataList.data.recruiterList);
        } myfun();
    },[]);

    const adminVerify = async(recruiterEmail)=>{
           try{
                 const result =  await adminVerifyRecruiter(recruiterEmail) ;
                 console.log("Result",result);
                 setRecruiterList(result.data.recruiterList);
           }catch(error){
            console.log("Error in ui adminverify",error);
            
           }
    }
    return(
       <>
         <center>
        <h2>Recruiter List</h2>
    </center>
<table border="1" width="100%" cellspacing="0" cellpadding="2" id="'space">
    <caption>
        <center>
            <span style={{color:"red"}}>
                {/* <%=message%> */}
            </span>
        </center>
    </caption>
    <thead>
        <th>S.No</th>
        <th>Name</th>
        <th>Recruiter Type</th>
        <th>Email</th>
        <th>Contact</th>
        <th>Address</th>
        <th>Status</th>       
        <th>EmailVerify</th>
        <th>AdminVerify</th>
    </thead>
    <tbody>
{
   Array.isArray(recruiterDataList) && recruiterDataList.map((recruiter,index) => {
        return(<tr>
                <td>{index+1}</td>
                <td>{recruiter.name}</td>
                <td>{recruiter.recruiter}</td>
                <td>{recruiter.email}</td>
                <td>{recruiter.contact}</td>
                <td>{recruiter.address}</td>
                <td>{recruiter.status}</td>
                <td>{recruiter.emailVerify}</td>
                <td>
                    <Link to='' onClick={()=>{adminVerify(recruiter.email)}}>{recruiter.adminVerify}</Link>
                </td>

            </tr>)
} )   
}
    </tbody>
</table>
       </>);
}

export default AdminRecruiterList;