import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

import TaskBase from './shared/TaskBase';
import WithTask from '../hocs/Task';
import Stepper from './shared/LetfStepper';
import { getStateInfo } from '../../actions/TaskAction'
import { getTaskData } from "../../helpers/TaskHelper";
import WhatToDo from './preferenceSteps/WhatToDo';

class PreferenceTask extends TaskBase {
    constructor(props, context) {
        super(props, context);
        const { actions, taskData } = this.props;
        const state = taskData.voter_metaData.state;
        actions.getStateInfo(state);
    }

    getSteps = () => {
        const {
            taskData: { voter_metaData = {} } = {},
            stateInfo
        } = this.props;

        return [
            { label: 'What to do', component: <WhatToDo voterData={ voter_metaData } stateInfo={stateInfo} />, valid: true },
        ];
    };

    render() {
        return (
            <div className='btw-task container'>
                { this.renderBackToHome() }
                <Col md={8}>
                    <Stepper steps={this.getSteps()} taskData={this.props.taskData} />
                </Col>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        taskData: getTaskData(state, ownProps),
        stateInfo: state.taskList.stateInfo
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ getStateInfo }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(WithTask(PreferenceTask));