import React from 'react';
import { connect } from 'react-redux';

import { fetchProjects } from '../actions';

class Dashboard extends React.Component {
    componentDidMount() {
        this.props.fetchProjects();
    }

    renderProjects() {
        return this.props.projects.reverse().map(project => {
            return(
                <div className="card mb-3" key={project._id}>
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <i className="fas fa-project-diagram"></i>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{project.name}</h5>
                                <p className="card-text">{project.description}</p>
                                <p className="card-text"><a className="text-muted" href={project.repo}></a></p>
                                <p className="card-text"><small className="text-muted">Created on {new Date(project.dateCreated).toLocaleDateString()}</small></p>                           
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }
    render() {
        return(
            <div>{this.renderProjects}</div>
        );
    }
}

function mapStateToProps({ projects }) {
    return { projects };
}


export default connect(mapStateToProps, { fetchProjects })(Dashboard);