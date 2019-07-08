import axios from 'axios';
import { SubmissionError } from 'redux-form';

import * as actions from '../actions';

export default (values, history) => {
console.log(values);
    return axios.post('/api/login', values)
    .then(response => {
        if (response.status === 200) {
            throw new SubmissionError({
                email: 'User does not exist',
                password: 'Password is incorrect',
                _error: 'Login failed!'
            })
        } else {
            actions.fetchUser();
            history.push('/dashboard')
        }
    })
}