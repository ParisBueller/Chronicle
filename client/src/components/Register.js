import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form'; 
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const renderField = ({ input, label, type, meta: { touched, error} }) => (
    <div className="form-group">
        <label>{label}</label>
        <div>
            <input className="form-control" {...input} placeholder={label} type={type} />
            {touched && error && <div className="alert alert-danger text-center mt-1" role="alert">{JSON.stringify(error)}</div>}
        </div>
    </div>
)

const Register = ({error, handleSubmit, submitting, history}) => {
    const validateRegister = values => {
        return axios.post('/api/register', values)
        .then(res => {
            if (res.data.errors) {
                throw new SubmissionError({
                    _error: res.data.errors[0].msg
                })
            } else if (!res.data.errors) {
                history.push('/login');
            }
        })
    }
    return(
        <div className="row mt-5">
            <div className="col-md-6 m-auto">
                <div className="card card-body">
                    <h1 className="text-center mb-3">
                        <i className="mr-2 fas fa-user-plus"></i>
                        Register
                    </h1>
                    <form onSubmit={handleSubmit(validateRegister)} className="mb-3">
                        <Field name="name" type="text" label="Name" component={renderField} />
                        <Field name="email" type="email" label="Email" component={renderField} />
                        <Field name="password" type="password" label="Password" component={renderField} />
                        <Field name="password2" type="password" label="Password" component={renderField} />
                        {error && <div className="alert alert-danger text-center mb-2" role="alert">{JSON.stringify(error)}</div>}
                        <button disabled={submitting} type="submit" className="btn btn-primary btn-block">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default withRouter(reduxForm({
    form:'registerForm',
})(Register));