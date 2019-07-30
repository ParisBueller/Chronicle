import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import authReducer from '../reducers/authReducer';
import projectsReducer from './projectsReducer';

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    projects: projectsReducer
});