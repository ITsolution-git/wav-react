import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

import TaskBase from './shared/TaskBase';
import WithTask from '../hocs/Task';
import Stepper from './shared/LetfStepper';
import { getTaskData } from "../../helpers/TaskHelper";
import { getStateInfo } from '../../actions/TaskAction';
import WhatToDo from './mailRegistrationSteps/WhatToDo';
import TaskSuccess from './shared/TaskSuccess';
import YesNoButtons from './shared/YesNoButtons';
import PhotoUpload from './shared/PhotoUpload';
import routes from '../../constants/Routes';
import authStorage from '../../storage/AuthStorage';

const subSteps = {
    haveAsked: 'haveAsked',
    haveConfirmed: 'haveConfirmed',
    photoUpload: 'photoUpload'
};

class MailRegistrationTask extends TaskBase {
    constructor(props, context) {
        super(props, context);
        const { actions, taskData } = this.props;
        const state = taskData.voter_metaData.state;
        actions.getStateInfo(state);
        this.state = {
            subComponent: subSteps.haveAsked,
            nextEnabled: false,
            haveAsked: '',
            haveConfirmed: '',
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
            haveAsked,
            haveConfirmed,
            photoStepValid
        } = this.state;

        switch (subComponent) {
            case subSteps.haveAsked: {
                return {
                    component: <YesNoButtons title={`Did you talk to ${firstname} ${lastname} about signing up to vote by mail?`}
                                             value={haveAsked}
                                             onChange={val => this.setState({ haveAsked: val })} />,
                    onNext: () => {
                         if (haveAsked === 'no') {
                             this.onLink(routes.tasksList);
                             return;
                         }
                         this.setState({ subComponent: subSteps.haveConfirmed });
                     },
                    valid: !!haveAsked
                }
            }
            case subSteps.haveConfirmed: {
                return {
                    component: <YesNoButtons title={`Did ${firstname} ${lastname} confirm that they’ve signed up?`}
                                             value={haveConfirmed}
                                             onChange={val => this.setState({ haveConfirmed: val })} />,
                    onNext: () => {
                        if (haveConfirmed === 'no') {
                            this.onLink(routes.tasksList);
                            return;
                        }
                        this.setState({ subComponent: subSteps.photoUpload });
                     },
                    valid: !!haveConfirmed
                }
            }
            case subSteps.photoUpload: {
                return {
                    component: (
                        <PhotoUpload onSkipClick={() => this.setState({
                                            photoStepValid: true,
                                            nextEnabled: true
                                        })}
                                     title='Upload an email or photo confirming that they’ve signed up.'
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
        let formData = new FormData();
        formData.append('image', this.state.image);
        formData.append('taskid', taskData._id);
        formData.append('userid', authStorage.getLoggedUser().userid);
        return { formData, points: taskData.group_info.value };
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

export default connect(mapStateToProps, mapDispatchToProps)(WithTask(MailRegistrationTask));