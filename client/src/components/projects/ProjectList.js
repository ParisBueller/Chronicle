import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import  { fetchProjects } from '../../actions';
import axios from 'axios';

const deleteProject = (id) => {
    if (window.confirm('Are you sure you want to Delete this Project?')) {
        axios.delete(`/api/projects/${id}`)
        return this.props.fetchProjects();
    }
}

class ProjectList extends React.Component {
    componentDidMount() {
        this.props.fetchProjects();
    }
    renderProjects() {
        return this.props.projects.reverse().map(project => {
            let projectLink = `/projects/${project._id}`;
            return(               
                <div key={project._id} className="card mb-3" >
                    <div className="row no-gutters">
                        <div className="m-auto col-md-4">
                            <i className="ml-5 fas fa-project-diagram fa-3x"></i>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <Link to={projectLink} className="text-dark">
                                    <h5 className="card-title">{project.name}</h5>
                                </Link>
                                <p className="card-text">{project.description}</p>
                                <a href={project.repo}className="card-text text-reset">{project.repo}</a>
                                <p className="card-text"><small className="text-muted">Created on {new Date(project.dateCreated).toLocaleDateString()}</small></p>
                                <button onClick={()=>{deleteProject(project._id)}} className="btn float-right"><i className="far fa-trash-alt"></i></button>                           
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        return(
            <div className="mt-5">{this.renderProjects()}</div>
        );
    }
}

function mapStateToProps({ projects }) {
    return { projects };
}

export default connect(mapStateToProps, { fetchProjects })(ProjectList);
