import React  from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Row, Col } from 'react-bootstrap';
import ReadMoreAndLess from 'react-read-more-less';
import cn from 'classnames';

import Spinner from '../shared/Spinner';
import Button from '../shared/Button';
import BaseComponent from '../shared/BaseComponent';
import SvgIcon from '../shared/SvgIcon';
import Dialog from '../shared/Dialog';
import Paper from '../shared/Paper';
import SocialList from '../shared/SocialList'
import TaskProgressBar from '../shared/TaskProgressBar';
import Typography from '../shared/Typography';
import VoterAvatar from '../shared/VoterAvatar'
import routes from '../../constants/Routes';
import colors from '../../constants/Colors';
import { getStateInfo } from '../../actions/TaskAction';
import { loadTaskList } from '../../actions/TaskListAction';
import ContentLayout from '../layout/ContentLayout';
import { resolveTaskData } from '../../helpers/TaskHelper';


function getCompletedTasksCount(task) {
    var count = 0
    task.sub_tasks.map(sub_task => {
        if(sub_task.status) count ++
    })
    return count;
}

function renderSubTasks(sub_tasks, status) {
    return  sub_tasks.map(sub_task => {
        return (
        sub_task.status === status && <div className={'sub_task-item'} key={sub_task.sub_task_id}>
            <div className={'voter-detail'}>
                <VoterAvatar initials={sub_task.voter.initials} src={sub_task.voter.avatar} color={sub_task.voter.status === 'not-registered' ? 'error' : sub_task.voter.status === 'in-frequent' ? 'alert' : 'success'} />
                <div className={'voter-general'}>
                    <Typography className={'voter-name'}>{sub_task.voter.name}</Typography>
                    <div className={'voter-auth-social'}>
                        <Typography variant='functional' color={sub_task.voter.status === 'not-registered' ? colors['error'] : sub_task.voter.status === 'in-frequent' ? colors['alert'] : colors['success']}>{sub_task.voter.status === 'not-registered' ? 'Not registerd' : sub_task.voter.status === 'in-frequent' ? 'Infrequent' : 'Regular'} </Typography> | 
                        <SocialList social={sub_task.voter.social}/>
                    </div>
                </div>
            </div>

            <div className={'sub-task-info'}>
                <SvgIcon name='medal' />
                <Typography variant="functional">{sub_task.points}</Typography>
                { !status && <Button size='small' color='white' className={'mark-as-done'}>Mark as Done</Button>}
                {<SvgIcon name={status? 'mark-done' : 'mark-inprogress'} className={cn('mark-icon')}/>}
            </div>
        </div>
        )
    })
}

function countTaskofCurrentTab(tasks, tab) {
    var count = 0;
    if(tab === 2) {
        return tasks.length
    } else {
        tasks.map(task => {
            if(task.status === tab) {
                count ++
            }
        })
        return count
    }
}

class TaskList extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showTipsModal: false,
            selectedTaskNo: 0,
            selectedTab: 2,
            isShowMobileSelectedDetail: false,
            tasks: [
                {   
                    task_id: 0,
                    title:'Help 5 people register for voting',
                    status: 1, // 0: in progress, 1: completed
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
                                    twitter: 'http://twitter.com',
                                    linkedIn: 'http://linkedin.com',
                                    facebook: 'http://facebook.com'
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
                                    twitter: 'http://twitter.com',
                                    linkedIn: 'http://linkedin.com',
                                    facebook: 'http://facebook.com'
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
                                    twitter: 'http://twitter.com',
                                    linkedIn: 'http://linkedin.com',
                                    facebook: 'http://facebook.com'
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
                    title:'Test',
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
                                    twitter: 'http://twitter.com',
                                    linkedIn: 'http://linkedin.com',
                                    facebook: 'http://facebook.com'
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
                                    twitter: 'http://twitter.com',
                                    linkedIn: 'http://linkedin.com',
                                    facebook: 'http://facebook.com'
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
                                    twitter: 'http://twitter.com',
                                    linkedIn: 'http://linkedin.com',
                                    facebook: 'http://facebook.com'
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
                    title:'Test',
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
                                    twitter: 'http://twitter.com',
                                    linkedIn: 'http://linkedin.com',
                                    facebook: 'http://facebook.com'
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
                                    twitter: 'http://twitter.com',
                                    linkedIn: 'http://linkedin.com',
                                    facebook: 'http://facebook.com'
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
                                    twitter: 'http://twitter.com',
                                    linkedIn: 'http://linkedin.com',
                                    facebook: 'http://facebook.com'
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
                    title:'Test',
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
                                    twitter: 'http://twitter.com',
                                    linkedIn: 'http://linkedin.com',
                                    facebook: 'http://facebook.com'
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
                                    twitter: 'http://twitter.com',
                                    linkedIn: 'http://linkedin.com',
                                    facebook: 'http://facebook.com'
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
                                    twitter: 'http://twitter.com',
                                    linkedIn: 'http://linkedin.com',
                                    facebook: 'http://facebook.com'
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

    goToTask = (task, taskRoute) => {
        const { state } = task.voter_metaData || {};
        this.props.actions.getStateInfo(state);
        this.onLink(`${taskRoute}?taskId=${task._id}`);
    };

    getViewProps = () => {
        if (this.isDesktop()) {
            return {
                titleClass: '',
                taskName: '',
                tileClass: ''
            }
        }
        return {
            titleClass: '',
            taskName: '',
            tileClass: ''
        }
    };

    switchTab = status => () => {
        this.setState({selectedTab: status});
    }

    changeSelectedTask = index => () => {
        this.setState({selectedTaskNo: index})

        if(this.isMobile()) {
            this.setState({isShowMobileSelectedDetail: !this.state.isShowMobileSelectedDetail})
        }
    }

    gotoAll = () => {
        this.setState({
            isShowMobileSelectedDetail: false
        })
    }

    render() {
        const { taskList: {
            // tasks = [],
            isFetching
        }} = this.props;
        const { showTipsDialog, tasks, selectedTaskNo, selectedTab, isShowMobileSelectedDetail } = this.state;
        const viewProps = this.getViewProps();
        const selectedTask = tasks[selectedTaskNo]
        console.log(isShowMobileSelectedDetail)
        return (

            <div className='bwt-task-list'>
                <ul className={'tabs'}>
                    <li className={cn({'active': selectedTab === 2})} onClick={this.switchTab(2)}>All actions</li>
                    <li className={cn({'active': selectedTab === 0})} onClick={this.switchTab(0)}>In progress</li>
                    <li className={cn({'active': selectedTab === 1})} onClick={this.switchTab(1)}>Completed</li>
                </ul>
                
                {
                    countTaskofCurrentTab(tasks, selectedTab) ?
                    <div className={'actions-content'}>
                        <div className={'actions'}>
                            {
                                tasks.map((task, index) => {

                                    return ( (task.status === selectedTab || selectedTab === 2) &&
                                        <Paper className={cn('action', {'task-selected': index === selectedTaskNo})} key={task.task_id}>
                                            <div className={'action-header'}  onClick={this.changeSelectedTask(index)}>
                                                <div className={'action-status'}>
                                                    <SvgIcon name={task.status ? 'action-status-completed' : 'action-status-inprogress'}/>
                                                    <Typography className={'status-text'} variant="functional" lightColor>{task.status ? 'Completed' : 'In progress'}</Typography>
                                                </div>

                                                <div className={'action-points'}>
                                                    <SvgIcon name='medal' />
                                                    <Typography className={'points-text'} variant="functional">{task.points.score} / {task.points.total}</Typography>    
                                                </div>
                                            </div>

                                            <Typography className={'action-title'}>{task.title}</Typography>
                                            <Typography className={'action-duration'} lightColor>{task.start_date} – {task.end_date}</Typography>
                                            <TaskProgressBar total={task.sub_tasks.length}
                                                completedNumber={getCompletedTasksCount(task)}
                                            />
                                            <Typography className={'task-done'} lightColor>Tasks done: {getCompletedTasksCount(task)} / {task.sub_tasks.length}</Typography>
                                        </Paper>
                                    )}
                                )
                            }
                            
                        </div>

                        <Paper className={cn('selected-action', {'mobile-selected-action': isShowMobileSelectedDetail})}>
                            {
                                isShowMobileSelectedDetail && 
                                <div className={cn('mobile-selected-header')}>
                                    <div className={cn('goto-all-actions')}>
                                        <SvgIcon name="arrow-left" onClick={this.gotoAll}/>
                                        <Typography color='white' className={cn('nav-title')}>All actions</Typography>
                                    </div>
                                    <SvgIcon name="navigation"/>
                                </div>
                            }
                            <div className={cn('header', {'completed-selected-header': selectedTask.status})}>
                                <div className={cn('action-status')}>
                                    <SvgIcon name={selectedTask.status ? 'action-status-completed' : 'action-status-inprogress'}/>
                                    <Typography className={'status-text'} variant="functional" lightColor={!selectedTask.status} color={selectedTask.status ? 'white' : 'secondary'}>{selectedTask.status ? 'Completed' : 'In progress'}</Typography>
                                </div>

                                <div className={'action-points'}>
                                    <Typography variant='functional' lightColor={!selectedTask.status} color={selectedTask.status ? 'white' : 'secondary'}>Points earned: </Typography>
                                    <SvgIcon name='medal' />
                                    <Typography className={'points-text'} variant="functional" lightColor={!selectedTask.status} color={selectedTask.status ? 'white' : 'secondary'}>{selectedTask.points.score} / {selectedTask.points.total}</Typography>    
                                </div>
                            </div>
                            <div className={'action-body'}>
                                <Typography>{selectedTask.title}</Typography>
                                <Typography  variant='body' lightColor className={'action-duration'}>{selectedTask.start_date} – {selectedTask.end_date}</Typography>
                                <ReadMoreAndLess charLimit={250}
                                    readMoreText='Read more'
                                    readLessText='Read less'
                                >
                                    {selectedTask.description}
                                </ReadMoreAndLess>

                                {!selectedTask.status && <Typography className={'active-task-title'}>Active tasks({selectedTask.sub_tasks.length - getCompletedTasksCount(selectedTask)})</Typography>}
                                
                                {renderSubTasks(selectedTask.sub_tasks, 0)}

                                <Typography className={'active-task-title'}>Done tasks({getCompletedTasksCount(selectedTask)})</Typography>

                                {renderSubTasks(selectedTask.sub_tasks, 1)}
                            </div>
                        </Paper>
                    </div> :
                    <div className={cn('empty-task')}>
                        
                        <SvgIcon name="task-empty" />
                        <Typography lightColor >Hey! It's empty here.</Typography>
                        <Typography lightColor variant="body">Looks like you don’t have any actions available for now.</Typography>
                    
                    </div>
                }

                
            </div>
           
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