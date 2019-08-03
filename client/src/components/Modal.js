import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom'

import { submitFeature } from '../actions/index';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div className="form-group">
        <label>{label}</label>
        <div>
            <input className="form-control" {...input} placeholder={label} type={type} />
            {touched && error && <div className="alert alert-danger text-center mt-1" role="alert">{JSON.stringify(error)}></div>}
        </div>
    </div>
)

const Modal = ({ error, handleSubmit }) => {
    function dispatchSubmitFeature(values, dispatch, history) {
        return dispatch(submitFeature(values, history));
    }

    return ReactDOM.createPortal(
        <div className="modal-fade">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add a feature</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form >
                            <Field name="name" type="text" component={renderField} label="Feature"placeholder="Feature Name"/>
                            <Field name="designation" type="text" component={renderField} label="Designation"placeholder="i.e. frontend, backend, database" />
                        </form>
                    </div>
                    <div className="modal-footer">
                        <Link to="/projects/:id"type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</Link>
                        <button onClick={handleSubmit(dispatchSubmitFeature)}type="submit" className="btn btn-success">Add</button>
                        {error && <div className="alert alert-danger text-center mb-2" role="alert">{JSON.stringify(error)}</div>}
                    </div>
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
};



export default withRouter(reduxForm({
    form: 'featureNewForm'
})(Modal));