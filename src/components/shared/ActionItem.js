import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { BaseComponent, Typography, TaskProgressBar, SvgIcon, Paper } from './index';

class ActionItem extends BaseComponent {

    getCompletedTasksCount(task) {
        
        return task.subTasks.filter(subTask => subTask.status).length;
    }

    handleClick = () => {
        this.props.onSelectTask(this.props.task);
    }

    render() {
        const { task, className } = this.props

        return (
            <Paper className={cn(className, 'btw-action-item')}>
                <div onClick={this.handleClick}>
                    <div className={'btw-action-header'}>
                        <div className={'btw-action-status'}>
                            <SvgIcon name={task.status ? 'action-status-completed' : 'action-status-inprogress'}/>
                            <Typography className={'btw-status-text'} variant="functional" lightColor>{task.status ? 'Completed' : 'In progress'}</Typography>
                        </div>

                        <div className={'btw-action-points'}>
                            <SvgIcon name='medal' />
                            <Typography className={'btw-points-text'} variant="functional">{task.points.score} / {task.points.total}</Typography>    
                        </div>
                    </div>

                    <Typography className={'btw-action-title'}>{task.title}</Typography>
                    <Typography className={'btw-action-duration'} lightColor variant="functional">{task.start_date} – {task.end_date}</Typography>
                    <TaskProgressBar total={task.subTasks.length}
                        completedNumber={this.getCompletedTasksCount(task)}
                    />
                    <Typography className={'btw-task-done'} lightColor variant="functional">Tasks done: {this.getCompletedTasksCount(task)} / {task.subTasks.length}</Typography>
                    
                </div>
            </Paper>
        );
    }
}

ActionItem.defaultProps = {
   task: {},
   onSelectTask: () => {}
};

ActionItem.propTypes = {
    // action task
    task: PropTypes.object.isRequired,

    //click event
    onSelectTask: PropTypes.func.isRequired,
    
};

export default ActionItem;