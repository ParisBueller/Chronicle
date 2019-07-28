import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import projectFields from './projectFields';
import * as actions from '../../actions';

const ProjectFormReview = ({ onCancel, formValues, submitProject, history }) => {
    const reviewFields = _.map(projectFields,({name, label}) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button type="button" className="btn btn-warning" onClick={onCancel}>Back</button>
            <button onClick={() => submitProject(formValues, history)}type="button" className="btn btn-success">
                Submit Project
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    return { formValues: state.form.projectForm.values};
}

export default connect(mapStateToProps, actions)(withRouter(ProjectFormReview));