import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import classNames from 'classnames';

import colors from '../../../constants/Colors';
import routes from '../../../constants/Routes';
import { BaseComponent, ActionItem, Typography, VoterCardView, CongratsAlarm, SvgIcon } from '../../shared';
import { DashboardUserInfo, ExtraPointTask, TopPerformers, PerformanceChart, WelcomeBanner } from './index';

class CaptainsDashboard extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            voters: [
                {
                    firstName: 'Steven',
                    lastName: 'Griffith',
                    name: 'Steven Griffith',
                    sex: 'Male',
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
                    sex: 'Male',
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
                    sex: 'Female',
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
                    sex: 'Female',
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
            performanceData: {
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
            },
            isOpen: {
                performanceContent: false,
                taskContent: false,
                actionContent: false,
                voterContent: false
            },
            isFirstLogin: true
        }
    }

    onSelectVoter = () => { }

    accordionHandler = (contentName) => () => {
        this.setState((prevState) => ({
            isOpen: {
                ...prevState.isOpen,
                [contentName]: !prevState.isOpen[contentName]
            }
        }));
    }

    onGotBannerHandler = () => {
        this.setState({ isFirstLogin: false });
    }

    renderWelcomeBanner = () => {
        const { isFirstLogin } = this.state;

        if (isFirstLogin) {
            return (
                <WelcomeBanner onGot={this.onGotBannerHandler} />
            )
        }
    }

    renderContentHeader = (title, linkName, route, contentName, isOpen) => {
        return (
            <div className='content-header'>
                <Typography className='content-title'>{title}</Typography>
                {!!linkName && <span className='view-all' onClick={() => this.onLink(route)}>{linkName}</span>}
                <SvgIcon
                    name={isOpen ? 'accordion-open' : 'accordion-close'}
                    onClick={this.accordionHandler(contentName)}
                    className='accordion-button'
                />
            </div>
        )
    }

    renderContentFooter = (linkName, route) => {
        return (
            <span className='view-all-mobile' onClick={() => this.onLink(route)}>{linkName}</span>
        )
    }

    renderCongrat = () => {
        const { isOpen: { performanceContent }, isFirstLogin } = this.state;

        if (!isFirstLogin) {
            return (
                <div className='content top-congrats'>
                    {this.renderContentHeader('Performance stats', '', '', 'performanceContent', performanceContent)}
                    <div className={classNames('content-body top-congrats', { 'content-inactive': !performanceContent })}>
                        <CongratsAlarm>
                            <Typography variant='body' color={colors['white']}>
                                Your result is better than of <b>75%</b> of Captains this week!
                            </Typography>
                            <Typography
                                variant='body'
                                fontWeight='600'
                                color={colors['white']}
                                className='congrat-link'
                                onClick={() => this.onLink(routes.leaderboard)}>
                                View Leaderboard
                            </Typography>
                        </CongratsAlarm>
                    </div>
                </div>
            )
        }
    }

    renderPerfomance = () => {
        const { performers, performanceData, isOpen: { performanceContent }, isFirstLogin } = this.state

        if (!isFirstLogin) {
            return (
                <div className='content'>
                    <Row className={classNames('content-body', { 'content-inactive': !performanceContent })}>
                        <Col xs={12} lg={6}>
                            <PerformanceChart performanceData={performanceData} />
                        </Col>
                        <Col xs={12} lg={6}>
                            <TopPerformers performers={performers} />
                        </Col>
                    </Row>
                </div>
            );
        }
    }

    renderTasks = () => {
        const { tasks, isOpen: { taskContent } } = this.state

        return (
            <div className='content'>
                {this.renderContentHeader('Today’s extra points tasks', '', '', 'taskContent', taskContent)}
                <div className={classNames('content-body', { 'content-inactive': !taskContent })}>
                    <Row>
                        <Col xs={12} md={6}>
                            <ExtraPointTask task={tasks[0]} color='dark' />
                        </Col>
                        <Col xs={12} md={6}>
                            <ExtraPointTask task={tasks[1]} />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    renderActions = () => {
        const { tasks, isOpen: { actionContent } } = this.state

        return (
            <div className='content'>
                {this.renderContentHeader('Actions in progress', 'All Actions', routes.tasksList, 'actionContent', actionContent)}
                <div className={classNames('content-body', { 'content-inactive': !actionContent })}>
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
                    {this.renderContentFooter('All Actions', routes.tasksList)}
                </div>
            </div>
        );
    }

    renderVoters = () => {
        const { voters, isOpen: { voterContent } } = this.state

        return (
            <div className='content'>
                {this.renderContentHeader('Your voters', 'All Voters', routes.voterList, 'voterContent', voterContent)}
                <div className={classNames('content-body', { 'content-inactive': !voterContent })}>
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
                    {this.renderContentFooter('All Voters', routes.tasksList)}
                </div>
            </div>
        );
    }

    render() {
        const { user } = this.state

        return (
            <Container className='btw-captains-dashboard'>
                <Row className='user-info-content'>
                    <Col md={5} lg={6} className='main-title'>
                        <Typography>{`Welcome back, ${user.firstName}!`}</Typography>
                        <Typography lightColor variant="body">Nice to meet you again.</Typography>
                    </Col>
                    <Col md={7} lg={6} className='p-0'>
                        <DashboardUserInfo user={user} />
                    </Col>
                </Row>
                {this.renderWelcomeBanner()}
                {this.renderCongrat()}
                {this.renderPerfomance()}
                {this.renderTasks()}
                {this.renderActions()}
                {this.renderVoters()}
            </Container>
        )
    }
}

export default connect()(withRouter(CaptainsDashboard));
