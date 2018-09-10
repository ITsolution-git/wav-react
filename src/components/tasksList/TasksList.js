import React  from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Row, Col } from 'react-bootstrap';

import { loadTaskList } from '../../actions/TaskListAction';
import Spinner from '../shared/Spinner';
import { resolveTaskData } from '../../helpers/TaskHelper';
import BaseComponent from '../shared/BaseComponent';
import { getStateInfo } from '../../actions/TaskAction';
import ContentLayout from '../layout/ContentLayout';

class TaskList extends BaseComponent {
    constructor(props, context) {
        super(props, context);
    }

    goToTask = (task, taskRoute) => {
        this.props.actions.getStateInfo(task.voter_metaData.state);
        this.onLink(`${taskRoute}?taskId=${task._id}`);
    };

    componentWillMount() {
        this.props.actions.loadTaskList();
    }

    render() {
        const { taskList: {
            tasks = [],
            isFetching
        }} = this.props;

        return (
            <ContentLayout>
                <div className='bwt-task-list container'>
                    { !this.isMobile() && this.renderBackToHome()}
                    <Spinner height={300} loading={isFetching} />
                    <div className='task-list'>
                        { !tasks.length && <h1 style={{color:"black"}}>You have no new tasks.</h1>}
                        { tasks.map((task, i) => {
                            const taskData = resolveTaskData(task);
                            return (
                                <Col key={i} md={16} xs={16}
                                     onClick={() => this.goToTask(taskData, taskData.route)}
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