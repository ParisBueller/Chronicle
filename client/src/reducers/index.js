import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import authReducer from './authReducer';
import projectsReducer from './projectsReducer';
import featuresReducer from './featuresReducer';
import keysReducer from './keysReducer';

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    projects: projectsReducer,
    features: featuresReducer,
    keys: keysReducer
});