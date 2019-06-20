import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';

import BaseComponent from '../../components/shared/BaseComponent';
import appDataTypes from '../../constants/AppDataTypes';
import routes from '../../constants/Routes';
import authStorage from '../../storage/AuthStorage';
import { loadVoterList } from '../../actions/VoterListAction';
import { loadTaskList } from '../../actions/TaskListAction';
import { getBtwUserProfile } from '../../actions/AuthActions';
import Spinner from '../shared/Spinner';
import ContentLayout from '../layout/ContentLayout';
import Icon from '../shared/Icon';
import { resolveTaskData } from '../../helpers/TaskHelper';
import { getStateInfo } from '../../actions/TaskAction';

class CaptainsDashboard extends BaseComponent {

    constructor(props) {
        super(props);
        const { actions } = this.props;
        const { userid, email } = authStorage.getLoggedUser();
        actions.loadVoterList(userid, email);
        actions.loadTaskList(userid);
        actions.getBtwUserProfile();
	}

    goToTask = (task, taskRoute) => {
        const { state } = task.voter_metaData || {};
	    this.props.actions.getStateInfo(state);
        this.onLink(`${taskRoute}?taskId=${task._id}`);
    };

    onAddClick = () => {
        this.onLink(`${routes.voterList}?openAddModal=true`);
    };

	renderCircleItem = (number, text) => {
      return (
          <div id="circle-point">
              <span className="circle">{ number }</span>
              { text }
          </div>
      )
    };

	renderResourceCenter = () => {
	    return (
	        <div>
                <div className="text-15-dark-blue-bold">
                    Not sure how to talk to your friends about <br />
                    voting? Uncertain about the latest voter ID laws?
                </div>
                <div onClick={() => this.onLink(routes.resourceCenter)}>
                    Check out our Resource Center  <i className="arrow-right-dark-blue" />
                </div>
            </div>
        )
    };

    render() {
        const {
            profile: {
                isSuccess,
                data = {},
                isFetching
            },
            voters_count,
            taskList: {
                tasks
            }
        } = this.props;

        const task = tasks.length > 0 ? resolveTaskData(tasks[0]) : {};

        return (
            <ContentLayout>
                <div className='container btw-captains-dashboard'>
                    <Spinner loading={isFetching} height={300} />
                    { isSuccess &&
                    <Col>
                        <div id="name">
                            Hi {data.firstname}!
                        </div>
                        <Row>
                            <Col md={6}>
                                <Col className="white-box">
                                    <div>Top Action:</div>
                                    <div id="recent-task">
                                        { tasks.length > 0
                                            ? <div>
                                                <span className="text-18-dark-blue-bold">{ task.description }. </span>
                                                <span id="get-started"
                                                      onClick={() => this.goToTask(task, task.route)}>
                                                    Get started
                                                </span>
                                                <i className="arrow-right-dark-blue" />
                                            </div>
                                            : <div>
                                                <span>No recent actions</span>
                                            </div> }
                                    </div>
                                </Col>
                                <Row className="no-margin" id="voters">
                                    <Col md={9} xs={7} id="voter-count-div">
                                        <div className="white-box" id="voter-count">
                                            <div>
                                                { voters_count } Voters
                                            </div>
                                            <div onClick={() => this.onLink(routes.voterList)}>
                                                View all voters
                                            </div>
                                        </div>
                                        { this.isDesktop() &&
                                            <div className="white-box" id="resource-center">{ this.renderResourceCenter() }</div> }
                                    </Col>
                                    <Col md={3} xs={5} id="add-voter" className="white-box">
                                        <div>Add Voter</div>
                                        <div onClick={this.onAddClick}>
                                            <Icon name="plus" width="47px" height="47px" />
                                        </div>
                                    </Col>
                                </Row>
                                <Col mdHidden lgHidden id="resource-center-mobile">
                                    { this.renderResourceCenter() }
                                </Col>
                            </Col>
                            <Col id="help-friends" md={4} xsHidden className="white-box">
                                <div>Help your friends:</div>
                                { this.renderCircleItem('1', 'Register to vote') }
                                { this.renderCircleItem('2', 'Decide method of voting') }
                                { this.renderCircleItem('3', 'Understand the ballot') }
                                { this.renderCircleItem('4', 'Cast their ballot') }
                                <div onClick={() => this.onLink(routes.stepsToHelpFriendVote)}>
                                    Learn More
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    }
                </div>
            </ContentLayout>
        )
    }
}

const mapStateToProps = (state) => {
    const profile = state.app[appDataTypes.profile];
    const voters_count = state.voterList.count;

    return {
        profile,
        voters_count,
        taskList: state.taskList
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ loadVoterList, loadTaskList, getBtwUserProfile, getStateInfo }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CaptainsDashboard));