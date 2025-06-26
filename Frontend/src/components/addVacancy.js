import { use, useState } from "react";
import { addVacancy, setMessage } from "../store/vacancySlice.js";
import { useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";


function AddVacancy(){
    var message = useSelector(state=>state.vacancySlice.message);
        console.log("state:",message);
        
    const [vacancy,setVacancy] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getData = (event)=>{
        const {name,value} = event.target;
        setVacancy({
                  ...vacancy,
                  [name]:value
        })
    }

    const handleSubmit = async(event)=>{
              event.preventDefault();
               const obj = await addVacancy(vacancy);
               console.log("object:",obj);
       
         if(obj.status==200){
           
             dispatch(setMessage(obj.data.message));
          
              navigate('/addVacancy');
         }else{
             navigate('/recruiterLogin');
         }
         event.target.reset();
      }
 

    return(<>
               

<center>
    {/* /vacancy/addVacancy */}
    <form action="" method="post" onSubmit={handleSubmit}>
<table>
    <caption>
        <h2>Add Vacancy</h2>
        <h3 style={{color:"red"}}>{message}</h3>
     
    </caption>
    <tr>
        <td>
            <label>Post</label>
        </td>
        <td>
            <input type="text" placeholder="Enter Post" id="Post" name="post" className="input" onChange={getData}/>
        </td>
    </tr>
    <tr>
        <td>
            <label>Subject</label>
        </td>
        <td>
            <select name="subject" id="subject" className="input" onChange={getData}>
                <option value="">Select Subject</option>
                <option value="Maths">Maths</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
            </select>
        </td>
    </tr>
    <tr>
        <td>
            <label>Location</label>
        </td>
        <td>
            <input type="text" placeholder="Enter Location" id="location" name="location" className="input" onChange={getData}/>
        </td>
    </tr>
    <tr>
        <td>
            <label>Subject</label>
        </td>
        <td>
            <select name="criteria" id="criteria" className="input"onChange={getData}>
                <option value="">Select criteria</option>
                <option value="Graduate">Graduate</option>
                <option value="Post Graduate">Post Graduate</option>
                <option value="P.hd">P.hd</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
            </select>
        </td>
    </tr>
    <tr>
        <td><label>Experirence</label></td>
        <td>
            <select name="experience" className="input" onChange={getData}>
            <option value="">Select Experience</option>
            <option value="Fresher">Fresher</option>
            <option value="1+ Year">1+ Year</option>
            <option value="2+ Year">2+ Year</option>
            <option value="3+ Year">3+ Year</option>
            <option value="5+ Year">5+ Year</option>
            <option value="10+ Year">10+ Year</option>
          </select>
        </td>
    </tr>
    <tr>
        <td><label>Mode</label></td>
        <td>
            <select name="mode" className="input" onChange={getData}>
                <option value="">Select mode</option>
                <option value="PartTime">PartTime</option>
                <option value="FullTime">FullTime</option>        
            </select> 
        </td>
    </tr>
    <tr>
        <td><label>Vacancy</label></td>
        <td>
            <input type="number" step="1" min="0" max="1000" placeholder="Enter no. of vacancy" className="input" name="vacancy" onChange={getData}/>
        </td>
    </tr>
    <tr>
        <td><label>Salary</label></td>
        <td> 
            <input type="number"placeholder="Enter Salary" className="input" name="salary" onChange={getData}/>
        </td>
    </tr>
    <tr>
        <td><label>Adv.Date</label></td>
        <td>
            <input type="date" id="date" name="advDate" className="input" onChange={getData}/>
        </td>
    </tr>
    <tr>
        <td><label>Last Date</label></td>
        <td>
            <input type="date" id="date" name="lastDate" className="input" onChange={getData}/>
        </td>
    </tr>
    
   
   
    <tr>
        <td></td>
        <td>
            <input type="submit" value="Add Vacancy" className="inputbtn"/> <br/>
            <input type="reset" value="Reset" className="inputbtn"/>
        </td>
    </tr>
</table>
</form>
</center>
    
    </>)
}

export default AddVacancy;