import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



class Project extends React.Component {
    state = {projectId: this.props.match.params.id};
    componentDidMount() {
        console.log(this.state);
            return axios.get(`/api/features/${this.state.projectId}`)
            .then(res => {
            console.log(res.data);
            })
    }    
    
    render() {
        
        const projectFeatureURL = `/projects/${this.state.projectId}/feature`;
        return(
            <div>
                <Link className="btn btn-success" to={projectFeatureURL} >Add Feature</Link>
            </div>
        )
    }
}


export default Project;