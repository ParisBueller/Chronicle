import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li className="nav-item"><a className="nav-link" href="/login">Login</a></li>
                );
            default:
                return [
                    <li className="nav-item">
                        <a className="nav-link" href="/projects">Projects</a>
                    </li>,
                    <li className="nav-item">
                        <a className="nav-link" href="/roadmap">Roadmap</a>
                    </li>,
                    <li className="nav-item">
                        <a className="nav-link" href="/api/logout">Logout</a>
                    </li>
                ];               
        }
    }
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-light">
                <Link to={this.props.auth ? '/dashboard' : '/login'} className="navbar-brand">Chronicle</Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>                       
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {this.renderContent()}
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