import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Project extends React.Component {
    state = {projectId: this.props.match.params.id, features:null};
    componentDidMount() {
            return axios.get(`/api/features/${this.state.projectId}`)
            .then(res => {
            this.setState({ features: res.data });
        })
    }
    
    renderFeatures() {
        if (this.state.features == null) {
            return (
                <div className="lds-ripple-container">
                    <div className="lds-ripple"><div></div><div></div></div> 
                </div>                               
            )
        }
        const features = this.state.features;
        return features.reverse().map(feature => {
            const deleteFeature = () => {
                if (window.confirm('Are you sure you want to delete this feature?')) {
                    axios.delete(`/api/features/${feature._id}`)
                    return axios.get(`/api/features/${this.state.projectId}`)
                    .then(res => {
                    this.setState({ features: res.data });
                })
                }
            }
            const updateFeature = () => {
                if (window.confirm('Change the status of this feature?')) {
                    axios.put(`/api/features/${feature._id}`)
                }
            }
            return(
                <li key={feature._id} id="feature-list" className="list-group-item"> Name: {feature.name} 
                    <p id="feature-list" className="text-muted mt-3"> Designation: {feature.designation}</p>
                    <button
                        type="submit" 
                        onClick={(deleteFeature)} 
                        className="btn float-right">
                        <i className="far fa-trash-alt"></i>
                    </button>
                    <button
                        type="submit" 
                        onClick={(updateFeature)}
                        className="btn float-right">
                        <i className="fas fa-check"></i>
                    </button>
                </li>               
            );  
        });        
    }
  
    render() {       
        const projectFeatureURL = `/projects/${this.state.projectId}/feature`;
        return(
            <div>
                <ul className="list-group mt-5">
                    {this.renderFeatures() }   
                </ul>
                <Link className="float-right mt-5 btn btn-success" to={projectFeatureURL} >Add Feature</Link>
            </div>
        )
    }
}

export default Project;