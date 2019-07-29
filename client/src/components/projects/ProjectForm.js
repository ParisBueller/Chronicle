import _ from 'lodash';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import ProjectField from './ProjectField';
import projectFields from './projectFields';

class ProjectForm extends React.Component {
    renderFields() {
        return _.map(projectFields, ({ label, name}) => {
            return(
                <Field
                    key={name}
                    component={ProjectField}
                    type="text"
                    label={label}
                    name={name}
                />
            );
        });
    }

    render() {
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onProjectSubmit)}>
                    {this.renderFields()}
                        <Link to="/dashboard" type="button" className="btn btn-danger">
                            Cancel
                        </Link>
                        <button type="submit" className="float-right btn btn-success"><i className="fas fa-check"></i></button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    _.each(projectFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = 'You must provide a value'
        }
    });
    return errors;
}

export default reduxForm({
    validate,
    form: 'projectForm',
    destroyOnUnmount: false
})(ProjectForm);