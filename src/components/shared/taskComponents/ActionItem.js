import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { BaseComponent, Typography, TaskProgressBar, SvgIcon, Paper } from '../index';

class ActionItem extends BaseComponent {

    getCompletedTasksCount(task) {
        return task.subTasks.filter(subTask => subTask.status).length;
    }

    handleClick = () => {
        this.props.onSelectTask(this.props.task);
    }

    renderHeader = () => {
        const { task } = this.props

        return (
            <div className='action-header'>
                <div className='action-status'>
                    <SvgIcon name={task.status === 'completed' ? 'action-status-completed' : 'action-status-inprogress'} />
                    <Typography className='status-text' variant='functional' lightColor>
                        {task.status === 'completed' ? 'Completed' : 'In progress'}
                    </Typography>
                </div>

                <div className='action-points'>
                    <SvgIcon name='medal' />
                    <Typography className='points-text' variant='functional' lightColor>
                        {task.points.score} / {task.points.total}
                    </Typography>
                </div>
            </div>
        )
    }

    render() {
        const { task, className } = this.props

        return (
            <Paper className={cn(className, 'btw-action-item')}>
                <div onClick={this.handleClick}>
                    {this.renderHeader()}
                    <Typography className='action-title' variant='functional'>
                        {task.title}
                    </Typography>
                    <Typography className='action-duration' lightColor variant='functional'>
                        {task.start_date} – {task.end_date}
                    </Typography>
                    <TaskProgressBar total={task.subTasks.length}
                        completedNumber={this.getCompletedTasksCount(task)}
                    />
                    <Typography className='task-done' lightColor variant='functional'>
                        Tasks done: {this.getCompletedTasksCount(task)} / {task.subTasks.length}
                    </Typography>
                </div>
            </Paper>
        );
    }
}

ActionItem.defaultProps = {
    task: {},
    onSelectTask: () => { }
};

ActionItem.propTypes = {
    // action task
    task: PropTypes.object.isRequired,

    //click event
    onSelectTask: PropTypes.func.isRequired,

};

export default ActionItem;