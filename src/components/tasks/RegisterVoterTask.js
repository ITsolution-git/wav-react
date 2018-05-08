import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Row, Col } from 'react-bootstrap';

import Stepper from './shared/LetfStepper';
import TaskBase from './shared/TaskBase';
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

import imgPhone from '../../resources/images/phone.png'
import imgReward from '../../resources/images/reward.png'

class RegisterVoterTask extends TaskBase {
    constructor(props, context) {
        super(props, context);
        this.state = {
            nextEnabled: false,
            subComponent: RegisterSubSteps.byDefault
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
            { label: 'How to register', component: <HowToRegister />, valid: true },
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
        const { taskData: {
            group_info = {}
        } = {}} = this.props;

        return (
            <div className='btw-task container'>
                <Row>
                    { this.renderBackToHome() }
                    <Col md={8}>
                        <Stepper steps={this.getSteps()}
                                 taskData={this.props.taskData} />
                    </Col>

                    <Col 
                        md={3} 
                        xs={ this.isMobile() ? 12 : 8 } 
                        xsOffset={ this.isMobile() ? 1 : 0 } 
                        className="btw-task-info" 
                        style={{marginLeft: (this.isMobile() ? "0" : "80px")}}>
                        <Row className="section">
                            <Col xs={2}>
                                <img src={imgReward} alt="" width={40} height={40} />
                            </Col>
                            <Col xs={10}>
                                <span className="title"><b>Rewards Points</b></span><br />
                                <span className="description">This task is worth {group_info.value} points</span>
                            </Col>
                        </Row>

                        <hr />

                        <Row className="section">
                            <Col xs={2}>
                                <img src={imgPhone} alt="" width={40} height={40} />
                            </Col>
                            <Col xs={10}>
                                <span className="title"><b>Contact us</b></span><br />
                                <span className="description">(707) 408-8437</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        taskData: getTaskData(state, ownProps)
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterVoterTask));