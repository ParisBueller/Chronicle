import axios from 'axios';
import { SubmissionError } from 'redux-form';


export default values => {
    console.log(values);
    return axios.post('/api/register', values)
    .then(res => {
        console.log(res.data);
        if (res.data.errors) {
            throw new SubmissionError({
                _error: res.data.errors[0].msg
            })
        } else if (!res.data.errors) {
            window.alert('You are Now Registered!');
        }
    })
}