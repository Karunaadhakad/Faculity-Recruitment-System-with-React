
import { Link } from "react-router-dom";
import '../css/style.css';
import { useState } from "react";
import { addCandidate } from "../store/candidateSlice.js";
function CandidateRegistration(){
   
  const [ candidateList , setCandidateList] = useState({});

  const getData= (event)=>{
      
    const{name,value} = event.target;
    if(event.target.type=='file'){
      var fileData = event.target.files[0];
     setCandidateList({
               ...candidateList,
              [name] : fileData
    });
    }else{
              setCandidateList({
               ...candidateList,
              [name] : value
    });
    }
   
  }
  const handleSubmit = async(event)=>{
    event.preventDefault();
    var formData = new FormData();
    for(var index in candidateList){
      if(candidateList[index]){
        formData.append(index,candidateList[index]);
      }
    }
      await addCandidate(formData);
    
    event.target.reset();

  }
 return(<div id="loginbox">
    <center>
      <h2>Candidate Registration Form</h2>
      {/* <span style="color: red;"> <%=message%></span> */}
{/* /candidate/candidateRegistration */}
    <form action="" method="post" enctype="multipart/form-data" onSubmit={handleSubmit}>
    <input type="text" placeholder="Enter Full Name" id="name" name="name" class="input" onChange={getData}/> <br/>
    <input  class="input" type="email" placeholder="Enter email" id="email" name="_id" onChange={getData}/> <br/>
    <input class="input" type="password" placeholder="Enter password" id="password" name="password" onChange={getData}/> <br/>
    <span style={{fontSize: "16px"}}>Gender:-</span>
    <input type="radio" id="male" value="Male" name="gender" onClick={getData}/>
    <label for="male" style={{fontSize: "16px"}}>Male</label>
    <input type="radio" id="female" value="Female" name="gender" onClick={getData}/>
    <label for="female" style={{fontSize: "16px"}}>Female</label> <br/>
    <input type="date" name="dob" class="input" onChange={getData}/>
    <textarea name="address" placeholder="Enter Address" class="input" onChange={getData}></textarea>
    <input class="input" type="number" placeholder="Enter 10 digit Mobile No." id="contact" name="contact" maxlength="10" onChange={getData}/> <br/>
    <select name="qualification" class="input" onChange={getData}>
        <option value="">Select Qualification</option>
        <option value="B.COM">B.COM</option>
        <option value="BCA">BCA</option>
        <option value="BBA">BBA</option>
        <option value="MBA">MBA</option>
        <option value="MCA">MCA</option>
        <option value="ME">ME</option>
        <option value="PHD">PHD</option>
    </select>

   <input type="text" class="input" placeholder="Enter Percentage" name="percentage" onChange={getData}/> <br/>
   <select name="experience" class="input" onChange={getData}>
    <option value="">Select Experience</option>
    <option value="Fresher">Fresher</option>
    <option value="1+ Year">1+ Year</option>
    <option value="2+ Year">2+ Year</option>
    <option value="3+ Year">3+ Year</option>
    <option value="5+ Year">5+ Year</option>
    <option value="10+ Year">10+ Year</option>
    
</select> 
<span style={{fontSize:"16px"}}>Resume:-</span>
<input type="file" id="file" name="docs" onChange={getData}/> <br/>
    
    <input class="inputbtn" type="submit" value="Register"/> <br/>
    <input class="inputbtn" type="reset" value="Reset"/>
  </form>
  <Link to="/candidateLogin" class="demolink"> Already Registered ? Login here</Link>
  </center>
</div>)
}
export default CandidateRegistration;