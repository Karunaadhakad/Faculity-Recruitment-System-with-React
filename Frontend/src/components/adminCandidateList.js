import { useEffect, useState } from "react";
import { adminLogin, adminVerifyCandidate, candidateList } from "../store/adminSlice.js";
import { Link } from "react-router-dom";
import '../css/style.css';
import { serverURL } from "../urls.js";


function AdminCandidateList(){
    const[candidateDataList,setCandidateList] = useState([]);
    useEffect(()=>{ 
        async function myfun(){
                 const candidateDataList = await candidateList();
                 setCandidateList(candidateDataList.data.candidateList);
        } myfun();
    },[]);

    const adminVerify = async(candidateEmail)=>{
           try{
                 const result =  await adminVerifyCandidate(candidateEmail) ;
                 console.log("Result",result);
                 setCandidateList(result.data.candidateList);
           }catch(error){
            console.log("Error in ui adminverify",error);
            
           }
    }
    return(
       <>
         <center>
        <h2>Candidate List</h2>
    </center>
    <br/>
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
        <th>Email</th>
        <th>Gender</th>
        <th>Contact</th>
        <th>Address</th>
        <th>Qualification</th>   
        <th>Docs</th>
        <th>Experience</th>    
        <th>EmailVerify</th>
        <th>AdminVerify</th>
    </thead>
    <tbody>
{
    Array.isArray(candidateDataList).candidateDataList.map((candidate,index) => {
        return(<tr>
                <td>{index+1}</td>
                <td>{candidate.name}</td>
                <td>{candidate._id}</td>
                <td>{candidate.gender}</td>
                <td>{candidate.contact}</td>
                <td>{candidate.address}</td>
                <td>{candidate.qualification}</td>
                <td> <a href={`${serverURL}/documents/${candidate.docs}`} download={candidate.docs}>{candidate.docs}</a>
                </td>
                <td>{candidate.experience}</td>
                <td>{candidate.emailVerify}</td>
                <td>
                    <Link to='' onClick={()=>{adminVerify(candidate.email)}}>{candidate.adminVerify}</Link>
                </td>

            </tr>)
} )   
}
    </tbody>
</table>
       </>);
}

export default AdminCandidateList;