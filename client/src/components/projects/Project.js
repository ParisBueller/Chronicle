import React from 'react';
import { connect } from 'react-redux';

import { fetchFeatures } from '../../actions/index';

class Project extends React.Component {
    componentDidMount() {
        this.props.fetchFeatures();
    }
    render() {
        return(
            <div>Project</div>
        )
    }
}

function mapStateToProps({ features }) {
    return { features };
}

export default connect(mapStateToProps, {fetchFeatures})(Project);