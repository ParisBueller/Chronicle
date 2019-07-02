import React from 'react';
import { Link } from 'react-router-dom';

import * as actions from '../actions';

const Login = ({ formValues, loginUser }) => {
        return (
            <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <div className="card card-body">
                        <h1 className="text-center mb-3">Chronicle</h1>
                        <form className="mb-3">
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    key="email"
                                    className="form-control"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    key="password"
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                />
                            </div>
                            <button
                                onClick={() => loginUser(formValues)} 
                                type="submit"
                                className="btn btn-primary btn-block">Log In</button>
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

    // function mapStateToProps(state) {
    //     return { formValues: state.form.login.values};
    // }

export default connect(actions)(Login);