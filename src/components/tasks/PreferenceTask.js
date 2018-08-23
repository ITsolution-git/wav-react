import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux'

import TaskBase from './shared/TaskBase';
import WithTask from '../hocs/Task';
import Stepper from './shared/LetfStepper';
import { getTaskData } from "../../helpers/TaskHelper";
import WhatToDo from './preferenceSteps/WhatToDo';
import AskVoter from './preferenceSteps/AskVoter';
import getLastStep from './shared/TaskResult';
import YesNoButtons from './shared/YesNoButtons';
import RadioButtons from '../shared/inputs/RadioButtons';
import InformationSection from './shared/InformationSection';

const votingTypes = {
    byMail: 'byMail',
    earlyVoting: 'earlyVoting',
    electionDay: 'electionDay'
};

class PreferenceTask extends TaskBase {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isSuccess: true,
            nextEnabled: false,
            haveContacted: '',
            votingType: ''
        };
    }

    getVotingOptions = () => {
        return [
            { value: votingTypes.byMail, label: 'Vote by mail' },
            { value: votingTypes.earlyVoting, label: 'Early voting' },
            { value: votingTypes.electionDay, label: 'Election day at polling station' }
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
        const { votingType } = this.state;
        return {
            voting_preferences: {
              mail: votingType === votingTypes.byMail,
              earlyVoting: votingType === votingTypes.earlyVoting,
              inPerson: votingTypes === votingTypes.electionDay
            },
            taskid: taskData._id,
            points: taskData.group_info.value
        };
    };

    render() {

        if (!this.props.taskData && this.props.tasks.length === 0) {
            return ''
        } 
        
        if (!this.props.taskData && this.props.tasks.length > 0) {
            this.props.history.push('/errorPages/No_Task')
            return ''
        }

        return (
            <div className='btw-task container'>
                { this.renderBackToHome() }
                <Col md={8}>
                    <Stepper steps={this.getSteps()} taskData={this.props.taskData} />
                </Col>
                <InformationSection taskData={this.props.taskData} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        taskData: getTaskData(state, ownProps),
        stateInfo: state.taskList.stateInfo,
        tasks: state.taskList.tasks
    }
};

export default connect(mapStateToProps)(WithTask(PreferenceTask));