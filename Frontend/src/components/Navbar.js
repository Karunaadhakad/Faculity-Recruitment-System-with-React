import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Link} from "react-router-dom";
import jscookie from 'js-cookie';
import { setNavdata } from "../store/commonSlice.js";

function Navbar(){
  const[menuItem,setMenuItem] = useState();
  const navShow = useSelector(state=>state.commonSlice.navShow);
  
  const dispatch = useDispatch();
  const candidateLogout = ()=>{
    jscookie.set("candidateEmail",null);
    jscookie.remove("candidate_jwt_token");
    dispatch(setNavdata("home"));
    // navigate('/');

  }
   const recruiterLogout = ()=>{
    jscookie.set("recruiterEmail",null);
    jscookie.remove("recruiter_jwt_token");
    dispatch(setNavdata("home"));
    // navigate('/');

  }
  const adminLogout = ()=>{
    jscookie.set("adminEmail",null);
    jscookie.remove("admin_jwt_token");
    dispatch(setNavdata("home"));
    // navigate('/');

  }
    useEffect(()=>{
         const timer = setTimeout(()=>{
           if(navShow == 'home'){
            setMenuItem(<div id="nav">
            <ul>
            <li><Link to='#'>Home</Link></li>
            <li><Link to="/recruiterLogin">Recruiter</Link></li>
            <li><Link to="/candidateLogin">Candidate</Link></li>
            <li><Link to="#">About</Link></li>
            <li><Link to="#">Contact</Link></li>
            <li><Link to="#">Services</Link></li>
            <li><Link to="#">FAQ</Link></li>
            </ul>
         </div>
          ) 
           }else if(navShow=='adminHome'){
                setMenuItem(<div id="nav">
       
         <ul>
            <li><Link to="/adminHome">Home</Link></li>
            <li><Link to="/adminRecruiterList">Recruiter</Link></li>
            <li><Link to="/adminCandidateList">Candidate</Link></li>
            <li><Link to="#">Vacancy</Link></li>
            <li><Link to="#">Applied Candidate</Link></li>
            <li><Link to="#">Account</Link></li>
            <li><Link to="/" onClick={adminLogout}>Logout</Link></li>
            
            </ul>
            </div>
            )
           }else if(navShow=='recruiterHome'){
                setMenuItem(<div id="nav">
       
         <ul>
            <li><Link to="/recruiterHome">Home</Link></li>
            <li><Link to="/addVacancy">AddVacancy</Link></li>
            <li><Link to="/vacancyPosted">Posted Vacancy</Link></li>
            <li><Link to="/appliedCandidateList">Applied Candidate List</Link></li>
            <li><Link to="#">Change Password</Link></li>
            <li><Link to="/" onClick={recruiterLogout}>Logout</Link></li>
            
            </ul>
            </div>
            )
           }else if(navShow=='candidateHome'){
                setMenuItem(<div id="nav">
       
         <ul>
            <li><Link to="/candidateHome">Home</Link></li>
            <li><Link to="/vacancyList">VacancyList</Link></li>
            <li><Link to="/myStatus">MyStatus</Link></li>
            <li><Link to="#">Change Password</Link></li>
            <li><Link to="/" onClick={candidateLogout}>Logout</Link></li>
            
            </ul>
            </div>
            )
           }
         })
         return ()=>{clearTimeout(timer)}
    },[navShow])
  return(<>
  {menuItem}
  </>)
}
export default Navbar;