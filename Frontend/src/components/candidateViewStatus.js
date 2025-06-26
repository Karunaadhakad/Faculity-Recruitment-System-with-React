import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setNavdata } from "../store/commonSlice";
import { getStatusData } from "../store/candidateSlice.js";
import jsCookie from 'js-cookie';

function CandidateViewStatus(){
const candidateEmail  = jsCookie.get("candidateEmail");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [tableHeader,setTableHeader] = useState();
    const[appliedVacancyList,setAppliedVacancyList] = useState([]);
    useEffect(()=>{
        async function myfun() {
            dispatch(setNavdata("candidateHome"));
            if(candidateEmail){
            const result = await getStatusData();
            console.log("REsult------",result);
            
             if(result.data.message=='No record Found'){
                setTableHeader('No record Found');
            }else{
                setTableHeader(<thead>
                                      <th>S.No</th>
                                      <th>AppliedCandidateId</th>
                                      <th>VacancyId</th>
                                      <th>CandidateEmail</th>
                                      <th>RecruiterEmail</th>
                                      <th>Post</th>
                                      <th>RecruiterStatus</th>
                               </thead>);
                    setAppliedVacancyList(result.data.appliedCandidateList);
                   
            }
        }else{
            navigate('/');
        }
        }myfun();
    },[]);
    return(<>
            <center>
               <h2>Applied Candidate Vacancy List</h2>
                 
            </center>
              <br/>
             <table border="1" width="100%" cellspacing="0" cellpadding="2" id="'space">
           {tableHeader}
          <tbody>
           {
           Array.isArray(appliedVacancyList) && appliedVacancyList.map((vacancy,index)=>{
               return(  <tr>
                    <td>{index+1}</td>
                    <td>{vacancy.appliedvacancyId}</td>
                    <td>{vacancy.vacancyId}</td>
                    <td>{vacancy.candidateEmail}
                      
                    </td>    
                    <td>{vacancy.recruiterEmail}</td>
                    <td>{vacancy.post}</td>
                    <td>{vacancy.recruiterStatus}</td>
                   
                </tr>   )
            })}
        </tbody>
        </table>
    </>);
}

export default CandidateViewStatus;

