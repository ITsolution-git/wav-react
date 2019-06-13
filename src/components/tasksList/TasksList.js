import React  from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Row, Col } from 'react-bootstrap';

import Spinner from '../shared/Spinner';
import BaseComponent from '../shared/BaseComponent';
import Icon from '../shared/Icon';
import Dialog from '../shared/Dialog';
import Paper from '../shared/Paper';
import Typography from '../shared/Typography';
import routes from '../../constants/Routes';
import { getStateInfo } from '../../actions/TaskAction';
import { loadTaskList } from '../../actions/TaskListAction';
import ContentLayout from '../layout/ContentLayout';
import { resolveTaskData } from '../../helpers/TaskHelper';

class TaskList extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showTipsModal: false,
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
                            status: 0, //0 : in progress, 1: done
                        }
                    ]
                },
                {   
                    task_id: 1,
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
                            status: 0, //0 : in progress, 1: done
                        }
                    ]
                },
                {   
                    task_id: 2,
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
                            status: 0, //0 : in progress, 1: done
                        }
                    ]
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
            tasks = [],
            isFetching
        }} = this.props;
        const { showTipsDialog } = this.state;
        const viewProps = this.getViewProps();

        return (
            
                <div className='bwt-task-list'>
                    <ul className={'tabs'}>
                        <li className={'active'}>All actions</li>
                        <li>In progress</li>
                        <li>Completed</li>
                    </ul>

                    <div className={'actions-content'}>
                        <div className={'actions'}>
                            <Paper className={'action'}>
                                <div className={'action-header'}>
                                    <div className={'action-status'}>
                                        <Icon name='action-status-inprogress'
                                            ext='svg'
                                            width='11'
                                            heigh='11'/>
                                        <Typography className={'status-text'} variant="functional" lightColor>In prgress</Typography>
                                    </div>

                                    <div className={'action-points'}>
                                        <Icon name='medal'
                                            ext='svg'
                                            width='16'
                                            heigh='16'/>
                                        <Typography className={'points-text'} variant="functional">4 / 20</Typography>    
                                    </div>
                                </div>

                                <Typography className={'action-title'}>Help 5 people register for voting</Typography>
                                <Typography className={'action-duration'} lightColor>30 May 2019 – 30 June 2019</Typography>

                                <Typography className={'task-done'} lightColor>Tasks done: 1 / 5</Typography>
                            </Paper>
                        </div>

                        <div className={'active-action'}>
                            hi
                        </div>
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