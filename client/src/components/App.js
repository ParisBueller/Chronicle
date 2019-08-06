import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux'; 

import * as actions from '../actions';
import Login  from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Navbar from './Navbar';
import ProjectNew from './projects/ProjectNew';
import Landing from './Landing';
import Project from './projects/Project';
import FeatureNew from './features/FeatureNew';


class App extends React.Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div className="container">
                        <Navbar />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/dashboard" component={Dashboard}/>
                        <Route exact path="/" component={Landing}/>
                        <Route path="/projects/new" component={ProjectNew}/>
                        <Route path="/projects/:id" component={Project}/>
                        <Route path="/projects/:id/feature" component={FeatureNew}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App);