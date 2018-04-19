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

class CaptainsDashboard extends BaseComponent {

    constructor(props) {
        super(props);
        const { actions } = this.props;
        const { userid, username } = authStorage.getLoggedUser();
        actions.loadVoterList(userid, username);
        actions.loadTaskList(userid);
        actions.getBtwUserProfile();
	}

    render() {
        const { profile: { isSuccess }, voters_count, tasks_count } = this.props;
        const votersCount = 27,
              invitesCount = 20,
              notificationCount = 5;

        return (
            <div>
                <div className='container btw-captains-dashboard'>
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
                                        <FontAwesome name='thumbs-up' size='3x'/>
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
                                        <FontAwesome name='tasks' size='3x'/>
                                        <span className='button-text'>Messages</span>
                                        <span className='ml-2 count'>7</span>
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
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const profile = state.app[appDataTypes.profile];
    const voters_count = state.voterList.count;
    const tasks_count = state.taskList.count;
    return {
        profile,
        voters_count,
        tasks_count
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ loadVoterList, loadTaskList, getBtwUserProfile }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CaptainsDashboard));