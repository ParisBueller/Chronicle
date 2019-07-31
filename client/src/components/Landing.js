import React from 'react';
import { connect } from 'react-redux';

import Dashboard from './Dashboard';

class Landing extends React.Component {
    renderContent() {
        if (this.props.auth === false) {
            return (
                <div id="landing" className="row mt-5" >
                    <div className="col md-6 m-auto">
                        <h1 className="text-center">Chronicle</h1>
                        <p id="landing-subtext" className="text-center">Plan. Track. Build</p>
                    </div>                   
                </div>
            )
        } else {
            
        return (
            <Dashboard />
            );
        }

    }
    render() {
        return(
            <div>{this.renderContent()}</div>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Landing);