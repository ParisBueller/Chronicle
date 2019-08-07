import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



class Project extends React.Component {
    state = {projectId: this.props.match.params.id, features:null};
    componentDidMount() {
        console.log(this.state);
            return axios.get(`/api/features/${this.state.projectId}`)
            .then(res => {
            console.log(res.data);
            this.setState({ features: res.data });
            console.log(this.state);
        })
    }
    
    renderFeatures() {
        if (this.state.features == null) {
            return (
                <div className="lds-ripple m-auto"><div></div><div></div></div>
            )
        }
        const features = this.state.features;
        return features.reverse().map(feature => {
            console.log(feature);
            return(
                <li className="list-group-item">{feature.name}</li>
            );
        });
    }
    
    render() {       
        const projectFeatureURL = `/projects/${this.state.projectId}/feature`;
        return(
            <div>
                <ul className="list-group">
                    {this.renderFeatures()}   
                </ul>
                <Link className="btn btn-success" to={projectFeatureURL} >Add Feature</Link>
            </div>
        )
    }
}


export default Project;