import React from 'react';

class Login extends React.Component {
    render() {
        return (
            <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <div className="card card-body">
                        <h1 className="text-center mb-3">Chronicle</h1>
                        <form>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    className="form-control"
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    className="form-control"
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Login</button>
                        </form>
                        <p className="lead mt-4">
                            No account? <a href="/register">Register</a>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
};

export default(Login);