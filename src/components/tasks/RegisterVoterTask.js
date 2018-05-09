import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
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

import imgPhone from '../../resources/images/phone.png'
import imgReward from '../../resources/images/reward.png'
import imgCheck from '../../resources/images/checkmark.png'
import imgLightBulb from '../../resources/images/lightbulb.png'

import { getStateInfo } from '../../actions/TaskAction'
import States_Special from '../../constants/States_Special'

class RegisterVoterTask extends TaskBase {
    constructor(props, context) {
        super(props, context);
        this.state = {
            nextEnabled: false,
            subComponent: RegisterSubSteps.byDefault,
            linkClicked: false,
            state_info: {}
        };

        let state = props.taskData.voter_metaData.state;
        props.actions.getStateInfo(state);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.state_info) {
            this.setState({state_info: nextProps.state_info})
        }
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
            { label: 'How to register', component: <HowToRegister onLinkClicked={() => this.setState({ linkClicked: true }) }/>, valid: this.state.linkClicked },
            { label: 'Why register', component: <WhyRegister voterData={voter_metaData} />, valid: true },
            { label: 'Get contact', component: lastStep.component, valid: lastStep.valid, nextEnabled: this.state.nextEnabled },
            { label: 'Success', component: <TaskSuccess data={ this.getTaskData() } />, valid: true }
        ];
    };

    getTaskData = () => {
        const { taskData = {}} = this.props;
        return { ...this.state, taskid: taskData._id, points: taskData.group_info.value };
    };

    getStateInfo = () => {
        
        const { taskData, state_info } = this.props;

        if (!state_info) return "";
        if (taskData.voter_metaData.age && taskData.voter_metaData.age > 17 && taskData.voter_metaData.age < 23) {
            return {
                "2018 Primary Election voting date":    state_info['2018PrimaryElectionVotingDate'],
                "Registration deadline by mail":        state_info['registrationDeadlineByMail'],
                "Online registration deadline":         state_info['registrationDeadlineOnline'],
                "Is ID needed":                         state_info['idNeeded'] ? "YES" : "NO",
                "Is ID required for first-time voters": state_info['idRequiredForFirstTimeVoters'] ? "YES" : "NO",
                "Student id accepted":                  state_info['studentIdAccepted'] ? "YES" : "NO",
            }
        } 

        if (States_Special.includes(state_info.state)) {
            return {
                "2018 Primary Election voting date":        state_info['2018PrimaryElectionVotingDate'],
                "Registration deadline by mail":            state_info['registrationDeadlineByMail'],
                "Absentee Ballot application deadline":     state_info['absenteeBallotApplicationDeadline'],
                "Absentee Ballot deadline":                 state_info['absenteeBallotDeadline'],
                "Is Absentee with cause allowed":           state_info['absenteeWithCause'] ? "YES" : "NO",
                "Is Absentee without cause allowed":        state_info['absenteeWithoutCause'] ? "YES" : "NO",
                "Is ID needed":                             state_info['idNeeded'] ? "YES" : "NO",
            }
        }

        return {
            "2018 Primary Election voting date":    state_info['2018PrimaryElectionVotingDate'],
            "Registration deadline by mail":        state_info['registrationDeadlineByMail'],
            "Online registration deadline":         state_info['registrationDeadlineOnline'],
            "Is early voting allowed":              state_info['earlyVotingAllowed'] ? "YES" : "NO",
            "Is all mail allowed":                  state_info['allMailVoting'] ? "YES" : "NO",
            "Student id accepted":                  state_info['studentIdAccepted'] ? "YES" : "NO",
        }
    }

    render() {
        const { taskData: {
            group_info = {}
        } = {} } = this.props;

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
                                <img src={imgReward} alt="" width={50} height={50} />
                            </Col>
                            <Col xs={10}>
                                <span className="title"><b>Rewards Points</b></span><br />
                                <span className="description">This task is worth {group_info.value} points</span>
                            </Col>
                        </Row>

                        <hr />

                        <Row className="section">
                            <Col xs={2}>
                                <img src={imgPhone} alt="" width={50} height={50} />
                            </Col>
                            <Col xs={10}>
                                <span className="title"><b>Contact us</b></span><br />
                                <span className="description">(707) 408-8437</span>
                            </Col>
                        </Row>

                        <hr />

                        <Row className="section">
                            <Col xs={2}>
                                <img src={imgLightBulb} alt="" width={50} height={50} />
                            </Col>
                            <Col xs={10}>
                                <span className="title"><b>Relevant information that may apply to this voter</b></span>
                            </Col>
                        </Row>

                        <br/>

                        {
                            Object.keys(this.getStateInfo()).map(e => {
                                return <Row className="section">
                                            <Col xs={2} style={{padding:"0"}}>
                                                <img src={imgCheck} className="pull-right" alt="" width={20} height={20} />
                                            </Col>
                                            <Col xs={10}>
                                                <span><b>{e}</b></span><br />
                                                <span>{ this.getStateInfo()[e] }</span>
                                            </Col>
                                        </Row>
                            })
                        }

                        <br/>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        taskData: getTaskData(state, ownProps),
        state_info: state.taskList.state_info
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ getStateInfo }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(WithTask(RegisterVoterTask));