import { configureStore } from "@reduxjs/toolkit";
import recruiterSlice from "./recruiterSlice.js";
import commonSlice from './commonSlice.js';
import vacancySlice from './vacancySlice.js';
import adminSlice from './adminSlice.js';
import candidateSlice from './candidateSlice.js';
import appliedVacancySlice from './appliedVacancySlice.js'
export default configureStore ({
    reducer :{
        recruiter : recruiterSlice,
        commonSlice : commonSlice,
        adminSlice : adminSlice,
        vacancySlice : vacancySlice ,
        candidateSlice:candidateSlice ,
        appliedVacancySlice : appliedVacancySlice
    }
});