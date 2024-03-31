import { combineReducers } from 'redux';
import experienceReducer from '../slices/experienceSlice';
import educationReducer from '../slices/educationSlice';
import languageReducer from '../slices/languageSlice';
import skillReducer from '../slices/skillSlice';
import authReducer from '../slices/authSlice';
import projectReducer from '../slices/projectSlice';

const rootReducer = combineReducers({
  experiences: experienceReducer,
  educations: educationReducer,
  languages: languageReducer,
  skills: skillReducer,
  auth: authReducer,
  projects: projectReducer,
});

export default rootReducer;