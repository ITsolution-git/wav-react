import React  from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Button, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';

import { loadTaskList } from '../../actions/TaskListAction';
import BaseComponent from '../shared/BaseComponent';

class TaskList extends BaseComponent {
    constructor(props, context) {
        super(props, context);
    }

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
                            <Col key={i} md={16} xs={16} className='task'>
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