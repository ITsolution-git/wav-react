import React from 'react';
import PropTypes from 'prop-types';
import ReadMoreAndLess from 'react-read-more-less';

import { BaseComponent, Typography, SubTaskItem } from '../../shared';

class TaskDetailContent extends BaseComponent {

    getSubtasksCount = (status) => {
        const { task: { subTasks } } = this.props;
        const value = status === 'completed' ? 1 : 0;

        return subTasks.filter(subTask => subTask.status === value).length;
    }

    renderTaskInfo = () => {
        const { task } = this.props;

        return (
            <div className='task-info'>
                <Typography>{task.title}</Typography>
                <Typography variant='body' lightColor className='task-duration'>
                    {task.start_date} – {task.end_date}
                </Typography>
                <ReadMoreAndLess charLimit={250}
                    readMoreText=' Read more'
                    readLessText=' Read less'>
                    {task.description}
                </ReadMoreAndLess>
            </div>
        );
    }

    renderProgressTaskList = () => {
        const { task: { status, subTasks }, onMarkAsDone } = this.props;

        if (status === 'inProgress') {
            return (
                <div className='subtask-contents'>
                    <Typography variant='body' fontWeight='600' className='subtask-title'>
                        Active tasks ({this.getSubtasksCount('progress')})
                    </Typography>
                    {
                        subTasks.filter((subTask) => subTask.status === 0)
                            .map((subTask, index) => (
                                <SubTaskItem
                                    key={index}
                                    subTask={subTask}
                                    status={0}
                                    onMarkAsDone={onMarkAsDone} />
                            ))
                    }
                </div>
            );
        }
    }

    renderCompletedTaskList = () => {
        const { task: { subTasks } } = this.props;

        if (this.getSubtasksCount('completed') !== 0) {
            return (
                <div className='subtask-contents'>
                    <Typography variant='body' fontWeight='600' className='subtask-title'>
                        Done tasks ({this.getSubtasksCount('completed')})
                    </Typography>
                    {
                        subTasks.filter((subTask) => subTask.status === 1)
                            .map((subTask, index) => (
                                <SubTaskItem
                                    key={index}
                                    subTask={subTask}
                                    status={1} />
                            ))
                    }
                </div>
            );
        }
    }

    render() {
        return (
            <div className='btw-task-detail-content'>
                {this.renderTaskInfo()}
                {this.renderProgressTaskList()}
                {this.renderCompletedTaskList()}
            </div >
        );
    }
}

TaskDetailContent.propTypes = {
    task: PropTypes.object,
    onMarkAsDone: PropTypes.func
};

export default TaskDetailContent;