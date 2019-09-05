import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Project extends React.Component {
    state = {projectId: this.props.match.params.id, features:[]};
    componentDidMount() {
            return axios.get(`/api/features/${this.state.projectId}`)
            .then(res => {
            this.setState({features: res.data });
        })
    }

     deleteFeature(id, projectId) {
        if (window.confirm('Are you sure you want to delete this feature?')) {
            axios.delete(`/api/features/${id}`)
            return axios.get(`/api/features/${projectId}`)
            .then(res => {
            this.setState({ features: res.data });
        })
        }
    }

     updateFeature (featureId, projectId) {
        if (window.confirm('Change this features status to complete?')) {
            axios.post(`/api/features/${featureId}`, { projectId })
            .then( res => {
                this.setState({ features: res.data });
            })
        }
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
                        onClick={()=>{this.deleteFeature(feature._id, this.state.projectId)}}
                        className="btn float-right">
                        <i className="far fa-trash-alt"></i>
                    </button>
                    <button
                        type="submit" 
                        onClick={()=>{this.updateFeature(feature._id, this.state.projectId)}}
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
    renderCompleteFeatures() {
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
                        onClick={()=>{this.deleteFeature(feature._id, this.state.projectId)}}
                        className="btn float-right">
                        <i className="far fa-trash-alt"></i>
                    </button>
                    <button
                        type="submit" 
                        onClick={()=>{this.updateFeature(feature._id, this.state.projectId)}}
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
                <h2 className="features">Current Features</h2>
                    {this.renderFeatures() }   
                </ul>
                {this.state.features.filter((f)=>f.complete).length > 0 &&
                    <ul className="list-group mt-5">
                    <h2 className="features">Complete Features</h2>
                        {this.renderCompleteFeatures()}   
                    </ul>
                }
                <Link className="float-right mt-5 btn btn-success" to={`/projects/${this.state.projectId}/feature`} >Add Feature</Link>
            </div>
        )
    }
}

export default Project;
