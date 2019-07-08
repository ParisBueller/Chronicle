import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import validateLogin from '../utils/validateLogin';

const renderField = ({ input, label, type, meta: { touched, error} }) => (
    <div className="form-group">
        <label>{label}</label>
        <div>
            <input className="form-control" {...input} placeholder={label} type={type} />
        </div>
    </div>
)

const Login = ({ handleSubmit, submitting }) => {
        return (
            <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <div className="card card-body">
                        <h1 className="text-center mb-3">Chronicle</h1>
                        <form onSubmit={handleSubmit(validateLogin)} className="mb-3">
                            <Field name="email" type="text" component={renderField} label="Email"/>
                            <Field name="password" type="password" component={renderField} label="Password"/>
                            <button disabled={submitting} type="submit" className="btn btn-primary btn-block">Log In</button>
                        </form>
                        <a className="btn btn-secondary btn-block" href="/auth/github"><i className="fab fa-github"></i> Log In with Github</a>
                        <a className="btn btn-danger btn-block" href="/auth/google"><i className="fab fa-google"> Log In with Google</i></a>
                        <p className="text-center lead mt-4">
                            No account? <Link href="/register">Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        )
    };


export default reduxForm({
    form: 'loginForm'
})(Login);