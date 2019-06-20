import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import ReadMoreAndLess from 'react-read-more-less';
import cn from 'classnames';

import {
    ActionItem,
    BaseComponent,
    Paper,
    SvgIcon,
    Typography,
    Tabs
} from '../shared';
import { getStateInfo } from '../../actions/TaskAction';
import { loadTaskList } from '../../actions/TaskListAction';
import ContentLayout from '../layout/ContentLayout';
import SubTasksList from './SubTasksList';
import EmptyTask from './EmptyTask';
import TaskCompleteDialog from './TaskCompleteDialog';
import CongratsDialog from './CongratsDialog';
import colors from '../../constants/Colors';

class TaskList extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showTipsModal: false,
            selectedTaskNo: 0,
            selectedTab: 2,
            isShowMobileSelectedDetail: false,
            showMarkAsDoneDlg: false,
            markAsDoneModalStatus: 0, //0 : start,
            showCongratDlg: false,
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
            ]
        };

    }

    componentWillMount() {
        this.props.actions.loadTaskList();
    }

    switchTab = (tabId) => {
        this.setState({ activeTabId: tabId })
    }

    gotoAll = () => {
        this.setState({
            isShowMobileSelectedDetail: false
        })
    }

    getCompletedTasksCount(task) {
        return task.subTasks.filter(subTask => subTask.status).length;
    }

    countTaskofCurrentTab() {
        const { tasks, selectedTab } = this.state

        if (selectedTab === 2) {
            return tasks.length
        } else {
            return tasks.filter(task => task.status === selectedTab).length;
        }
    }

    clickMarkAsDone = (subTask) => {

        this.setState({
            subTaskForMark: subTask,
            showMarkAsDoneDlg: true,
        })
    }

    onClickTask = (task) => {
        const { tasks, isShowMobileSelectedDetail } = this.state
        tasks.map((task_item, index) => {
            if (task.task_id === task_item.task_id) {
                this.setState({ selectedTaskNo: index })

                if (this.isMobile()) {
                    this.setState({ isShowMobileSelectedDetail: !isShowMobileSelectedDetail })
                }
            }
            return index;
        })
    }

    showCongrate = () => {
        this.setState({
            showMarkAsDoneDlg: false,
            showCongratDlg: true,
            markAsDoneModalStatus: 0
        })
    }

    render() {

        const {
            tasks,
            selectedTaskNo,
            selectedTab,
            isShowMobileSelectedDetail,
            showMarkAsDoneDlg,
            subTaskForMark,
            showCongratDlg,
            tabs,
            activeTabId,
        } = this.state;

        const selectedTask = tasks[selectedTaskNo];

        return (
            <ContentLayout>
                <div className='bwt-task-list'>
                    <Tabs tabs={tabs}
                        activeTabId={activeTabId}
                        onTabSelect={this.switchTab}
                        className={cn('actions-tabs')} />

                    {
                        this.countTaskofCurrentTab(tasks, selectedTab) ?
                            <div className={'actions-content'}>
                                <div className={'actions'}>
                                    {
                                        tasks.map((task, index) => {

                                            return ((task.status === activeTabId || activeTabId === 'allActions') &&
                                                <ActionItem className={cn({ 'task-selected': index === selectedTaskNo })} key={task.task_id} task={task} onSelectTask={this.onClickTask} />
                                            )
                                        }
                                        )
                                    }

                                </div>

                                <Paper className={cn('selected-action', { 'mobile-selected-action': isShowMobileSelectedDetail })}>
                                    {
                                        isShowMobileSelectedDetail &&
                                        <div className={cn('mobile-selected-header')}>
                                            <div className={cn('goto-all-actions')}>
                                                <SvgIcon name="arrow-left" onClick={this.gotoAll} />
                                                <Typography color='white' className={cn('nav-title')}>All actions</Typography>
                                            </div>
                                            <SvgIcon name="navigation" />
                                        </div>
                                    }
                                    <div className={cn('header', { 'completed-selected-header': selectedTask.status === 'completed' })}>
                                        <div className={cn('action-status')}>
                                            <SvgIcon name={selectedTask.status === 'completed' ? 'action-status-completed' : 'action-status-inprogress'} />
                                            <Typography className={'status-text'} variant="functional" lightColor={selectedTask.status !== 'completed'} color={selectedTask.status === 'completed' ? colors['white'] : colors['secondary']}>{selectedTask.status ? 'Completed' : 'In progress'}</Typography>
                                        </div>

                                        <div className={'action-points'}>
                                            <Typography variant='functional' lightColor={selectedTask.status !== 'completed'} color={selectedTask.status === 'completed' ? colors['white'] : colors['secondary']}>Points earned: </Typography>
                                            <SvgIcon name='medal' />
                                            <Typography className={'points-text'} variant="functional" lightColor={selectedTask.status !== 'completed'} color={selectedTask.status === 'completed' ? colors['white'] : colors['secondary']}>{selectedTask.points.score} / {selectedTask.points.total}</Typography>
                                        </div>
                                    </div>
                                    <div className={'action-body'}>
                                        <Typography>{selectedTask.title}</Typography>
                                        <Typography variant='body' lightColor className={'action-duration'}>{selectedTask.start_date} – {selectedTask.end_date}</Typography>
                                        <ReadMoreAndLess charLimit={250}
                                            readMoreText='Read more'
                                            readLessText='Read less'
                                        >
                                            {selectedTask.description}
                                        </ReadMoreAndLess>

                                        {selectedTask.status === 'inProgress' && <Typography className={'active-task-title'}>Active tasks({selectedTask.subTasks.length - this.getCompletedTasksCount(selectedTask)})</Typography>}

                                        <SubTasksList subTasks={selectedTask.subTasks} status={0} onMarkAsDone={this.clickMarkAsDone} />

                                        <Typography className={'active-task-title'}>Done tasks({this.getCompletedTasksCount(selectedTask)})</Typography>

                                        <SubTasksList subTasks={selectedTask.subTasks} status={1} />
                                    </div>
                                </Paper>
                            </div> :
                            <EmptyTask />
                    }

                    {
                        showMarkAsDoneDlg &&
                        <TaskCompleteDialog showMarkAsDoneDlg={showMarkAsDoneDlg}
                            selectedTask={selectedTask}
                            subTaskForMark={subTaskForMark}
                            onClose={() => this.setState({ showMarkAsDoneDlg: false })}
                            onMarkAsDone={this.showCongrate} />
                    }

                    {
                        showCongratDlg &&
                        <CongratsDialog showCongratDlg={showCongratDlg}
                            onClose={() => this.setState({ showCongratDlg: false })}
                        />
                    }
                </div>
            </ContentLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        taskList: state.taskList
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ loadTaskList, getStateInfo }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TaskList));