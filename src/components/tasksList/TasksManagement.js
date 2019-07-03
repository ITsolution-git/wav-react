import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import classNames from 'classnames';

import { ActionItem, BaseComponent, Tabs, TaskCompleteDialog } from '../shared';
import { TaskEmpty, TaskDetail, CongratsDialog } from './index';

class TasksManagement extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            tabs: [
                {
                    id: 'allActions',
                    title: 'All actions'
                },
                {
                    id: 'inProgress',
                    title: 'In progress'
                },
                {
                    id: 'completed',
                    title: 'Completed'
                }
            ],
            activeTabId: 'allActions',
            tasks: [
                {
                    task_id: 0,
                    title: 'Help 5 people register for voting',
                    status: 'completed',
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
                                firstName: 'Dennis',
                                lastName: 'Holman',
                                status: 'Regular', //not-registered, in-frequent, regular,
                                initials: 'DH',
                                src: 'https://images.unsplsh.com/photo-1527585743534-7113e3211270?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
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
                                firstName: 'Dennis',
                                lastName: 'Holman',
                                status: 'Not registered', //not-registered, in-frequent, regular,
                                initials: 'DH',
                                src: 'https://images.unsplsh.com/photo-1527585743534-7113e3211270?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
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
                                firstName: 'Dennis',
                                lastName: 'Holman',
                                status: 'Infrequent', //not-registered, in-frequent, regular,
                                initials: 'DH',
                                src: 'https://images.unsplsh.com/photo-1527585743534-7113e3211270?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
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
                    status: 'inProgress', // 0: in progress, 1: completed
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
                                firstName: 'Dennis',
                                lastName: 'Holman',
                                status: 'Regular', //not-registered, in-frequent, regular,
                                initials: 'DH',
                                src: 'https://images.unsplash.com/photo-1549396193-9c8e59660445?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
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
                                firstName: 'Dennis',
                                lastName: 'Holman',
                                status: 'Not registered', //not-registered, in-frequent, regular,
                                initials: 'DH',
                                src: 'https://images.unsplash.com/photo-1549396193-9c8e59660445?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
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
                                firstName: 'Dennis',
                                lastName: 'Holman',
                                status: 'Infrequent', //not-registered, in-frequent, regular,
                                initials: 'DH',
                                src: 'https://images.unsplash.com/photo-1549396193-9c8e59660445?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
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
                    status: 'inProgress', // 0: in progress, 1: completed
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
                                firstName: 'Dennis',
                                lastName: 'Holman',
                                status: 'Regular', //not-registered, in-frequent, regular,
                                initials: 'DH',
                                src: 'https://images.unsplash.com/photo-1549396193-9c8e59660445?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
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
                                firstName: 'Dennis',
                                lastName: 'Holman',
                                status: 'Not registered', //not-registered, in-frequent, regular,
                                initials: 'DH',
                                src: 'https://images.unsplash.com/photo-1549396193-9c8e59660445?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
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
                                firstName: 'Dennis',
                                lastName: 'Holman',
                                status: 'Infrequent', //not-registered, in-frequent, regular,
                                initials: 'DH',
                                src: 'https://images.unsplash.com/photo-1549396193-9c8e59660445?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
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
                    status: 'inProgress', // 0: in progress, 1: completed
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
                                firstName: 'Dennis',
                                lastName: 'Holman',
                                status: 'Regular', //not-registered, in-frequent, regular,
                                initials: 'DH',
                                src: 'https://images.unsplash.com/photo-1549907319-f028c3db04e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
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
                            status: 0, //0 : in progress, 1: done
                            voter: {
                                firstName: 'Dennis',
                                lastName: 'Holman',
                                status: 'Not registered', //not-registered, in-frequent, regular,
                                initials: 'DH',
                                src: 'https://images.unsplash.com/photo-1549907319-f028c3db04e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
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
                            status: 0, //0 : in progress, 1: done
                            voter: {
                                firstName: 'Dennis',
                                lastName: 'Holman',
                                status: 'Infrequent', //not-registered, in-frequent, regular,
                                initials: 'DH',
                                src: 'https://images.unsplash.com/photo-1549907319-f028c3db04e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
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
            selectedTask: {
                task_id: 0,
                title: 'Help 5 people register for voting',
                status: 'completed',
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
                            firstName: 'Dennis',
                            lastName: 'Holman',
                            status: 'Regular', //not-registered, in-frequent, regular,
                            initials: 'DH',
                            src: 'https://images.unsplash.com/photo-1557265193-56758b5a2f7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
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
                            firstName: 'Dennis',
                            lastName: 'Holman',
                            status: 'Not registered', //not-registered, in-frequent, regular,
                            initials: 'DH',
                            src: 'https://images.unsplash.com/photo-1557265193-56758b5a2f7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
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
                            firstName: 'Dennis',
                            lastName: 'Holman',
                            status: 'Infrequent', //not-registered, in-frequent, regular,
                            initials: 'DH',
                            src: 'https://images.unsplash.com/photo-1557265193-56758b5a2f7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
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
            selectedSubTask: {},
            isMarkDialogShow: false,
            isCongratDialogShow: false
        };

    }

    isEmptyOfSelectedTasks() {
        const { tasks, activeTabId } = this.state

        if (activeTabId === 'allActions') {
            return tasks.length === 0
        } else {
            return tasks.filter(task => task.status === activeTabId).length === 0;
        }
    }

    selectTabHandler = (activeTabId) => {
        this.setState({ activeTabId });
    }

    onSelectTaskHandler = (task) => {
        this.setState({ selectedTask: task });
    }

    onClickMarkOpenHandler = (selectedSubTask) => {
        this.setState({
            selectedSubTask,
            isMarkDialogShow: true
        })
    }

    showCongrateHandler = () => {
        this.setState({
            isMarkDialogShow: false,
            isCongratDialogShow: true
        })
    }

    renderTaskList = () => {
        const { tasks, activeTabId, selectedTask } = this.state;

        return tasks.filter((task) => task.status === activeTabId || activeTabId === 'allActions')
            .map((task, index) => (
                <ActionItem
                    key={index}
                    task={task}
                    onSelectTask={this.onSelectTaskHandler}
                    className={classNames({ 'task-selected': task.task_id === selectedTask.task_id })} />));
    }

    renderTaskContent = () => {
        const { selectedTask } = this.state;

        return (
            <Row>
                <Col md={4} lg={5}>
                    {this.renderTaskList()}
                </Col>
                <Col md={8} lg={7}>
                    <TaskDetail
                        task={selectedTask}
                        onMarkAsDone={this.onClickMarkOpenHandler} />
                </Col>
            </Row>
        )
    }

    renderEmptyTask = () => {
        return (
            <div className='task-empty'>
                <TaskEmpty />
            </div>
        )
    }

    render() {
        const { tabs, activeTabId, isMarkDialogShow, isCongratDialogShow, selectedTask, selectedSubTask } = this.state;

        return (
            <Container className='btw-task-list-page'>
                <Tabs tabs={tabs}
                    activeTabId={activeTabId}
                    onTabSelect={this.selectTabHandler}
                    className='actions-tabs' />
                {this.isEmptyOfSelectedTasks() ?
                    this.renderEmptyTask() :
                    this.renderTaskContent()}
                {
                    isMarkDialogShow &&
                    <TaskCompleteDialog show={isMarkDialogShow}
                        selectedTask={selectedTask}
                        selectedSubTask={selectedSubTask}
                        onClose={() => this.setState({ isMarkDialogShow: false })}
                        onMarkAsDone={this.showCongrateHandler} />
                }
                {
                    isCongratDialogShow &&
                    <CongratsDialog show={isCongratDialogShow}
                        onClose={() => this.setState({ isCongratDialogShow: false })}
                    />
                }
            </Container>
        );
    }
}

export default connect()(withRouter(TasksManagement));