import React from 'react';
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap';

import Stepper from './shared/LetfStepper';
import TaskBase from './shared/TaskBase';
import WithTask from '../hocs/Task';

import HaveContact, {
    FirstYes,
    SecondYes,
    FirstNext,
    FirstNo,
    SecondNext
} from './registerSteps/HaveContact';
import HowToRegister from './registerSteps/HowToRegister';
import WhyRegister from './registerSteps/WhyRegister';
import TaskSuccess from './shared/TaskSuccess';
import {
    RegisterTaskConstants,
    RegisterSubSteps
} from '../../constants/reducerConstants/TaskConstants';
import { getTaskData } from "../../helpers/TaskHelper";
import InformationSection from './shared/InformationSection';
import ContentLayout from '../layout/ContentLayout';

class RegisterVoterTask extends TaskBase {
    constructor(props, context) {
        super(props, context);
        this.state = {
            nextEnabled: false,
            subComponent: RegisterSubSteps.byDefault,
            linkClicked: false
        };
    }

    onNextClick = (subComponent) => {
        this.setState({ subComponent });
    };

    handleSuccess = (name, val) => {
        if (val === 'yes') {
            this.setState({ nextEnabled: true });
        }
        this.handleChange(name, val);
    };

    getSubComponent = () => {
        const {
            hasSpeak,
            thinkRegistered,
            confirmRegistered,
            finalConfirmRegistered
        } = RegisterTaskConstants;
        const { voter_metaData = {} } = this.props.taskData || {};

        let component = null,
            valid = true;

        switch (this.state.subComponent) {
            case RegisterSubSteps.byDefault: {
                component = (
                    <HaveContact onChange={this.handleChange}
                                 voterData={voter_metaData}
                                 onSubmit={this.onNextClick}
                                 value={ this.state[hasSpeak] } />
                );
                valid = this.validateField(hasSpeak);
                break;
            }
            case RegisterSubSteps.firstYes: {
                component = (
                    <FirstYes onChange={this.handleChange}
                              voterData={voter_metaData}
                              onSubmit={this.onNextClick}
                              value={ this.state[thinkRegistered]} />
                );
                valid = this.validateField(thinkRegistered);
                break;
            }
            case RegisterSubSteps.secondYes: {
                component = (
                    <SecondYes voterData={voter_metaData}
                               onSubmit={this.onNextClick} />
                );
                valid = true;
                break;
            }
            case RegisterSubSteps.firstNext: {
                component = (
                    <FirstNext onChange={this.handleSuccess}
                      voterData={voter_metaData}
                      onSubmit={this.onNextClick}
                      value={this.state[confirmRegistered]} />
                );
                valid = this.validateField(confirmRegistered);
                break;
            }
            case RegisterSubSteps.firstNo: {
                component = (
                    <FirstNo voterData={voter_metaData}
                             onSubmit={this.onNextClick} />
                );
                valid = true;
                break;
            }
            case RegisterSubSteps.secondNext: {
                component = (
                    <SecondNext onChange={this.handleSuccess}
                               voterData={voter_metaData}
                               onSubmit={this.onNextClick}
                               value={this.state[finalConfirmRegistered]} />
                );
                valid = this.validateField(finalConfirmRegistered);
                break;
            }
        }
        return { component, valid };
    };

    getSteps = () => {
        const { voter_metaData = {} } = this.props.taskData || {},
         lastStep = this.getSubComponent();
        
        return [
            { label: 'How to register', component: <HowToRegister onLinkClicked={() => this.setState({ linkClicked: true }) }/>, valid: true },
            { label: 'Why register', component: <WhyRegister voterData={voter_metaData} />, valid: true },
            { label: 'Get contact', component: lastStep.component, valid: lastStep.valid, nextEnabled: this.state.nextEnabled },
            { label: 'Success', component: <TaskSuccess data={ this.getTaskData() } />, valid: true }
        ];
    };

    getTaskData = () => {
        const { taskData = {}} = this.props;
        return { ...this.state, taskid: taskData._id, points: taskData.group_info.value };
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
                    <Row>
                        <Col md={8}>
                            <Stepper steps={this.getSteps()}
                                     taskData={this.props.taskData} />
                        </Col>
                        <InformationSection taskData={this.props.taskData} />
                    </Row>
                </div>
            </ContentLayout>
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

export default connect(mapStateToProps)(WithTask(RegisterVoterTask));