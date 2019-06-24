import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent } from '../../shared';
import { TaskDetailHeader, TaskDetailContent } from './index';

class TaskDetail extends BaseComponent {

    render() {
        const { task } = this.props;

        return (
            <div className='btw-task-list-detail btw-paper'>
                <TaskDetailHeader task={task} />
                <TaskDetailContent {...this.props} />
            </div>
        )
    }
}

TaskDetail.propTypes = {
    task: PropTypes.object,
    onMarkAsDone: PropTypes.func
};

export default TaskDetail;