import React from 'react';
import { Link } from 'react-router-dom';


class Project extends React.Component {
    state = {projectId: this.props.match.params.id};
    
    render() {
        console.log(this.state);
        const projectFeatureURL = `/projects/${this.state.projectId}/feature`;
        return(
            <div>
                <Link className="btn btn-success" to={projectFeatureURL} >Add Feature</Link>
            </div>
        )
    }
}


export default Project;