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
import boardingTypes from '../../constants/VoterBoardingType';
import { matchListPersist, voterDetailsPersist, setBoardingType } from "../../actions/VoterAction";
import InformationSection from './shared/InformationSection';

class AddVoterTask extends TaskBase {
    state = {
        voterDetails: {},
        voterDetailsValid: false,
        matchListValid: false
    };

    onDetailsNext = () => {
        const { voterDetails } = this.state;
        const {
            voterDetailsPersist,
            matchListPersist,
            setBoardingType
        } = this.props.actions;
        voterDetailsPersist(voterDetails);
        matchListPersist(voterDetails, this.loadPrevious);
        setBoardingType(boardingTypes.tasks);
        this.loadPrevious = true;
    };

    getSteps = () => {
        const {
            voterDetailsValid,
            matchListValid,
            voterDetails
        } = this.state;

        return [
            {
                label: 'Voter Details',
                component: <VoterDetails onChange={ (valid, details) => {
                                                    this.setState({
                                                        voterDetailsValid: valid,
                                                        voterDetails: details
                                                    });
                                                }}
                                         voterDetails={voterDetails} />,
                onNext: this.onDetailsNext,
                valid: voterDetailsValid
            },
            {
                label: 'Match List',
                component: <MatchList onChange={voter => this.setState({ matchListValid: true })}/>,
                valid: matchListValid
            },
            { label: 'Success', component: <TaskSuccess data={ this.getTaskData() } />, valid: true }
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
            this.props.history.push('/errorPages/Page_50_X')
            return ''
        }

        return (
            <div className='btw-task container'>
                { this.renderBackToHome() }
                <Col md={8}>
                    <Stepper steps={this.getSteps()} taskData={this.props.taskData} />
                </Col>
                <InformationSection taskData={this.props.taskData} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        taskData: getTaskData(state, ownProps),
        tasks: state.taskList.tasks
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        voterDetailsPersist,
        matchListPersist,
        setBoardingType
    }, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(WithTask(AddVoterTask));