import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import cn from 'classnames';

import BaseComponent from '../../components/shared/BaseComponent';
import colors from '../../constants/Colors';
import ContentLayout from '../layout/ContentLayout';
import {
    ActionItem,
    Button,
    SvgIcon,
    Typography,
    VoterCardView
} from '../shared';

class CaptainsDashboard extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            voters: [
                {
                    firstName: 'Steven',
                    lastName: 'Griffith',
                    name: 'Steven Griffith',
                    gender: 'Male',
                    street: 'address street',
                    social: {
                        twitter: true,
                        linkedIn: true
                    },
                    status: 'Infrequent'
                },
                {
                    firstName: 'Steven',
                    lastName: 'Griffith',
                    name: 'Steven Griffith',
                    gender: 'Male',
                    street: 'address street',
                    social: {
                        twitter: true,
                        linkedIn: true
                    },
                    status: 'Infrequent'
                },
                {
                    firstName: 'Florence',
                    lastName: 'Boyle',
                    name: 'Florence Boyle',
                    gender: 'Female',
                    street: 'address street',
                    social: {
                        twitter: true,
                        linkedIn: true
                    },
                    status: 'Regular'
                },
                {
                    firstName: 'Florence',
                    lastName: 'Boyle',
                    name: 'Florence Boyle',
                    gender: 'Female',
                    street: 'address street',
                    social: {
                        twitter: true,
                        linkedIn: true
                    },
                    status: 'Regular',
                    src: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png'
                }
            ],
            tasks: [
                {
                    task_id: 0,
                    title: 'Test1',
                    status: 'inProgress',
                    points: {
                        score: 4,
                        total: 20
                    },
                    start_date: '30 May 2019',
                    end_date: '30 May 2019',
                    subTasks: [
                        {
                            subTask_id: 0,
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
                            subTask_id: 1,
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
                            subTask_id: 2,
                            status: 'inProgress',
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
                    status: 'inProgress',
                    points: {
                        score: 4,
                        total: 20
                    },
                    start_date: '30 May 2019',
                    end_date: '30 May 2019',
                    subTasks: [
                        {
                            subTask_id: 0,
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
                            subTask_id: 1,
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
                            subTask_id: 2,
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
                    status: 'inProgress',
                    points: {
                        score: 4,
                        total: 20
                    },
                    start_date: '30 May 2019',
                    end_date: '30 May 2019',
                    subTasks: [
                        {
                            subTask_id: 0,
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
                            subTask_id: 1,
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
                            subTask_id: 2,
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
                    status: 'inProgress',
                    points: {
                        score: 4,
                        total: 20
                    },
                    start_date: '30 May 2019',
                    end_date: '30 May 2019',
                    subTasks: [
                        {
                            subTask_id: 0,
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
                            subTask_id: 1,
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
                            subTask_id: 2,
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
            ],
            profile: {
                firstName: 'Denis',
                lastName: 'Damin',
                role: 'Captain',
                points: 365,
                activeTasks: 6,
                voterCounts: 10
            }
        }
    }

    render() {
        const { tasks, voters, profile } = this.state

        return (
            <ContentLayout>
                <div className='container btw-captains-dashboard'>
                    <Row>
                        <Col md={6}>
                            <Typography>Welcome back!, {profile.firstname}</Typography>
                            <Typography lightColor variant="body">Nice to meet you again.</Typography>
                        </Col>

                        <Col md={6}>
                            <Row>
                                <Col md={3}>
                                    <Typography lightColor variant='body'>Current level:</Typography>
                                    <Typography>{profile.role}</Typography>
                                </Col>

                                <Col md={3}>
                                    <Typography lightColor variant='body'>Points balance:</Typography>
                                    <Typography><SvgIcon name="medal" />{profile.points}</Typography>
                                </Col>

                                <Col md={3}>
                                    <Typography lightColor variant='body'>Active tasks:</Typography>
                                    <Typography>{profile.activeTasks}</Typography>
                                </Col>

                                <Col md={3}>
                                    <Typography lightColor variant='body'>Your voters:</Typography>
                                    <Typography>{profile.voterCounts}</Typography>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <div className={cn('today-extra-points')}>
                        <Typography>Today’s extra points tasks</Typography>
                        <Typography color={colors['primary']} variant='body' className={cn('view-all')}>View all</Typography>
                    </div>



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

                    <div className={cn('actions-in-progress-title')}>
                        <Typography>Actions in progress</Typography>
                        <Typography color={colors['primary']} variant='body' className={cn('view-all')}>View all</Typography>
                    </div>

                    <Row>

                        {
                            tasks.map((task, index) => {
                                return (
                                    <Col md={3} key={task.task_id}>
                                        <ActionItem task={task} />
                                    </Col>
                                )
                            })
                        }

                    </Row>

                    <div className={cn('your-voters-title')}>
                        <Typography>Your voters</Typography>
                        <Typography color={colors['primary']} variant='body' className={cn('view-all')}>View all</Typography>
                    </div>

                    <Row>
                        {
                            voters.map((voter, index) => {
                                return (
                                    <Col md={6} key={index}>
                                        <VoterCardView data={voter} />
                                    </Col>
                                )
                            })
                        }

                    </Row>
                </div>
            </ContentLayout>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
};

export default connect(null, mapDispatchToProps)(withRouter(CaptainsDashboard));
