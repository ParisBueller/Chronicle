import axios from 'axios';
import { SubmissionError } from 'redux-form';


export default (values, history) => {
    console.log(values);
        return axios.post('/api/register', values)
        .then(response => {
            if (response.status !== 200) {
                throw new SubmissionError({
                    email: 'User already exists',
                    password: 'Passwords do not match',
                    _error: 'Registration failed!'
                })
            } else {
                window.alert('User Registered!');
            }
        })
    }