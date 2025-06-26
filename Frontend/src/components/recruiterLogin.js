import { Link, useNavigate } from 'react-router-dom';
import '../css/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { loginRecruiter } from '../store/recruiterSlice.js';
import { setNavdata } from '../store/commonSlice.js';


function RecruiterLogin(){
  var message = useSelector(state=>state.recruiter.message);
  const [recruiterData,setRecruiterData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
     /* extract message from url starts*/ 

     const urlSearch = new URLSearchParams(window.location.search);
     console.log("urlSearch:",urlSearch);
     if(urlSearch.size)
          message = urlSearch.get("message");
          console.log("messageNew:",message);   
    /* extract message from url ends*/ 
    const getData = (event)=>{
          const{name,value} = event.target;
          setRecruiterData({
                  ...recruiterData,
                    [name]:value
      })
    }
    const handleSubmit = async(event)=>{
           event.preventDefault();
     const obj = await loginRecruiter(recruiterData);
     console.log("obj:",obj);
         
         if(obj.status == 200){
           dispatch(setNavdata('recruiterHome'));
             navigate('/recruiterHome',{
               state : {
                 recruiterEmail : obj.data.email
               }
             });
     
         }else{
            navigate('/recruiterLogin');
         }
       
    }
   
    return(<div id="loginbox">
    <center>
      <h2>Recruiter Login Form</h2>
    
     {message}
     {/* /recruiter/recruiterLogin */}
    <form action="" method="post" onSubmit={handleSubmit}>
    <input 
        className="input" 
        type="email" 
        placeholder="Enter email" 
        id="email" 
        name="email" 
        onChange={getData}
        /> 
        <br/>
    <input 
      className="input" 
      type="password" 
      placeholder="Enter password" 
      id="password" 
      name="password"
      onChange={getData}
      /> 
      <br/>
    <input 
      className="inputbtn" 
      type="submit" 
      value="Login"
      /> 
      <br/>
    <input 
       className="inputbtn" 
       type="reset" 
       value="Reset"
       />
  </form>
  <Link to="/recruiterRegistration" className="demolink">Yet not Registered ? Regester here</Link>
  </center>
</div>)
}
export default RecruiterLogin;