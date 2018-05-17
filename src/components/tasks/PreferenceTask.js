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
import AskVoter from './preferenceSteps/AskVoter';
import getLastStep from './shared/TaskResult';
import YesNoButtons from './shared/YesNoButtons';
import RadioButtons from '../shared/inputs/RadioButtons';

class PreferenceTask extends TaskBase {
    constructor(props, context) {
        super(props, context);
        const { actions, taskData } = this.props;
        const state = taskData.voter_metaData.state;
        actions.getStateInfo(state);
        this.state = {
            isSuccess: true,
            nextEnabled: false,
            haveContacted: '',
            votingType: ''
        };
    }

    getVotingOptions = () => {
        return [
            { value: 'byMail', label: 'Vote by mail' },
            { value: 'earlyVoting', label: 'Early voting' },
            { value: 'electionDay', label: 'Election day at polling station' }
        ]
    };

    getSubComponent  = () => {
        const {
            taskData: {
                voter_metaData: {
                    firstname = '',
                    lastname = ''
            } } = {},
        } = this.props;

        const {
            haveContacted,
            votingType
        } = this.state;

        if (haveContacted === 'yes') {
            return {
                component: <RadioButtons title='How do they prefer to cast their ballot?'
                                         values={this.getVotingOptions()}
                                         onChange={val => this.setState({ votingType: val })}
                                         value={votingType} />,
                valid: !!votingType
            }
        }
        return {
            component: <YesNoButtons title={` Were you able to speak with ${firstname} ${lastname} about how they want to cast their ballot?`}
                                     value={haveContacted}
                                     onChange={val => {
                                         const isNo = val === 'no';
                                         this.setState({
                                             haveContacted: val,
                                             nextEnabled: true,
                                             isSuccess: !isNo
                                         })
                                     }} />,
            valid: !!haveContacted
        }
    };

    getSteps = () => {
        const {
            taskData: { voter_metaData = {} } = {},
            stateInfo
        } = this.props;
        const {
            isSuccess,
            nextEnabled
        } = this.state;
        const subComponent = this.getSubComponent();
        return [
            { label: 'What to do', component: <WhatToDo voterData={ voter_metaData } stateInfo={stateInfo} />, valid: true },
            { label: 'Ask voter', component: <AskVoter voterData={ voter_metaData } stateInfo={stateInfo} />, valid: true },
            {
                label: 'Have contact',
                component: subComponent.component,
                valid: subComponent.valid,
                nextEnabled
            },
            getLastStep(isSuccess, this.getTaskData() )
        ];
    };

    getTaskData = () => {
        const { taskData = {}} = this.props;
        return { ...this.state, taskid: taskData._id, points: taskData.group_info.value };
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