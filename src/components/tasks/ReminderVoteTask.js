import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux'

import TaskBase from './shared/TaskBase';
import WithTask from '../hocs/Task';
import Stepper from './shared/LetfStepper';
import { getTaskData } from "../../helpers/TaskHelper";
import WhatToDo from './reminderVoteSteps/WhatToDo';
import TaskSuccess from './shared/TaskSuccess';
import YesNoButtons from './shared/YesNoButtons';
import routes from '../../constants/Routes';
import InformationSection from './shared/InformationSection';
import ContentLayout from '../layout/ContentLayout';
import BottomButtons from './shared/BottomButtons';

const subSteps = {
    haveRemind: 'haveRemind'
};

class ReminderVoteTask extends TaskBase {
    constructor(props, context) {
        super(props, context);
        this.state = {
            subComponent: subSteps.haveRemind,
            nextEnabled: false,
            haveRemind: ''
        };
    }

    getSubComponent  = () => {
        const {
            taskData: {
                voter_metaData: {
                    firstname = '',
                    lastname = ''
                } } = {},
        } = this.props;

        const {
            subComponent,
            haveRemind,
        } = this.state;

        switch (subComponent) {
            case subSteps.haveRemind: {
                return {
                    component: <YesNoButtons title={`Did you remind ${firstname} ${lastname}  to mail in their ballot?`}
                                             value={haveRemind}
                                             onChange={val => this.setState({ haveRemind: val, nextEnabled: true })} />,
                    onNext: () => {
                        if (haveRemind === 'no') {
                            this.onLink(routes.tasksList);
                        }
                    },
                    valid: !!haveRemind
                }
            }
        }
    };

    getSteps = () => {
        const {
            taskData: { voter_metaData = {} } = {},
            stateInfo
        } = this.props;
        const {
            nextEnabled
        } = this.state;

        const subComponent = this.getSubComponent();

        return [
            { label: 'What to do', component: <WhatToDo voterData={ voter_metaData } stateInfo={stateInfo} />, valid: true },
            {
                label: 'Have contact',
                component: subComponent.component,
                valid: subComponent.valid,
                onNext: subComponent.onNext,
                nextEnabled
            },
            { label: 'Success',
                component: <TaskSuccess data={this.getTaskData()}/>,
                valid: true
            }
        ];
    };

    getTaskData = () => {
        const { taskData = {}} = this.props;
        return { taskid: taskData._id, points: taskData.group_info.value };
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
            <ContentLayout>
                <div className='btw-task container'>
                    <Col md={8}>
                        <Stepper steps={this.getSteps()} taskData={this.props.taskData} />
                    </Col>
                    <InformationSection taskData={this.props.taskData} />
                    <BottomButtons taskData={this.props.taskData} />
                </div>
            </ContentLayout>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        taskData: getTaskData(state, ownProps),
        stateInfo: state.taskList.stateInfo || {},
        tasks: state.taskList.tasks
    }
};

export default connect(mapStateToProps)(WithTask(ReminderVoteTask));