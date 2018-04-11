import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

import Stepper from './shared/LetfStepper';
import TaskBase from './shared/TaskBase';
import ContactType from './registerSteps/ContactType';
import ReportBack from './registerSteps/ReportBack';
import TaskSuccess from './shared/TaskSuccess';

class RegisterVoterTask extends TaskBase {
    getSteps = () => {
        return [
            { label: 'Register', component: <ContactType /> },
            { label: 'Report back', component: <ReportBack /> },
            { label: 'Success', component: <TaskSuccess /> }
        ];
    };

    render() {
        return (
            <div className='btw-task container'>
                <Stepper steps={this.getSteps()} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterVoterTask));