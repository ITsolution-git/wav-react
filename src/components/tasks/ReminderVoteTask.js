import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

import TaskBase from './shared/TaskBase';
import WithTask from '../hocs/Task';
import Stepper from './shared/LetfStepper';
import { getTaskData } from "../../helpers/TaskHelper";
import { getStateInfo } from '../../actions/TaskAction';
import WhatToDo from './reminderVoteSteps/WhatToDo';
import TaskSuccess from './shared/TaskSuccess';
import YesNoButtons from './shared/YesNoButtons';
import routes from '../../constants/Routes';
import PhotoUpload from './shared/PhotoUpload';

const subSteps = {
    haveRemind: 'haveRemind',
    photoUpload: 'photoUpload'
};

class ReminderVoteTask extends TaskBase {
    constructor(props, context) {
        super(props, context);
        const { actions, taskData } = this.props;
        const state = taskData.voter_metaData.state;
        actions.getStateInfo(state);
        this.state = {
            subComponent: subSteps.haveRemind,
            nextEnabled: false,
            haveRemind: '',
            photoStepValid: false,
            image: null
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
            photoStepValid
        } = this.state;

        switch (subComponent) {
            case subSteps.haveRemind: {
                return {
                    component: <YesNoButtons title={`Did you remind ${firstname} ${lastname}  to mail in their ballot?`}
                                             value={haveRemind}
                                             onChange={val => this.setState({ haveRemind: val })} />,
                    onNext: () => {
                        if (haveRemind === 'no') {
                            this.onLink(routes.tasksList);
                            return;
                        }
                        this.setState({ subComponent: subSteps.photoUpload });
                    },
                    valid: !!haveRemind
                }
            }
            case subSteps.photoUpload: {
                return {
                    component: (
                        <PhotoUpload onSkipClick={() => this.onLink(routes.tasksList)}
                                     title={`Upload a photo confirming that ${firstname} ${lastname} mailed in their ballot.`}
                                     onFileChange={image => this.setState({
                                         image,
                                         photoStepValid: true,
                                         nextEnabled: true
                                     })}
                        />
                    ),
                    valid: photoStepValid
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

export default connect(mapStateToProps, mapDispatchToProps)(WithTask(ReminderVoteTask));