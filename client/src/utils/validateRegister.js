import React from 'react';
import axios from 'axios';
import { SubmissionError } from 'redux-form';


export default values => {
    console.log(values);
    return axios.post('/api/register', values)
    .then(res => {
        console.log(res.data);
        if (res.data.errors === 0) {
            window.alert(<div className="alert alert-success">User registered Successfully!</div>)
            res.redirect('/login');
        }
        else if (res.data.errors[0].existingUser) {
            throw new SubmissionError({
                email: res.data.errors[0].existingUser,
                _error: 'Login Failed'
            })
            }
        })
        // if (res.data.errors[0].blankFields) {
        //     throw new SubmissionError({
        //         _error: res.data.errors[0].blankFields
        //     })
        // }
        // if (res.data.errors[0].nonMatchPass) {
        //     throw new SubmissionError({
        //         password: res.data.errors[0].nonMatchPass,
        //         _error: 'Login Failed'
        //     })
        // }
        // if (res.data.errors[0].passTooShort) {
        //     throw new SubmissionError({
        //         password: res.data.errors[0].passTooShort,
        //         _error: 'Login Failed'
        //     })
        // }

}