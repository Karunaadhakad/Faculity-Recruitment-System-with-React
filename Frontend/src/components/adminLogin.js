import { useState } from 'react';
import '../css/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLogin} from '../store/adminSlice.js';
import { setNavdata } from '../store/commonSlice.js';




function AdminLogin(){

  const [adminCredential,setCredential] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const getData = (event)=>{
     const {name,value} = event.target;
      setCredential({
             ...adminCredential,
                [name]:value
      })
  }
   const handleSubmit = async(event)=>{
    event.preventDefault();
    const obj = await adminLogin(adminCredential);
    console.log("obj:",obj);
    
    if(obj.status == 200){
      dispatch(setNavdata('adminHome'));
        navigate('/adminHome',{
          state : {
            adminEmail : obj.data.email
          }
          
        });
      
      }
        
   }
      
    return(
            <div id="loginbox">
          <center>
            <h2>Admin Login Form</h2>
          {/* <span style={{color: "red"}}>{message}</span> */}
          {/* /admin/adminLogin */}
 
          <form action="" method="post" onSubmit={handleSubmit}>

          <input  
             class="input" 
             type="email" 
             placeholder="Enter email" 
             id="email" 
             name="email"
             onChange={getData}
             />
              <br/>
          <input 
               class="input" 
               type="password" 
               placeholder="Enter password" 
               id="password"
               name="password"
               onChange={getData}
           /> 
           <br/>
          <input 
             class="inputbtn" 
             type="submit" 
             value="Login"
             /> 
             <br/>
           <input 
              class="inputbtn" 
              type="reset" 
              value="Reset"
            />
        </form>
        </center>
   </div>
      
    
    )
}

export default AdminLogin;