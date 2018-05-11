import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Col } from 'react-bootstrap';

import TaskBase from './shared/TaskBase';
import WithTask from '../hocs/Task';
import { getTaskData } from "../../helpers/TaskHelper";
import VoterDetails from './addVoterSteps/VoterDetails';
import MatchList from './addVoterSteps/MatchList';
import TaskSuccess from './shared/TaskSuccess';
import Stepper from './shared/LetfStepper';

class AddVoterTask extends TaskBase {
    state = {
        voterDetailsValid: false,
        matchListValid: false
    };

    getSteps = () => {
        const {
            voterDetailsValid,
            matchListValid
        } = this.state;

        return [
            { label: 'Voter Details', component: <VoterDetails onChange={ valid => this.setState({ voterDetailsValid: valid })}/>, valid: voterDetailsValid },
            { label: 'Match List', component: <MatchList />, valid: matchListValid },
            { label: 'Success', component: <TaskSuccess data={ this.props.taskData } />, valid: true }
        ];
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
        taskData: getTaskData(state, ownProps)
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ }, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(WithTask(AddVoterTask));