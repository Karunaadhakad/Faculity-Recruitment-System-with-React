import { useLocation, useNavigate } from 'react-router-dom';
import banner from '../images/bannner.jpeg';
import '../css/style.css';
import jsCookie from 'js-cookie';
import { useEffect } from 'react';

function RecruiterHome(){
    // const location = useLocation();
    const recruiterEmail = jsCookie.get('recruiterEmail');
    const navigate = useNavigate();

    useEffect(()=>{
        if(recruiterEmail)
          navigate('/recruiterHome');
        else{
        
           navigate('/recruiterLogin');
           alert("Please Login first");
        }
       
    },[])
    return(<div id="banner">
      welcome  {recruiterEmail}
        <img src={banner} id="ban_img"/>
         </div>
    )
}

export default RecruiterHome;