import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';

import TaskBase from './shared/TaskBase';
import WithTask from '../hocs/Task';
import Stepper from './shared/LetfStepper';
import { getTaskData } from "../../helpers/TaskHelper";
import YesNoButtons from './shared/YesNoButtons';
import InformationSection from './shared/InformationSection';
import TaskSuccess from './shared/TaskSuccess';
import ContentLayout from '../layout/ContentLayout';
import BottomButtons from './shared/BottomButtons';

class RegularVoteTask extends TaskBase {
    state = {
      haveRemind: ''
    };

    renderOption = (option) => {
        return (
            <li>
                <Typography>
                    { option }
                </Typography>
            </li>
        )
    };

    getSteps = () => {
        const {
            stateInfo = {},
            taskData: {
                voter_metaData: {
                    firstname = '',
                    lastname = ''
                } = {}
            } = {},
        } = this.props || {};

        const optionOne = (
            <span>
                Make sure { firstname } { lastname } votes on June 5. A few things for when you contact { firstname } { lastname }:
                Ask if they know where their polling location is.
                If they’re not sure, they can check here: <a target='_blank' href='https://www.vote.org/polling-place-locator'>vote.org/polling-place-locator</a>
            </span>
        ),
        secondOption = (
            <span>
                Remind your friend that the polls are open from {stateInfo['pollHours']}.
                Usually the lines are the shortest from late morning to late afternoon.
            </span>
        ),
        thirdOption = (
            <span>
                When you talk to { firstname } { lastname }, ask them to send you a selfie of them outside the polling place so you can confirm they voted.
            </span>
        );

        const whatToDoStep = () => {
            return (
                <ul>
                    { this.renderOption(optionOne) }
                    <br /><br />
                    { this.renderOption(secondOption) }
                    <br /><br />
                    { this.renderOption(thirdOption) }
                </ul>
            )
        };

        const { haveRemind } = this.state;
        return [
            { label: 'What to do', component: whatToDoStep(), valid: true },
            {
                label: 'Ask voter',
                component:<YesNoButtons title={` Did you remind ${firstname} ${lastname} to vote?`}
                                        value={haveRemind}
                                        onChange={val => this.setState({ haveRemind: val })} />,
                valid: !!haveRemind
            },
            { label: 'Success', component: <TaskSuccess data={ this.getTaskData() } />, valid: true }
        ];
    };

    getTaskData = () => {
        const { taskData = {}} = this.props;
        return {
            taskid: taskData._id,
            points: taskData.group_info.value
        };
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
        stateInfo: state.taskList.stateInfo || {},
        tasks: state.taskList.tasks
    }
};

export default connect(mapStateToProps)(WithTask(RegularVoteTask));