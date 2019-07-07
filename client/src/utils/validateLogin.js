import axios from 'axios';
import { SubmissionError } from 'redux-form';

import * as actions from '../actions';

export default values => {
console.log(values);
    return axios.post('/api/login', values)
    .then(response => {
        console.log(response.data);
    })
}