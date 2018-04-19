import React  from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Row, Col } from 'react-bootstrap';

import { loadTaskList } from '../../actions/TaskListAction';
import routes from '../../constants/Routes';
import taskIds from '../../constants/TaskIds';
import BaseComponent from '../shared/BaseComponent';

class TaskList extends BaseComponent {
    constructor(props, context) {
        super(props, context);
    }

    goToTask = (taskId, groupId) => {
        let taskRoute = null;
        switch (groupId) {
            case taskIds.addVoterId: {
                taskRoute = routes.addVoterTask;
                break;
            }
            case taskIds.literatureTextId: {
                taskRoute = routes.literatureTextTask;
                break;
            }
            case taskIds.literatureVideoId: {
                taskRoute = routes.literatureVideoTask;
                break;
            }
            case taskIds.recruitingVoterId: {
                taskRoute = routes.recruitingCaptainTask;
                break;
            }
            case taskIds.registerVoterId: {
                taskRoute = routes.registerVoterTask;
                break;
            }
            case taskIds.updateProfileId: {
                taskRoute = routes.updateProfileTask;
                break;
            }
        }

        this.onLink(`${taskRoute}?taskId=${taskId}`);
    };

    componentWillMount() {
        const { actions, taskList: { isSuccess, error } } = this.props;
        if (!isSuccess && !error) {
            actions.loadTaskList();
        }
    }

    render() {
        const { taskList: { tasks = []}} = this.props;
        return (
            <div className='bwt-task-list container'>
                { !this.isMobile() && this.renderBackToHome()}
                <div className='task-list'>
                    { tasks.map((task, i) => {
                        return (
                            <Col key={i} md={16} xs={16}
                                 onClick={() => this.goToTask(task._id, task.task_group_id)}
                                 className='task' >
                                <div>{ task.task_description }</div>
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