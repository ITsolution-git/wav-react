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
import { getBtwUserProfile } from '../../actions/SignOnAction';
import Spinner from '../shared/Spinner';
import ContentLayout from '../layout/ContentLayout';
import Icon from '../shared/Icon';
import { resolveTaskData } from '../../helpers/TaskHelper';

class CaptainsDashboard extends BaseComponent {

    constructor(props) {
        super(props);
        const { actions } = this.props;
        const { userid, email } = authStorage.getLoggedUser();
        actions.loadVoterList(userid, email);
        actions.loadTaskList(userid);
        actions.getBtwUserProfile();
	}

    goToTask = (taskId, taskRoute) => {
        this.onLink(`${taskRoute}?taskId=${taskId}`);
    };

    onAddClick = () => {
        this.onLink(`${routes.voterList}?openAddModal=true`);
    };

	renderCircleItem = (number, text) => {
      return (
          <div id="circle-point" className="title-20-blue">
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
                <div className="link-small-dark-blue" onClick={() => this.onLink(routes.resourceCenter)}>
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
                        <div id="name" className="title-32-blue">
                            Hi {data.firstname}!
                        </div>
                        <Row>
                            <Col md={6}>
                                <Col className="white-box">
                                    <div className="title-24-light-blue">Top Action:</div>
                                    <div id="recent-task">
                                        { tasks.length > 0
                                            ? <div>
                                                <span className="text-18-dark-blue-bold">{ task.description }. </span>
                                                <span id="get-started"
                                                      onClick={() => this.goToTask(task._id, task.route)}
                                                      className="link-medium-dark-blue">
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
                                            <div className="title-24-light-blue">
                                                { voters_count } Voters
                                            </div>
                                            <div className="link-small-dark-blue" onClick={() => this.onLink(routes.voterList)}>
                                                View all voters
                                            </div>
                                        </div>
                                        { this.isDesktop() &&
                                            <div className="white-box" id="resource-center">{ this.renderResourceCenter() }</div> }
                                    </Col>
                                    <Col md={3} xs={5} id="add-voter" className="white-box">
                                        <div className="title-16-dark-blue">Add Voter</div>
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
                                <div className="title-24-light-blue">Help your friends:</div>
                                { this.renderCircleItem('1', 'Register to vote') }
                                { this.renderCircleItem('2', 'Decide method of voting') }
                                { this.renderCircleItem('3', 'Understand the ballot') }
                                { this.renderCircleItem('4', 'Cast their ballot') }
                                <div className="link-small-dark-blue" onClick={() => this.onLink(routes.faq)}>
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
        actions: bindActionCreators({ loadVoterList, loadTaskList, getBtwUserProfile }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CaptainsDashboard));