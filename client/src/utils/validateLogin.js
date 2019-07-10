import axios from 'axios';
import { SubmissionError } from 'redux-form';

export default values => {
console.log(values);
    return axios.post('/api/login', values)
    .then(response => {
        console.log(response.body);
        if (response.status === 200) {
            throw new SubmissionError({
                email: 'User does not exist',
                password: 'Password is incorrect',
                _error: 'Login failed!'
            })
        } else {
            window.alert('Log In successful!');
        }
    })
}