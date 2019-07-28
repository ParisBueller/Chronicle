import React from 'react';
import { reduxForm } from 'redux-form'

import ProjectForm from './ProjectForm';
import ProjectFormReview from './ProjectFormReview';

class ProjectNew extends React.Component {
    state = { showFormReview: false };

    renderContent() {
        if (this.state.showFormReview) {
            return <ProjectFormReview
                onCancel={() => this.setState({ showFormReview: false })}
                />;
        }

        return (
            <ProjectForm
                onProjectSubmit={() => this.setState({ showFormReview: true })}
            />
        );
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    form: 'projectForm'
})(ProjectNew);