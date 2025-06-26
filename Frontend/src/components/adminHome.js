import { useLocation, useNavigate } from 'react-router-dom';
import banner from '../images/bannner.jpeg';
import '../css/style.css';
import jsCookie from 'js-cookie';
import { useEffect } from 'react';



function AdminHome(){
    // const location = useLocation();
    const adminEmail = jsCookie.get('adminEmail');
    const navigate = useNavigate();

    useEffect(()=>{
        if(adminEmail)
          navigate('/adminHome');
        else{
        
           navigate('/adminLogin');
           alert("Please Login first");
        }
       
    },[])
    return(<div id="banner">
     
      welcome  {adminEmail}
        <img src={banner} id="ban_img"/>
         </div>
    )
}

export default AdminHome;