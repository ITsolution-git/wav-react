import React  from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Row, Col } from 'react-bootstrap';
import ReadMoreAndLess from 'react-read-more-less';
import cn from 'classnames';

import Spinner from '../shared/Spinner';
import BaseComponent from '../shared/BaseComponent';
import SvgIcon from '../shared/SvgIcon';
import Dialog from '../shared/Dialog';
import Paper from '../shared/Paper';
import Typography from '../shared/Typography';
import VoterAvatar from '../shared/VoterAvatar'
import routes from '../../constants/Routes';
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

class TaskList extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showTipsModal: false,
            selectedTaskNo: 0,
            tasks: [
                {   
                    task_id: 0,
                    title:'Help 5 people register for voting',
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
                                avatar: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png'
                            }
                        }
                    ],
                    description: `I am making an online multiplayer game in Javascript, using Node.js, Websockets.io, and using p5.js as the drawing library. The game has a variety of errors and issues that need to be fixed, as well as polishing some preexisting features, as well as updating and smoothing out my current circle to circle collision system. 

                    I need someone who is confident that they can help my game look and feel professional within a timely manner, and have everything work as well as I want it to work. 
                    
                    I have examples on how I want everything to look and behave that you can take a look at when we talk. 
                    
                    I may have more work for you in the future, as I expand my game output. This could be the start of a relationship if you are interested in continuing to work with me.`
                },
                {   
                    task_id: 1,
                    title:'Request a ballot for 1 person',
                    status: 0, // 0: in progress, 1: completed
                    points: {
                        score: 4,
                        total: 10
                    },
                    start_date: '30 May 2019',
                    end_date: '30 May 2019',
                    sub_tasks: [
                        {
                            status: 0, //0 : in progress, 1: done
                        }
                    ],
                    description: "How to talk to your voters about what you are involved in. Different for different people. Regular voters say they will vote anyway. These are a good group to get to become captains..."
                },
                {   
                    task_id: 2,
                    title:'Confirm registration information for 3 people',
                    status: 1, // 0: in progress, 1: completed
                    points: {
                        score: 10,
                        total: 10
                    },
                    start_date: '30 May 2019',
                    end_date: '30 May 2019',
                    sub_tasks: [
                        {
                            status: 1, //0 : in progress, 1: done
                        }
                    ],
                    description: "How to talk to your voters about what you are involved in. Different for different people. Regular voters say they will vote anyway. These are a good group to get to become captains..."
                },
                {   
                    task_id: 3,
                    title:'Inform 3 people on their polling place location',
                    status: 1, // 0: in progress, 1: completed
                    points: {
                        score: 20,
                        total: 20
                    },
                    start_date: '30 May 2019',
                    end_date: '30 May 2019',
                    sub_tasks: [
                        {
                            status: 1, //0 : in progress, 1: done
                        },
                        {
                            status: 1, //0 : in progress, 1: done
                        }
                    ],
                    description: "How to talk to your voters about what you are involved in. Different for different people. Regular voters say they will vote anyway. These are a good group to get to become captains..."
                }
            ]
        };
    }

    goToTask = (task, taskRoute) => {
        const { state } = task.voter_metaData || {};
        this.props.actions.getStateInfo(state);
        this.onLink(`${taskRoute}?taskId=${task._id}`);
    };

    componentWillMount() {
        this.props.actions.loadTaskList();
    }

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

    render() {
        const { taskList: {
            // tasks = [],
            isFetching
        }} = this.props;
        const { showTipsDialog, tasks, selectedTaskNo } = this.state;
        const viewProps = this.getViewProps();
        const selectedTask = tasks[selectedTaskNo]
        return (
            

            <div className='bwt-task-list'>
                <ul className={'tabs'}>
                    <li className={'active'}>All actions</li>
                    <li>In progress</li>
                    <li>Completed</li>
                </ul>

                <div className={'actions-content'}>
                    <div className={'actions'}>
                        {
                            tasks.map(task => 
                                <Paper className={'action'} key={task.task_id}>
                                    <div className={'action-header'}>
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
                                    <Typography className={'task-done'} lightColor>Tasks done: {getCompletedTasksCount(task)} / {task.sub_tasks.length}</Typography>
                                </Paper>
                            )
                        }
                        
                    </div>

                    <Paper className={'selected-action'}>
                        <div className={'header'}>
                            <div className={'action-status'}>
                                <SvgIcon name={selectedTask.status ? 'action-status-completed' : 'action-status-inprogress'}/>
                                <Typography className={'status-text'} variant="functional" lightColor>{selectedTask.status ? 'Completed' : 'In progress'}</Typography>
                            </div>

                            <div className={'action-points'}>
                                <Typography variant='functional' lightColor>Points earned: </Typography>
                                <SvgIcon name='medal' />
                                <Typography className={'points-text'} variant="functional">{selectedTask.points.score} / {selectedTask.points.total}</Typography>    
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

                            <Typography className={'active-task-title'}>Active tasks({selectedTask.sub_tasks.length - getCompletedTasksCount(selectedTask)})</Typography>
                            
                            {
                                selectedTask.sub_tasks.map(sub_task =>
                                    <div className={'sub_task-item'} key={sub_task.sub_task_id}>
                                        <div className={'voter-detail'}>
                                            <VoterAvatar initials={sub_task.voter.initials} src={sub_task.voter.avatar} color={sub_task.voter.status == 'not-registered' ? 'error' : sub_task.voter.status == 'in-frequent' ? 'alert' : 'success'} />
                                            <div className={'voter-general'}>
                                                <Typography className={'voter-name'}>{sub_task.voter.name}</Typography>

                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </Paper>
                </div>
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