import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux'; 

import * as actions from '../actions';
import Login  from './Login';
import Register from './Register';
import Dashboard from './Dashboard';



class App extends React.Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div className="container">
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/dashboard" component={Dashboard}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App);