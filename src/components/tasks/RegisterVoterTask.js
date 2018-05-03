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

                    <Col md={3} xs={12} className="btw-task-info" style={{marginLeft: (this.isMobile() ? "0" : "80px")}}>
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