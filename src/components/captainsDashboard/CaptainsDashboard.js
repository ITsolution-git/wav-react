import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';

import routes from '../../constants/Routes';
import { BaseComponent, ActionItem, Typography, VoterCardView } from '../shared';
import { DashboardUserInfo, DashboardTaskItem, DashboardPerformer, PerformanceChart } from './index';

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
                    src: 'https://images.unsplash.com/photo-1520484033379-7f74cc7d7340?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
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
                            status: 1,
                            points: 4
                        },
                        {
                            status: 1,
                            points: 4
                        },
                        {
                            status: 0,
                            points: 4
                        }
                    ]
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
                            status: 1,
                            points: 4
                        },
                        {
                            status: 0,
                            points: 4
                        },
                        {
                            status: 1,
                            points: 4
                        }
                    ]
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
                            status: 1,
                            points: 4
                        },
                        {
                            status: 1,
                            points: 4
                        },
                        {
                            status: 0,
                            points: 4
                        }
                    ]
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
                            status: 1,
                            points: 4
                        },
                        {
                            status: 1,
                            points: 4
                        },
                        {
                            status: 1,
                            points: 4
                        }
                    ]
                }
            ],
            user: {
                firstName: 'Denis',
                lastName: 'Damin',
                level: 'Captain',
                points: 365,
                activeTasks: 6,
                voterCounts: 10
            },
            performers: [
                {
                    firstName: 'Denis',
                    lastName: 'Damin',
                    level: 'Captain',
                    points: 35,
                    activeTasks: 6,
                    src: 'https://images.unsplash.com/photo-1520484033379-7f74cc7d7340?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },
                {
                    firstName: 'Denis',
                    lastName: 'Damin',
                    level: 'Captain',
                    points: 65,
                    activeTasks: 56,
                    src: 'https://images.unsplash.com/photo-1520484033379-7f74cc7d7340?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                },
                {
                    firstName: 'Denis',
                    lastName: 'Damin',
                    level: 'Captain',
                    points: 45,
                    activeTasks: 60,
                    src: 'https://images.unsplash.com/photo-1520484033379-7f74cc7d7340?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                }
            ],
            performData: {
                main: {
                    startDate: 'Jun 24',
                    endDate: 'Jun 30',
                    data: [12, 5, 16, 12, 19, 21, 25]
                },
                previous: {
                    startDate: 'Jun 17',
                    endDate: 'Jun 23',
                    data: [10, 7, 10, 22, 9, 9, 15]
                },
                points: {
                    value: 150,
                    percent: 2,
                    isUp: false
                },
                activeTasks: {
                    value: 75,
                    percent: 10,
                    isUp: true
                }
            }
        }
    }

    onSelectVoter = () => { }

    renderPerfomance = () => {
        const { performers, performData } = this.state

        return (
            <div className='content'>
                <Row>
                    <Col xs={12} lg={6}>
                        <PerformanceChart performData={performData} />
                    </Col>
                    <Col xs={12} lg={6}>
                        <DashboardPerformer performers={performers} />
                    </Col>
                </Row>
            </div>
        );
    }

    renderTasks = () => {
        const { tasks } = this.state

        return (
            <div className='content'>
                <div className='content-header'>
                    <Typography className='content-title'>Today’s extra points tasks</Typography>
                </div>
                <Row>
                    <Col xs={12} md={6}>
                        <DashboardTaskItem task={tasks[0]} color='dark' />
                    </Col>
                    <Col xs={12} md={6}>
                        <DashboardTaskItem task={tasks[1]} />
                    </Col>
                </Row>
            </div>
        );
    }

    renderActions = () => {
        const { tasks } = this.state

        return (
            <div className='content'>
                <div className='content-header'>
                    <Typography className='content-title'>Actions in progress</Typography>
                    <span className='view-all' onClick={() => this.onLink(routes.tasksList)}>View All</span>
                </div>
                <Row>
                    {
                        tasks.map((task, index) => {
                            return (
                                <Col sm={6} lg={3} key={index}>
                                    <ActionItem task={task} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        );
    }

    renderVoters = () => {
        const { voters } = this.state

        return (
            <div className='content'>
                <div className='content-header'>
                    <Typography className='content-title'>Your voters</Typography>
                    <span className='view-all' onClick={() => this.onLink(routes.voterList)}>View All</span>
                </div>
                <Row>
                    {
                        voters.map((voter, index) => {
                            return (
                                <Col xs={12} lg={6} key={index}>
                                    <VoterCardView data={voter} onSelectItem={this.onSelectVoter} />
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        );
    }

    render() {
        const { user } = this.state

        return (
            <Container className='btw-captains-dashboard'>
                <Row className='user-info-content'>
                    <Col md={5} lg={6} className='main-title'>
                        <Typography>Welcome back!, {user.firstName}</Typography>
                        <Typography lightColor variant="body">Nice to meet you again.</Typography>
                    </Col>
                    <Col md={7} lg={6} className='p-0'>
                        <DashboardUserInfo user={user} />
                    </Col>
                </Row>
                {this.renderPerfomance()}
                {this.renderTasks()}
                {this.renderActions()}
                {this.renderVoters()}
            </Container>
        )
    }
}


export default connect()(withRouter(CaptainsDashboard));
