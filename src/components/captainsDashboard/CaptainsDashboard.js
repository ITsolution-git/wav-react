import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';
import cn from 'classnames';

import BaseComponent from '../../components/shared/BaseComponent';
import appDataTypes from '../../constants/AppDataTypes';
import routes from '../../constants/Routes';
import colors from '../../constants/Colors';
import authStorage from '../../storage/AuthStorage';
import { loadVoterList } from '../../actions/VoterListAction';
import { loadTaskList } from '../../actions/TaskListAction';
import { getBtwUserProfile } from '../../actions/AuthActions';
import { getStateInfo } from '../../actions/TaskAction';
import Button from '../shared/Button';
import Spinner from '../shared/Spinner';
import { SvgIcon } from '../shared';
import Typography from '../shared/Typography';
import Paper from '../shared/Paper';
import ActionItem from '../shared/ActionItem';
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
            tasks: [
                {
                    task_id: 0,
                    title: 'Test1',
                    status: 0, // 0: in progress, 1: completed
                    points: {
                        score: 4,
                        total: 20
                    },
                    start_date: '30 May 2019',
                    end_date: '30 May 2019',
                    sub_tasks: [
                        {
                            sub_task_id: 0,
                            status: 1, //0 : in progress, 1: done
                            voter: {
                                name: 'Dennis Holman',
                                status: 'regular', //not-registered, in-frequent, regular,
                                initials: 'DH',
                                avatar: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png',
                                social: {
                                    twitter: true,
                                    linkedIn: true,
                                    facebook: true
                                }
                            },
                            points: 4
                        },
                        {
                            sub_task_id: 1,
                            status: 1, //0 : in progress, 1: done
                            voter: {
                                name: 'Dennis Holman',
                                status: 'not-registered', //not-registered, in-frequent, regular,
                                initials: 'DH',
                                avatar: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png',
                                social: {
                                    twitter: true,
                                    linkedIn: true,
                                    facebook: true
                                }
                            },
                            points: 4
                        },
                        {
                            sub_task_id: 2,
                            status: 1, //0 : in progress, 1: done
                            voter: {
                                name: 'Dennis Holman',
                                status: 'in-frequent', //not-registered, in-frequent, regular,
                                initials: 'DH',
                                avatar: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png',
                                social: {
                                    twitter: true,
                                    linkedIn: true,
                                    facebook: true
                                }
                            },
                            points: 4
                        }
                    ],
                    description: `I am making an online multiplayer game in Javascript, using Node.js, Websockets.io, and using p5.js as the drawing library. The game has a variety of errors and issues that need to be fixed, as well as polishing some preexisting features, as well as updating and smoothing out my current circle to circle collision system. 

                    I need someone who is confident that they can help my game look and feel professional within a timely manner, and have everything work as well as I want it to work. 
                    
                    I have examples on how I want everything to look and behave that you can take a look at when we talk. 
                    
                    I may have more work for you in the future, as I expand my game output. This could be the start of a relationship if you are interested in continuing to work with me.`
                },
                {
                    task_id: 1,
                    title: 'Test',
                    status: 0, // 0: in progress, 1: completed
                    points: {
                        score: 4,
                        total: 20
                    },
                    start_date: '30 May 2019',
                    end_date: '30 May 2019',
                    sub_tasks: [
                        {
                            sub_task_id: 0,
                            status: 0, //0 : in progress, 1: done
                            voter: {
                                name: 'Dennis Holman',
                                status: 'regular', //not-registered, in-frequent, regular,
                                initials: 'DH',
                                avatar: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png',
                                social: {
                                    twitter: true,
                                    linkedIn: true,
                                    facebook: true
                                }
                            },
                            points: 4
                        },
                        {
                            sub_task_id: 1,
                            status: 1, //0 : in progress, 1: done
                            voter: {
                                name: 'Dennis Holman',
                                status: 'not-registered', //not-registered, in-frequent, regular,
                                initials: 'DH',
                                avatar: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png',
                                social: {
                                    twitter: true,
                                    linkedIn: true,
                                    facebook: true
                                }
                            },
                            points: 4
                        },
                        {
                            sub_task_id: 2,
                            status: 1, //0 : in progress, 1: done
                            voter: {
                                name: 'Dennis Holman',
                                status: 'in-frequent', //not-registered, in-frequent, regular,
                                initials: 'DH',
                                avatar: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png',
                                social: {
                                    twitter: true,
                                    linkedIn: true,
                                    facebook: true
                                }
                            },
                            points: 4
                        }
                    ],
                    description: `I am making an online multiplayer game in Javascript, using Node.js, Websockets.io, and using p5.js as the drawing library. The game has a variety of errors and issues that need to be fixed, as well as polishing some preexisting features, as well as updating and smoothing out my current circle to circle collision system. 

                    I need someone who is confident that they can help my game look and feel professional within a timely manner, and have everything work as well as I want it to work. 
                    
                    I have examples on how I want everything to look and behave that you can take a look at when we talk. 
                    
                    I may have more work for you in the future, as I expand my game output. This could be the start of a relationship if you are interested in continuing to work with me.`
                },
                {
                    task_id: 2,
                    title: 'Test',
                    status: 0, // 0: in progress, 1: completed
                    points: {
                        score: 4,
                        total: 20
                    },
                    start_date: '30 May 2019',
                    end_date: '30 May 2019',
                    sub_tasks: [
                        {
                            sub_task_id: 0,
                            status: 1, //0 : in progress, 1: done
                            voter: {
                                name: 'Dennis Holman',
                                status: 'regular', //not-registered, in-frequent, regular,
                                initials: 'DH',
                                avatar: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png',
                                social: {
                                    twitter: true,
                                    linkedIn: true,
                                    facebook: true
                                }
                            },
                            points: 4
                        },
                        {
                            sub_task_id: 1,
                            status: 1, //0 : in progress, 1: done
                            voter: {
                                name: 'Dennis Holman',
                                status: 'not-registered', //not-registered, in-frequent, regular,
                                initials: 'DH',
                                avatar: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png',
                                social: {
                                    twitter: true,
                                    linkedIn: true,
                                    facebook: true
                                }
                            },
                            points: 4
                        },
                        {
                            sub_task_id: 2,
                            status: 1, //0 : in progress, 1: done
                            voter: {
                                name: 'Dennis Holman',
                                status: 'in-frequent', //not-registered, in-frequent, regular,
                                initials: 'DH',
                                avatar: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png',
                                social: {
                                    twitter: true,
                                    linkedIn: true,
                                    facebook: true
                                }
                            },
                            points: 4
                        }
                    ],
                    description: `I am making an online multiplayer game in Javascript, using Node.js, Websockets.io, and using p5.js as the drawing library. The game has a variety of errors and issues that need to be fixed, as well as polishing some preexisting features, as well as updating and smoothing out my current circle to circle collision system. 

                    I need someone who is confident that they can help my game look and feel professional within a timely manner, and have everything work as well as I want it to work. 
                    
                    I have examples on how I want everything to look and behave that you can take a look at when we talk. 
                    
                    I may have more work for you in the future, as I expand my game output. This could be the start of a relationship if you are interested in continuing to work with me.`
                },
                {
                    task_id: 3,
                    title: 'Test',
                    status: 0, // 0: in progress, 1: completed
                    points: {
                        score: 4,
                        total: 20
                    },
                    start_date: '30 May 2019',
                    end_date: '30 May 2019',
                    sub_tasks: [
                        {
                            sub_task_id: 0,
                            status: 1, //0 : in progress, 1: done
                            voter: {
                                name: 'Dennis Holman',
                                status: 'regular', //not-registered, in-frequent, regular,
                                initials: 'DH',
                                avatar: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png',
                                social: {
                                    twitter: true,
                                    linkedIn: true,
                                    facebook: true
                                }
                            },
                            points: 4
                        },
                        {
                            sub_task_id: 1,
                            status: 1, //0 : in progress, 1: done
                            voter: {
                                name: 'Dennis Holman',
                                status: 'not-registered', //not-registered, in-frequent, regular,
                                initials: 'DH',
                                avatar: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png',
                                social: {
                                    twitter: true,
                                    linkedIn: true,
                                    facebook: true
                                }
                            },
                            points: 4
                        },
                        {
                            sub_task_id: 2,
                            status: 1, //0 : in progress, 1: done
                            voter: {
                                name: 'Dennis Holman',
                                status: 'in-frequent', //not-registered, in-frequent, regular,
                                initials: 'DH',
                                avatar: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png',
                                social: {
                                    twitter: true,
                                    linkedIn: true,
                                    facebook: true
                                }
                            },
                            points: 4
                        }
                    ],
                    description: `I am making an online multiplayer game in Javascript, using Node.js, Websockets.io, and using p5.js as the drawing library. The game has a variety of errors and issues that need to be fixed, as well as polishing some preexisting features, as well as updating and smoothing out my current circle to circle collision system. 

                    I need someone who is confident that they can help my game look and feel professional within a timely manner, and have everything work as well as I want it to work. 
                    
                    I have examples on how I want everything to look and behave that you can take a look at when we talk. 
                    
                    I may have more work for you in the future, as I expand my game output. This could be the start of a relationship if you are interested in continuing to work with me.`
                }
            ]

        }
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
                <span className="circle">{number}</span>
                {text}
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
            voters_count

        } = this.props;

        const { tasks } = this.state

        return (
            <ContentLayout>
                <div className='container btw-captains-dashboard'>
                    <Spinner loading={isFetching} height={300} />
                    {
                        isSuccess &&
                        <div>
                            <Row>
                                <Col md={6}>
                                    <Typography>Welcome back!, {data.firstname}</Typography>
                                    <Typography lightColor variant="body">Nice to meet you again.</Typography>
                                </Col>

                                <Col md={6}>
                                    <Row>
                                        <Col md={3}>
                                            <Typography lightColor variant='body'>Current level:</Typography>
                                            <Typography>Captain</Typography>
                                        </Col>

                                        <Col md={3}>
                                            <Typography lightColor variant='body'>Points balance:</Typography>
                                            <Typography><SvgIcon name="medal" />365</Typography>
                                        </Col>

                                        <Col md={3}>
                                            <Typography lightColor variant='body'>Active tasks:</Typography>
                                            <Typography>6</Typography>
                                        </Col>

                                        <Col md={3}>
                                            <Typography lightColor variant='body'>Your voters:</Typography>
                                            <Typography>{voters_count}</Typography>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row className={cn('today-extra-points')}>
                                <Col md={12}>
                                    <Typography>Today’s extra points tasks</Typography>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <div className={cn('today-extra-point left-point')}>
                                        <Typography variant='functional' color={colors['white']}>Request a ballot for Dennis Holman</Typography>

                                        <div className={cn('points-marks')}>
                                            <SvgIcon name="medal" />
                                            <Typography variant='functional' color={colors['white']}>20</Typography>
                                            <Button size='small' className={'mark-as-done-btn'}>Mark as Done</Button>
                                        </div>
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <div className={cn('today-extra-point right-point')}>
                                        <Typography variant='functional' color={colors['white']}>Help Anna Thompson register for voting</Typography>
                                        <div className={cn('points-marks')}>
                                            <SvgIcon name="medal" />
                                            <Typography variant='functional' color={colors['white']}>20</Typography>
                                            <Button size='small' className={'mark-as-done-btn'}>Mark as Done</Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            <Row className={cn('actions-in-progress-title')}>
                                <Col md={12}>
                                    <Typography>Actions in progress</Typography>
                                </Col>
                            </Row>

                            <Row>

                                {
                                    tasks.map((task, index) => {
                                        return (
                                            <Col md={3}>
                                                <ActionItem key={task.task_id} task={task} />
                                            </Col>
                                        )
                                    })
                                }

                            </Row>

                            <Row className={cn('your-voters-title')}>
                                <Col md={12}>
                                    <Typography>Your voters</Typography>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Paper>
                                        <div>

                                        </div>
                                    </Paper>
                                </Col>
                            </Row>
                        </div>
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