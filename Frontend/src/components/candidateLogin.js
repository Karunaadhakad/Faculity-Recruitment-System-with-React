import { Link, useNavigate } from 'react-router-dom';
import '../css/style.css';
import { useState } from 'react';
import { setNavdata } from '../store/commonSlice.js';
import { useDispatch } from 'react-redux';
import { loginCandidate } from '../store/candidateSlice.js';

function CandidateLogin(){

  const[candidateData , setCandidateData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

   const getData = (event)=>{
          const{name,value} = event.target;
          setCandidateData({
                  ...candidateData,
                    [name]:value
      })
    }
     const handleSubmit = async(event)=>{
               event.preventDefault();
         const obj = await loginCandidate(candidateData);
         console.log("obj:",obj);
             
             if(obj.status == 200){
               dispatch(setNavdata('candidateHome'));
                 navigate('/candidateHome',{
                   state : {
                     candidateEmail : obj.data.email
                   }
                 });
         
             }else{
                navigate('/candidateLogin');
             }
           
        }
    return(<div id="loginbox">
    <center>
      <h2>Candidate Login Form</h2>
      {/* <span style="color: red;"> <%=message%></span> */}
      {/* /candidate/candidateLogin */}
    <form action="" method="post" onSubmit={handleSubmit}>
    <input  class="input" type="email" placeholder="Enter email" id="email" name="email" onChange={getData}/> <br/>
    <input class="input" type="password" placeholder="Enter password" id="password" name="password" onChange={getData}/> <br/>
    <input class="inputbtn" type="submit" value="Login"/> <br/>
    <input class="inputbtn" type="reset" value="Reset"/>
  </form>
  <Link to="/candidateRegistration" class="demolink">Yet not Registered ? Regester here</Link>
  </center>
</div>)
}
export default CandidateLogin;