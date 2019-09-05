import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const deleteFeature = (featureId, projectId) => {
    if (window.confirm('Are you sure you want to delete this feature?')) {
        axios.delete(`/api/features/${feature._id}`)
        return axios.get(`/api/features/${this.state.projectId}`)
        .then(res => {
        this.setState({ features: res.data });
    })
    }
}
const updateFeature = (featureId) => {
    if (window.confirm('Change this features status to complete?')) {
        axios.put(`/api/features/${featureId}`)
    }
}

class Project extends React.Component {
    state = {projectId: this.props.match.params.id, features:null};
    const projectFeatureURL = `/projects/${this.state.projectId}/feature`
    componentDidMount() {
            return axios.get(`/api/features/${this.state.projectId}`)
            .then(res => {
            this.setState({features: res.data });
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
        return features.filter((f)=>!f.complete).reverse().map(feature => {
            return(
                <li key={feature._id} id="feature-list" className="list-group-item"> Name: {feature.name} 
                    <p id="feature-list" className="text-muted mt-3"> Designation: {feature.designation}</p>
                    <button
                        type="submit" 
                        onClick={()=>{deleteFeature(feature._id, this.state.projectId)}}
                        className="btn float-right">
                        <i className="far fa-trash-alt"></i>
                    </button>
                    <button
                        type="submit" 
                        onClick={()=>{updateFeature(feature._id)}}
                        className="btn float-right">
                        <i className="fas fa-check"></i>
                    </button>
                    Status: 
                    { feature.toDo ? <span className="badge-pill badge-warning ml-2"><i className="fas fa-clipboard"></i></span>
                    : <span className="badge-pill badge-success ml-2"><i className="fas fa-clipboard-check"></i></span>}
                </li>               
            );  
        });        
    }
    renderCompletedFeatures() {
        if (this.state.features == null) {
            return (
                <div className="lds-ripple-container">
                    <div className="lds-ripple"><div></div><div></div></div> 
                </div>                               
            )
        }
        const features = this.state.features;
        return features.filter((f)=>f.complete).reverse().map(feature => {
            return(
                <li key={feature._id} id="feature-list" className="list-group-item"> Name: {feature.name} 
                    <p id="feature-list" className="text-muted mt-3"> Designation: {feature.designation}</p>
                    <button
                        type="submit" 
                        onClick={()=>{deleteFeature(feature._id, this.state.projectId)}}
                        className="btn float-right">
                        <i className="far fa-trash-alt"></i>
                    </button>
                    <button
                        type="submit" 
                        onClick={()=>{updateFeature(feature._id)}}
                        className="btn float-right">
                        <i className="fas fa-check"></i>
                    </button>
                    Status: 
                    { feature.toDo ? <span className="badge-pill badge-warning ml-2"><i className="fas fa-clipboard"></i></span>
                    : <span className="badge-pill badge-success ml-2"><i className="fas fa-clipboard-check"></i></span>}
                </li>               
            );  
        });        
    }
    
  
    render() {       
        return(
            <div>
                <ul className="list-group mt-5">
                <h2>Current Features</h2>
                    {this.renderFeatures() }   
                </ul>
                {this.state.features.filter((f)=>f.complete).length > 0 &&
                    <ul className="list-group mt-5">
                    <h2>Complete Features</h2>
                        {this.renderCompleteFeatures()}   
                    </ul>
                }
                <Link className="float-right mt-5 btn btn-success" to={projectFeatureURL} >Add Feature</Link>
            </div>
        )
    }
}

export default Project;
