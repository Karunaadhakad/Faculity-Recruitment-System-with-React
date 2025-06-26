import { Link, useNavigate } from "react-router-dom";
import '../css/style.css';
import { useState } from "react";
import { addRecruiter, setMessage } from "../store/recruiterSlice.js";
import { useDispatch } from "react-redux";

 

function RecruiterRegistration(){

   const [recruiter,setRecruiter] = useState({});
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const getData = (event)=>{
    const {name,value} = event.target;
    setRecruiter({
      ...recruiter,
      [name]:value
    })
   }

   const handleSubmit = async(event)=>{
          event.preventDefault();
           const obj = await addRecruiter(recruiter);
           console.log("object:",obj);
   
     if(obj.status==201){
         dispatch(setMessage(obj.data.message));
          navigate('/recruiterLogin');
     }else{
         navigate('/recruiterRegistration');
     }
  }

 return(<div id="loginbox">
    <center>
      <h2>Recruiter Registration Form</h2>
     {/* /recruiter/recruiterRegistration */}
    <form action="" method="post" onSubmit={handleSubmit}>
          <input 
                type="text" 
                placeholder="Enter name" 
                id="name" 
                name="name" 
                className="input"
                onChange={getData}
          />

          <select  onChange={getData} name="recruiter" className="input">
              <option value="">Select Type</option>
              <option value="School">School</option>
              <option value="College">College</option>
              <option value="Professional Institute">Professional Institute</option>
          </select>

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
            className="input" 
            type="number" 
            placeholder="Enter 10 digit Mobile No." 
            id="contact" 
            name="contact" 
            maxLength="10"
            onChange={getData}
            /> 
            <br/>

          <textarea 
            name="address"  
            placeholder="Enter Address" 
            className="input"
            onChange={getData}
            >
            </textarea>

          <input 
             className="inputbtn" 
             type="submit" 
             value="Register"
             /> 
             <br/>

           <input
             className="inputbtn" 
             type="reset" 
             value="Reset"
             />
     </form>

  <Link to="/recruiter/recruiterLogin" className="demolink"> Already Registered ? Login here</Link>
  </center>
</div>)
}
export default RecruiterRegistration;