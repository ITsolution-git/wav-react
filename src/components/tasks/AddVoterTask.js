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
import TaskFail from './shared/TaskFail';
import Stepper from './shared/LetfStepper';
import boardingTypes from '../../constants/VoterBoardingType';
import { matchListPersist, voterDetailsPersist, setBoardingType } from "../../actions/VoterAction";
import InformationSection from './shared/InformationSection';
import ContentLayout from '../layout/ContentLayout';
import BottomButtons from './shared/BottomButtons';

class AddVoterTask extends TaskBase {
    state = {
        voterDetails: {},
        voterDetailsValid: false,
        matchListDone: false,
        error: ''
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

    resolveComponent = () => {
        const {
            matchListDone,
            error
        } = this.state;

        if (matchListDone) {
           return error
               ? <TaskFail data={error} />
               : <TaskSuccess data={ this.getTaskData() } />;
        }
        return <MatchList onSuccess={() => this.setState({ matchListDone: true })}
                          onError={error => this.setState({ matchListDone: true, error })} />
    };

    getSteps = () => {
        const {
            voterDetailsValid,
            matchListDone,
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
                backDisabled: true,
                valid: voterDetailsValid
            },
            {
                label: 'Match List',
                component: this.resolveComponent(),
                backDisabled: true,
                valid: matchListDone
            }
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
            this.props.history.push('/errorPages/No_Task')
            return ''
        }

        return (
            <ContentLayout>
                <div className='btw-task container'>
                    <Col md={8}>
                        <Stepper steps={this.getSteps()} taskData={this.props.taskData} />
                    </Col>
                    <InformationSection taskData={this.props.taskData} />
                    <BottomButtons taskData={this.props.taskData} />
                </div>
            </ContentLayout>
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