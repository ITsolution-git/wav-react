import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Row, Col } from 'react-bootstrap';

import Stepper from './shared/LetfStepper';
import TaskBase from './shared/TaskBase';
import ContactType from './registerSteps/ContactType';
import ReportBack from './registerSteps/ReportBack';
import TaskSuccess from './shared/TaskSuccess';
import { RegisterTaskConstants } from '../../constants/reducerConstants/TaskConstants';
import {getTaskData} from "../../helpers/TaskHelper";

import imgPhone from '../../resources/images/phone.png'
import imgReward from '../../resources/images/reward.png'

class RegisterVoterTask extends TaskBase {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    getSteps = () => {
        const { contactMode, isRegistered } = RegisterTaskConstants;
        const { voter_metaData = {} } = this.props.taskData || {};

        return [
            { label: 'Register', component:
                    <ContactType onChange={this.handleChange}
                                 voterData={voter_metaData}
                                 value={ this.state[contactMode] }/>,
              valid: this.validateField(contactMode) },

            { label: 'Report back', component:
                    <ReportBack onChange={this.handleChange}
                                value={ this.state[isRegistered] } />,

              valid: this.validateField(isRegistered) },
            { label: 'Success', component: <TaskSuccess data={ this.getTaskData() } />, valid: true }
        ];
    };

    getTaskData = () => {
        const { taskData = {}} = this.props;
        return { ...this.state, taskid: taskData._id };
    };

    render() {
        return (
            <div className='btw-task container'>
                <Row>
                    <Col md={8}>
                        <Stepper steps={this.getSteps()} taskData={this.props.taskData} />
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
                                <span className="description">This task is worth {this.props.taskData.group_info.value} points</span>
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