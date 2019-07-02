import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

const Login = ({ formValues }) => {
        return (
            <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <div className="card card-body">
                        <h1 className="text-center mb-3">Chronicle</h1>
                        <form onSubmit={this.props.handleSubmit()}className="mb-3">
                            <div className="form-group">
                                <label>Email</label>
                                <Field
                                    key="email"
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <Field
                                    key="password"
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                />
                            </div>
                            <button 
                                type="submit" 
                                onClick={() => handleLogin(formValues)}
                                className="btn btn-primary btn-block">Login</button>
                        </form>
                        <a className="btn btn-secondary btn-block" href="/auth/github"><i className="fab fa-github"></i> Login with Github</a>
                        <a className="btn btn-danger btn-block" href="/auth/google"><i className="fab fa-google"> Login with Google</i></a>
                        <p className="text-center lead mt-4">
                            No account? <Link href="/register">Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        )
    };

export default reduxForm({
    validate,
    form: 'login'
})(Login);