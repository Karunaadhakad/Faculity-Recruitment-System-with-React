import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import jsCookie from 'js-cookie';
import { candidateAppliedList, recruiterUpdateStatus } from "../store/recruiterSlice.js";
import { setNavdata } from "../store/commonSlice.js";
import { serverURL } from "../urls.js";


function AppliedCandidateList(){
    const navegate = useNavigate();
    const dispatch = useDispatch();
    const [tableHeader,setTableHeader] = useState();
    const[appliedVacancyList,setAppliedVacancyList] = useState([]);
    const[newResult,setNewResult] = useState([]);
   

    const recruiterEmail  = jsCookie.get("recruiterEmail");
     useEffect(()=>{
        dispatch(setNavdata("recruiterHome"));
        const fetchData = async()=>{
        if(recruiterEmail){

            const result = await candidateAppliedList();
            console.log("result candidateAppliedList:",result);
            
            if(result.data.message=='No record Found'){
                setTableHeader('No record Found');
            }else{
                setTableHeader(<thead>
                       <th>S.No</th>
                       <th>AppliedVacancyId</th>
                       <th>VacancyId</th>
                       <th>CandidateEmail</th>
                       <th>RecruiterEmail</th>
                       <th>Post</th>
                       <th>Candidate Resume</th>
                       <th>RecruiterStatus</th>
                    </thead>);
                    setAppliedVacancyList(result.data.appliedCandidateList);
                    setNewResult(result.data.result);

            }

              

        }
    else{
            navegate('/')
        }
    }
    fetchData();
    },[]);

  const handleSubmit = async(event)=>{
       event.preventDefault();
       const formData = new FormData(event.target);
       const vacancyId = formData.get('vacancyId');
       const recruiterStatus = formData.get('recruiterStatus');
       const candidateData = {
        vacancyId:vacancyId,
        recruiterStatus:recruiterStatus
       }
    const result  = await recruiterUpdateStatus(candidateData);
    setAppliedVacancyList(result.data.appliedCandidateList);
    console.log("REsult recruiterUpdateStatus:",result);
    event.target.reset();
       
  }


    return(<>
    <p style={{fontFamily:"candara" , fontSize:"20px"}}>
         Welcome {recruiterEmail}
    </p>
    <br/>
    <center>
        <h2>Applied Candidate Vacancy List</h2>
    </center>
    <table border="1" width="100%" cellspacing="0" cellpadding="2" id="'space">
           {tableHeader}
           <tbody>
             {
           Array.isArray(appliedVacancyList) &&  appliedVacancyList.map((vacancy,index)=>{
               return(<tr>
                    <td>{index+1}</td>
                    <td>{vacancy.appliedvacancyId}</td>
                    <td>{vacancy.vacancyId}</td>
                    <td>{vacancy.candidateEmail}</td>    
                    <td>{vacancy.recruiterEmail}</td>
                    <td>{vacancy.post}</td>
                    <td> <a href={`${serverURL}/documents/${newResult[index]}`} download={newResult[index]}>{newResult[index]}</a>
</td>
                    
                    <td>
                        {/*/recruiter/recruiterUpdateStatus  */}
                        <form action="" method="post" onSubmit={handleSubmit}> 
                        <input type="hidden" value={vacancy.vacancyId} name="vacancyId"/>
                        <select name="recruiterStatus" id="input">
                            <option value={vacancy.recruiterStatus}>{vacancy.recruiterStatus}</option>
                            <option value="ShortListed">ShortListed</option>
                            <option value="Better Luck Next Time">Better Luck Next Time</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        <input type="submit" value="Update Status" id="inputbtn"/>
                        </form>
                    </td>
                </tr>   )})}
           </tbody>
     </table>      
     
</>)}

export default AppliedCandidateList;