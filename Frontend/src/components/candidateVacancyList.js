import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getVacancyList } from "../store/vacancySlice.js";
import jsCookie from 'js-cookie';
import { candidateApplyVacancy } from "../store/appliedVacancySlice.js";


function CandidateVacancyList(){
    const [vacancyList , setVacancyList] = useState([]);
    const candidateEmail = jsCookie.get('candidateEmail');
    const [tableHeader , setTableHeader] = useState();
    const [newResult, setnewResult] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
           if(candidateEmail){
             async function myfun(){
             const result = await getVacancyList();
             console.log("Result:",result);
             
              setnewResult(result.data.vacancyStatus);
            //  console.log("Result:",result);
            if(result.data.message=='No record Found'){
                setTableHeader('No record Found');
            }else{
                setTableHeader(
                <thead>
                             <th>S.No</th>
                             <th>VacancyId</th>
                             <th>Post</th>
                             <th>Subject</th>
                             <th>Location</th>
                             <th>Criteria</th>
                             <th>Experience</th>    
                             <th>Mode</th>
                             <th>Vacancy</th>
                             <th>Salary</th>
                             <th>AdvDate</th>
                             <th>LastDate</th>
                             <th>Recruiter</th>
                             <th>Name</th>
                             <th>Recruiter Email</th>
                             <th>Apply</th>
               </thead>
            )

            }

             setVacancyList(result.data.vacancyList);
             }
              myfun();
           }else{ 
             navigate('/candidateLogin');
             alert("Please Login first");
           }
    },[]);
    const applyForVacancy=async(vacancyObj)=>{
        
        const result = await candidateApplyVacancy(vacancyObj);
         setVacancyList(result.data.vacancyList);
         setnewResult(result.data.vacancyStatus);
        
    }
    return(<>
               <center>
        <h2>Candidate's Vacancy List</h2>
        <br/>
        </center>
        <table border="1" width="100%" cellspacing="0" cellpadding="2" id="'space">
           {tableHeader}
            
    <tbody>
        { 
       Array.isArray(vacancyList) && vacancyList.map((vacancy,index)=>{

            let sendObj = {
                vacancyId :vacancy.vacancyId,
                candidateEmail:candidateEmail,
                recruiterEmail:vacancy.email,
                post:vacancy.post
              }
           return(<tr>
                <td>{index+1}</td>
                <td>{vacancy.vacancyId}</td>
                <td>{vacancy.post}</td>
                <td>{vacancy.subject}</td>
                <td>{vacancy.location}</td>
                <td>{vacancy.criteria}</td>
                <td>{vacancy.experience}</td>    
                <td>{vacancy.mode}</td>
                <td>{vacancy.vacancy}</td>
                <td>{vacancy.salary}</td>
                 <td>{new Date(vacancy.advDate).toDateString()}</td>
                 <td>{new Date(vacancy.lastDate).toDateString()}</td>
                <td>{vacancy.recruiter}</td>
                 <td>{vacancy.name}</td>
                  <td>{vacancy.email}</td>
                <td>
                    {
                    newResult.some((obj)=>obj.vacancyId==vacancy.vacancyId && obj.candidateEmail==candidateEmail) ?
                        <span style={{color:"red"}}>Applied</span>:<Link to="" onClick={()=>{ applyForVacancy(sendObj)}}>Apply</Link>
                         
                    }
                </td>    
            </tr>)

        })
        }
    </tbody>
</table>
    </>)
}

export default CandidateVacancyList;