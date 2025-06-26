
import './App.css';
import  logo from './images/faculity_recruit.png';
import './css/style.css';
import Navbar from './components/Navbar.js';
import { Route ,Routes } from 'react-router-dom';
import Home from './components/Home.js';
import CandidateLogin from './components/candidateLogin.js';
import RecruiterLogin from './components/recruiterLogin.js';
import CandidateRegistration from './components/candidateRegistration.js';
import RecruiterRegistration from './components/recruiterRegistration.js';
import AdminLogin from './components/adminLogin.js';
import AdminHome from './components/adminHome.js';
import AdminRecruiterList from './components/adminRecruiterList.js';
import RecruiterHome from './components/recruiterHome.js';
import AddVacancy from './components/addVacancy.js';
import CandidateHome from './components/candidateHome.js';
import CandidateVacancyList from './components/candidateVacancyList.js'
import AppliedCandidateList from './components/appliedCandidateList.js';
import CandidateViewStatus from './components/candidateViewStatus.js';
import AdminCandidateList from './components/adminCandidateList.js';

function App() {
  return (<>
    <div id="header">
    <img src={logo} alt="" id="logo"/>
    <span id="heading">शिक्षक Recruitment System</span>
</div>
         <Navbar/>
         
          <Routes>
               <Route path='/' element={<Home/>}/>
               <Route path='/adminLogin' element={<AdminLogin/>}/>
               <Route path='/adminHome' element={<AdminHome/>}/>
               <Route path='/adminRecruiterList' element={<AdminRecruiterList/>}/>
                <Route path='/adminCandidateList' element={<AdminCandidateList/>}/>
               <Route path='/recruiterLogin' element={<RecruiterLogin/>}/>
               <Route path='/recruiterHome' element={<RecruiterHome/>}/>
               <Route path='/appliedCandidateList' element={<AppliedCandidateList/>}/>
               <Route path='/addVacancy' element={<AddVacancy/>}/>
               <Route path='/vacancyList' element={<CandidateVacancyList/>}/>
               <Route path='/candidateLogin' element={<CandidateLogin/>}/>
               <Route path='/candidateHome' element={<CandidateHome/>}/>
               <Route path='/myStatus' element={<CandidateViewStatus/>}/>
               <Route path='/candidateRegistration' element={<CandidateRegistration/>}/>
               <Route path='/recruiterRegistration' element={<RecruiterRegistration/>}/>  

        </Routes>
         
        
  </>);
}

export default App;
