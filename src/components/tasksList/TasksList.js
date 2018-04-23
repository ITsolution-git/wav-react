import React  from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Row, Col } from 'react-bootstrap';

import { loadTaskList } from '../../actions/TaskListAction';
import routes from '../../constants/Routes';
import taskIds from '../../constants/TaskIds';
import Spinner from '../shared/Spinner';
import BaseComponent from '../shared/BaseComponent';

class TaskList extends BaseComponent {
    constructor(props, context) {
        super(props, context);
    }

    resolveTaskData = (task) => {
        const {
            task_group_id,
            task_description,
            voter_metaData: {
                firstname,
                lastname
            } = {}
        } = task;
        task.route = null;
        task.description = task_description;

        switch (task_group_id) {
            case taskIds.updateYourProfileId: {
                task.route = routes.updateProfileTask;
                break;
            }
            case taskIds.literatureTextId: {
                task.route = routes.literatureTextTask;
                break;
            }
            case taskIds.literatureVideoId: {
                task.route = routes.literatureVideoTask;
                break;
            }
            case taskIds.recruitingVoterId: {
                task.route = routes.recruitingCaptainTask;
                break;
            }
            case taskIds.registerVoterId: {
                task.description = `Help ${firstname} ${lastname} get registered`;
                task.route = routes.registerVoterTask;
                break;
            }
            case taskIds.addVoterId: {
                task.route = routes.addVoterTask;
                break;
            }
            case taskIds.updateVoterProfileId: {
                task.description = `Update ${firstname} ${lastname}'s profile`;
                task.route = routes.updateProfileTask;
                break;
            }
        }
        return task;
    };

    goToTask = (taskId, taskRoute) => {
        this.onLink(`${taskRoute}?taskId=${taskId}`);
    };

    componentWillMount() {
        const { actions, taskList: { isSuccess, error } } = this.props;
        if (!isSuccess && !error) {
            actions.loadTaskList();
        }
    }

    render() {
        const { taskList: {
            tasks = [],
            isFetching
        }} = this.props;

        return (
            <div className='bwt-task-list container'>
                { !this.isMobile() && this.renderBackToHome()}
                <Spinner height={300} loading={isFetching} />
                <div className='task-list'>
                    { !tasks.length && <h1 style={{color:"black"}}>You have no new tasks.</h1>}
                    { tasks.map((task, i) => {
                        const taskData = this.resolveTaskData(task);
                        return (
                            <Col key={i} md={16} xs={16}
                                 onClick={() => this.goToTask(taskData._id, taskData.route)}
                                 className='task' >
                                <div>{ taskData.description }</div>
                            </Col>
                        )
                    })}
                </div>
                <Row>
                    <Col xs={12}>
                        { this.isMobile() && this.renderBackToHome()}
                    </Col>
                </Row>
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
    actions: bindActionCreators({ loadTaskList }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TaskList));