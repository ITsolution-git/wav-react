import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Button from 'material-ui/Button';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import Dropzone from 'react-dropzone';

import TaskBase from './shared/TaskBase';
import WithTask from '../hocs/Task';
import Stepper from './shared/LetfStepper';
import { getTaskData } from "../../helpers/TaskHelper";
import { getStateInfo } from '../../actions/TaskAction';
import WhatToDo from './mailRegistrationSteps/WhatToDo';
import TaskSuccess from './shared/TaskSuccess';
import YesNoButtons from './shared/YesNoButtons';
import routes from '../../constants/Routes';

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

    hanldeFiles = (files) => {
        this.setState({
            image: files[0],
            photoStepValid: true,
            nextEnabled: true
        });
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
                        <div className='registration-by-mail'>
                            <Dropzone className='drop-zone' ref={(node) => { this.dropzoneRef = node; }} onDrop={this.hanldeFiles} >
                                <p>Drop photo here.</p>
                            </Dropzone>
                            <Row>
                                <Col md={3}>
                                    <Button size='small'
                                            onClick={() => { this.dropzoneRef.open() }}>Upload</Button>
                                </Col>
                                <Col md={3} onClick={() => this.setState({
                                        photoStepValid: true,
                                        nextEnabled: true
                                    })}>
                                    <Button>Skip</Button>
                                </Col>
                            </Row>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(WithTask(MailRegistrationTask));