import { useLocation, useNavigate } from 'react-router-dom';
import banner from '../images/bannner.jpeg';
import '../css/style.css';
import jsCookie from 'js-cookie';
import { useEffect } from 'react';

function CandidateHome(){
    // const location = useLocation();
    const candidateEmail = jsCookie.get('candidateEmail');
    const navigate = useNavigate();

    useEffect(()=>{
        if(candidateEmail)
          navigate('/candidateHome');
        else{
        
           navigate('/candidateLogin');
           alert("Please Login first");
        }
       
    },[])
    return(<div id="banner">
      welcome  {candidateEmail}
        <img src={banner} id="ban_img"/>
         </div>
    )
}

export default CandidateHome;