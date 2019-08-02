import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div className="form-group">
        <label>{label}</label>
        <div>
            <input className="form-control" {...input} placeholder={label} type={type} />
            {touched && error && <div className="alert alert-danger text-center mt-1" role="alert">{JSON.stringify(error)}></div>}
        </div>
    </div>
)

const Modal = ({ error }) => {
    
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
                        <Field name="name" type="text" component={renderField} label="Feature"placeholder="Feature Name"/>
                        <Field name="designation" type="text" component={renderField} label="Designation"placeholder="i.e. frontend, backend, database" />
                    </div>
                    <div className="modal-footer">
                        <Link to="/projects/:id"type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</Link>
                        <button type="button" className="btn btn-success">Add</button>
                        {error && <div className="alert alert-danger text-center mb-2" role="alert">{JSON.stringify(error)}</div>}
                    </div>
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default reduxForm({
    form: 'featureNew'
})(Modal);