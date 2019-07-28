import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-light">
                <Link to='/' className="navbar-brand">Chronicle</Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#navbar" 
                    aria-controls="navbar" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>                       
                </button>
                <div className="collapse navbar-collapse" id="navbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/projects">Projects</a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link" href="/roadmap">Roadmap</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                                <a className="nav-link" href="/api/logout">Logout</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps ({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Navbar);