import React from 'react';
import { Field, reduxForm } from 'redux-form'; 
import { withRouter } from 'react-router-dom';

import validateRegister from '../utils/validateRegister';

const renderField = ({ input, label, type, meta: { touched, error} }) => (
    <div className="form-group">
        <label>{label}</label>
        <div>
            <input className="form-control" {...input} placeholder={label} type={type} />
            {touched && error && <span>{error}</span>}
        </div>
    </div>
)

const Register = ({error, handleSubmit, submitting}) => {
    return(
        <div className="row mt-5">
            <div className="col-md-6 m-auto">
                <div className="card card-body">
                    <h1 className="text-center mb-3">
                        <i className="fas fa-user-plus"></i>
                        Register
                    </h1>
                    <form onSubmit={handleSubmit(validateRegister)} className="mb-3">
                        <Field name="name" type="text" label="Name" component={renderField} />
                        <Field name="email" type="email" label="Email" component={renderField} />
                        <Field name="password" type="password" label="Password" component={renderField} />
                        <Field name="password2" type="password" label="Password" component={renderField} />
                        <button disabled={submitting} type="submit" className="btn btn-primary btn-block">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default reduxForm({
    form:'registerForm'
})(withRouter(Register));