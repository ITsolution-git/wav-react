import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';

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

class CaptainsDashboard extends BaseComponent {

    constructor(props) {
        super(props);
        const { actions } = this.props;
        const { userid, username } = authStorage.getLoggedUser();
        actions.loadVoterList(userid, username);
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
            <div>
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
                                {/*<Col md={6} xs={6} className='block-padding'>*/}
                                    {/*<div className='icon-div invites' onClick={() => this.onLink(routes.invites)}>*/}
                                        {/*<FontAwesome name='envelope-open'  size='3x' />*/}
                                        {/*<span className='button-text'>*/}
                                            {/*Invites <span>*/}
                                                {/*(<b>{invitesCount}</b>)*/}
                                            {/*</span>*/}
                                        {/*</span>*/}
                                    {/*</div>*/}
                                {/*</Col>*/}
                                {/*<Col md={6} xs={6} className='block-padding'>*/}
                                    {/*<div className='icon-div forum' onClick={() => this.onLink(routes.forum)}>*/}
                                        {/*<FontAwesome name='comments' size='3x'/>*/}
                                        {/*<span className='button-text'>Forum</span>*/}
                                    {/*</div>*/}
                                {/*</Col>*/}
                            </Row>
                        </Col>
                        {/*<Col md={4} className='block-padding'>
                            <div className='right-column'>
                                <div className='notification'>
                                    <FontAwesome name='bell'  size='2x'/>
                                    <span className='label'>Notifications</span>
                                    <span className='count'>
                                      {notificationCount}
                                    </span>
                                </div>
                                <div className='community' onClick={() => this.onLink(routes.community)}>
                                    <FontAwesome name='users' size='2x' />
                                    <span className='label'>Community</span>
                                </div>
                            </div>
                        </Col>*/}
                    </Row>
                    }
                </div>
                <Dialog
                    open={showSplashModal}
                    onClose={() => this.onCloseSplashModal()}>
                    <DialogTitle>Welcome { data.firstname } { data.lastname }</DialogTitle>
                    <DialogContent classes={{root: 'splash-modal'}}>
                        <DialogContentText>
                            { tasks.length === 0 && 'You have no new tasks, please check back soon'}
                            { tasks.length !== 0 && 'Here is your the latest task'}
                        </DialogContentText>
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
                    </DialogContent>
                    <DialogActions>
                        <Button color='primary'
                                variant='raised'
                                onClick={this.onSplashSubmitClick}>
                            Go to Tasks
                        </Button>
                        <Button onClick={() => this.onCloseSplashModal()}
                                color='primary'
                                variant='raised'>
                            Dismiss
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
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