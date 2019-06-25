import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent, Typography, SvgIcon, Button } from '../shared';

class DashboardTaskItem extends BaseComponent {

    render() {
        const { task: { title, points }, color } = this.props;

        return (
            <div className={`bcd-task-item bcd-task-item-${color}`}>
                <Typography variant='functional'>{title}</Typography>
                <div className='task-status'>
                    <SvgIcon name='medal' />
                    <Typography variant='functional'>{points.score}</Typography>
                    <Button size='small' className='mark-button' color='white' onClick={() => { }}>Mark as Done</Button>
                </div>
            </div>
        );
    }
}

DashboardTaskItem.propTypes = {
    task: PropTypes.object,
    color: PropTypes.oneOf(['light', 'dark'])
};

DashboardTaskItem.defaultProps = {
    color: 'light'
}

export default DashboardTaskItem;