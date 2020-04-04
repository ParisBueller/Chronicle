import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom'
import axios from 'axios';

const renderField = ({ input, label, type, placeholder,meta: { touched, error } }) => (
    <div className="form-group">
        <label>{label}</label>
        <div>
            <input className="form-control" {...input} type={type} placeholder={placeholder}/>
            {touched && error && <div className="alert alert-danger text-center mt-1" role="alert">{JSON.stringify(error)}></div>}
        </div>
    </div>
)

const KeyModal = ({ error, handleSubmit, match, history }) => {
    // const projectId = match.params.id;
    const submitKey = values  => {
        return axios.post('/api/keys',{ 
            name: values.name, 
            key: values.key, 
            projectId: match.params.id
        })
        .then( res => {
            console.log(res);
            history.push('/dashboard');
        })
    }    
    return ReactDOM.createPortal(
        <div className="modal-fade">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add a Project Key</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <Field name="name" type="text" component={renderField} label="Name"placeholder="Key Name"/>
                            <Field name="key" type="text" component={renderField} label="Key" placeholder="Key" />
                        </form>
                    </div>
                    <div className="modal-footer">
                        <Link to='/dashboard' type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</Link>
                        <button onClick={handleSubmit(submitKey)}type="submit" className="btn btn-success">Add</button>
                        {error && <div className="alert alert-danger text-center mb-2" role="alert">{JSON.stringify(error)}</div>}
                    </div>
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
};


export default withRouter(reduxForm({
    form: 'keyNewForm'
})(KeyModal));