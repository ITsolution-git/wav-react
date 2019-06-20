import React from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import ReadMoreAndLess from 'react-read-more-less';
import cn from 'classnames';

import {
    ActionItem,
    BaseComponent,
    Dialog,
    Paper,
    SvgIcon,
    Typography,
<<<<<<< HEAD
    VoterAvatar
=======
>>>>>>> B2-196: created taskcompleteddialog
} from '../shared';
import colors from '../../constants/Colors';
import { getStateInfo } from '../../actions/TaskAction';
import { loadTaskList } from '../../actions/TaskListAction';
import ContentLayout from '../layout/ContentLayout';
import SubTasksList from './SubTasksList';
import EmptyTask from './EmptyTask';
import TaskCompleteDialog from './TaskCompleteDialog';

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
            tasks: [
                {
                    task_id: 0,
<<<<<<< HEAD
                    title: 'Help 5 people register for voting',
                    status: 1, // 0: in progress, 1: completed
=======
                    title:'Help 5 people register for voting',
                    status: 0, // 0: in progress, 1: completed
>>>>>>> B2-196: empty task added
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
                    status: 0, // 0: in progress, 1: completed
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
                    status: 0, // 0: in progress, 1: completed
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
                    status: 0, // 0: in progress, 1: completed
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

    switchTab = status => () => {
        this.setState({ selectedTab: status });
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
            showCongratDlg
        } = this.state;

        const selectedTask = tasks[selectedTaskNo];

        return (
            <ContentLayout>
                <div className='bwt-task-list'>
                    <ul className={'tabs'}>
                        <li className={cn({ 'active': selectedTab === 2 })} onClick={this.switchTab(2)}>All actions</li>
                        <li className={cn({ 'active': selectedTab === 0 })} onClick={this.switchTab(0)}>In progress</li>
                        <li className={cn({ 'active': selectedTab === 1 })} onClick={this.switchTab(1)}>Completed</li>
                    </ul>

                    {
                        this.countTaskofCurrentTab(tasks, selectedTab) ?
                            <div className={'actions-content'}>
                                <div className={'actions'}>
                                    {
                                        tasks.map((task, index) => {

                                            return ((task.status === selectedTab || selectedTab === 2) &&
                                                <ActionItem className={cn({ 'task-selected': index === selectedTaskNo })} key={task.task_id} task={task} onSelectTask={this.onClickTask} />
                                            )
                                        }
                                        )
                                    }
                                </div>
                            </div> :
                            <div className={cn('empty-task')}>
                                <SvgIcon name="task-empty" />
                                <Typography lightColor >Hey! It's empty here.</Typography>
                                <Typography lightColor variant="body">Looks like you don’t have any actions available for now.</Typography>
                                <div className={'action-points'}>
                                    <Typography variant='functional' lightColor={!selectedTask.status} color={selectedTask.status ? 'white' : 'secondary'}>Points earned: </Typography>
                                    <SvgIcon name='medal' />
                                    <Typography className={'points-text'} variant="functional" lightColor={!selectedTask.status} color={selectedTask.status ? 'white' : 'secondary'}>{selectedTask.points.score} / {selectedTask.points.total}</Typography>
                                </div>
                            </div>
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
                        showCongratDlg && <Dialog className={cn('congrate-dlg')}
                            show={showCongratDlg}
                            onClose={() => this.setState({ showCongratDlg: false })}>

                            <Typography color={colors['white']} className={cn('cong-title')}>Congratulations!</Typography>
                            <Typography color={colors['white']} variant='body'>Here are your 4 points. Well deserved, my friend. Well deserved!</Typography>

                            <div className={cn('points-icon')}>
                                <SvgIcon name="points-icon" />

                                <div className={cn('points')}>
                                    <SvgIcon name="medal" />
                                    <Typography variant="body"> +4</Typography>
                                </div>
                            </div>

                            <Typography color={colors['white']} variant='body'>Share your result:</Typography>

                            <div className={cn('share-icons')}>
                                <SvgIcon name="social-twitter" className={cn('tw-icon')} />
                                <SvgIcon name="social-fb" />
                            </div>

                            <SvgIcon name="ellipse-solid" className={cn('ellipse-solid')} />
                            <SvgIcon name="plus-solid" className={cn('plus-solid')} />
                        </Dialog>
                    }
                </div>
            </ContentLayout >
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