import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { BaseComponent, Typography, SvgIcon } from '../../shared';

class TaskDetailHeader extends BaseComponent {

    render() {
        const { task: { status, points } } = this.props;
        const isCompleted = status === 'completed';

        return (
            <div className={classNames('btw-task-detail-header', { 'completed-header': isCompleted })}>
                <div className='status-text'>
                    <SvgIcon name={isCompleted ? 'action-status-completed' : 'action-status-inprogress'} />
                    <Typography
                        lightColor
                        variant='functional'
                        className={classNames('status-title', { 'completed-text': isCompleted })}>
                        {isCompleted ? 'Completed' : 'In progress'}
                    </Typography>
                </div>
                <div className={'status-content'}>
                    <Typography
                        lightColor
                        variant='functional'
                        className={classNames({ 'completed-text': isCompleted })}>
                        Points earned:
                    </Typography>
                    <SvgIcon name='medal' className='medal-icon' />
                    <Typography
                        lightColor
                        variant='functional'
                        className={classNames({ 'completed-text': isCompleted })}>
                        {points.score} / {points.total}
                    </Typography>
                </div>
            </div >
        );
    }
}

TaskDetailHeader.propTypes = {
    task: PropTypes.object
};

export default TaskDetailHeader;