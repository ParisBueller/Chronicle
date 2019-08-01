import React from 'react';
import { connect } from 'react-redux';

import { fetchUser } from '../actions/index';
import ProjectList from './projects/ProjectList';

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        return(
            <ProjectList />
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, { fetchUser})(Dashboard);