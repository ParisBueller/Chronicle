import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { fetchKeys } from '../../actions';

class KeyList extends React.Component {
    state= { projectId: this.props.match.params.id, keys: []}
    componentDidMount() { 
        return axios.get(`/api/keys/${this.state.projectId}`)
        .then(res => {
            this.setState({ keys: res.data});
            console.log(res.data)
        });
    }

    deleteKey(id, projectId) {
        if (window.confirm('Are you sure you want to delete this key?')) {
            axios.delete(`/api/keys/${id}`)
            return axios.get(`/api/keys/${projectId}`)
            .then(res => {
            this.setState({ keys: res.data });
        })
        }
    }

    renderKeys() {
        if(this.state.keys == null) {
            return(
                <div className="lds-ripple-container">
                    <div className="lds-ripple"><div></div><div></div></div> 
                </div> 
            );
        }
        const keys = this.state.keys;
        return keys.reverse().map(key => {
            return(
                <li key={key._id} id="key-list" className=" list-group-item"> <i className="fas fa-key mr-2"></i>{key.name}
                <p className="mt-3 text-muted">  {key.key}</p>
                <button
                    type="submit" 
                    onClick={()=>{this.deleteKey(key._id, this.state.projectId)}}
                    className="btn float-right">
                    <i className="far fa-trash-alt"></i>
                </button>
            </li> 
            )
        })
    }

    render() {
        return(
            <div>
                <ul className="list-group mt-5">
                <h2 className="config-variables">Config Variables</h2>
                    {this.renderKeys() }   
                </ul>
                 <Link className="float-right mt-5 btn btn-success" to={`/project/${this.state.projectId}/keys/new`} >Add Key</Link>
            </div>
        )
    }
}

function mapStateToProps({ keys }) {
    return { keys };
}

export default connect(mapStateToProps, { fetchKeys })(KeyList);