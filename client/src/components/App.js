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
import KeyModal from './keys/KeyModal';
import KeyList from './keys/KeyList'


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
                        <Route exact path="/project/new" component={ProjectNew}/>
                        <Route exact path="/projects/:id" component={Project}/>
                        <Route exact path="/projects/:id/feature" component={FeatureNew}/>
                        <Route exact path="/project/:id/keys" component={KeyList} />
                        <Route exact path="/project/:id/keys/new" component={KeyModal} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App);