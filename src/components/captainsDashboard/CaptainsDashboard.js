import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import BaseComponent from '../../components/shared/BaseComponent';
import appDataTypes from '../../constants/AppDataTypes';
import routes from '../../constants/Routes';
import authStorage from '../../storage/AuthStorage';
import { loadVoterList } from '../../actions/VoterListAction';
import { loadTaskList } from '../../actions/TaskListAction';
import { getBtwUserProfile } from '../../actions/SignOnAction';
import { resolveTaskData } from '../../helpers/TaskHelper';
import Spinner from '../shared/Spinner';
import appStorage from '../../storage/AppStorage';
import Button from '../shared/Button';
import Dialog from '../shared/Dialog';
import ContentLayout from '../layout/ContentLayout';

class CaptainsDashboard extends BaseComponent {

    constructor(props) {
        super(props);
        const { actions } = this.props;
        const { userid, email } = authStorage.getLoggedUser();
        actions.loadVoterList(userid, email);
        actions.loadTaskList(userid);
        actions.getBtwUserProfile();
        this.state = {
            showSplashModal: false
        }
	}

	onCloseSplashModal = (onComplete = () => {}) => {
        this.setState({ showSplashModal: false }, () => {
            appStorage.unsetSplashShown();
            onComplete();
        });
    };

    goToTask = (taskId, taskRoute) => {
        this.onCloseSplashModal(() => {
            this.onLink(`${taskRoute}?taskId=${taskId}`)
        });
    };

    onSplashSubmitClick = () => {
        this.onCloseSplashModal(() => {
            this.onLink(routes.tasksList);
        });
    };

    componentWillReceiveProps(props) {
        const { taskList, profile } = props;
        if (appStorage.isSplashShown() && !taskList.isFetching && !profile.isFetching) {
            this.setState({ showSplashModal: true });
        }
    }

    render() {
        const {
            profile: {
                isSuccess,
                data = {},
                isFetching
            },
            voters_count,
            taskList: {
                tasks,
                count
            }
        } = this.props;

        const tasks_count = count;
        const { showSplashModal } = this.state;

        return (
            <ContentLayout>
                <div className='container btw-captains-dashboard'>
                    <Spinner loading={isFetching} height={300} />
                    { isSuccess &&
                    <Row>
                        <Col md={8}>
                            <Row>
                                <Col md={6} xs={6} className='block-padding'>
                                    <div className='icon-div tasks' onClick={() => this.onLink(routes.tasksList)}>
                                        <FontAwesome name='tasks' size='3x'/>
                                        <span className='button-text'>Your Tasks</span>
                                        { tasks_count ? <span className='count'>{tasks_count}</span> : '' }
                                    </div>
                                </Col>
                                <Col md={6} xs={6} className='block-padding'>
                                    <div className='icon-div voters' onClick={() => this.onLink(routes.voterList)}>
                                        <FontAwesome name='users' size='3x'/>
                                        <span className='button-text'>
                                            Voters {/*<span>
                                                (<b>{votersCount}</b>)
                                            </span>*/}
                                        </span>
                                        { voters_count ? <span className='count'>{voters_count}</span> : '' }
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6} xs={6} className='block-padding'>
                                    <div className='icon-div messages' onClick={() => this.onLink(routes.messageList)}>
                                        <FontAwesome name='envelope' size='3x'/>
                                        <span className='button-text'>Messages</span>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    }
                </div>
                <Dialog id='dashboardDialog'
                    title={`Welcome ${data.firstname} ${data.lastname}`}
                    show={showSplashModal}
                    actionButtons={
                        <Row>
                            <Col id='dashboardSplashSubmit' md={4} xs={6}>
                                <Button size='medium' onClick={this.onSplashSubmitClick}>
                                    Go to Tasks
                                </Button>
                            </Col>
                            <Col id='dashboardSplashDismiss' md={3} xs={4}>
                                <Button  size='medium' onClick={() => this.onCloseSplashModal()}>
                                    Dismiss
                                </Button>
                            </Col>
                        </Row>
                    }
                    onClose={() => this.onCloseSplashModal()}>
                        { tasks.length === 0 && 'You have no new tasks, please check back soon'}
                        { tasks.length !== 0 && 'Here is your the latest task'}
                        { tasks.slice(0, 1).map((item, i) => {
                            const task = resolveTaskData(item);
                            return (
                                <div key={i}
                                     onClick={() => this.goToTask(task._id, task.route)}
                                     className='latest-task'>
                                    <div>{ task.description }</div>
                                </div>
                            )
                        })}
                </Dialog>
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