import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent, Typography, SvgIcon, Button } from '../../shared';

class ExtraPointTask extends BaseComponent {

    render() {
        const { task: { title, points }, color } = this.props;

        return (
            <div className={`bcd-task-item bcd-task-item-${color} btw-paper`}>
                <div className='item-content'>
                    <Typography variant='functional'>{title}</Typography>
                    <div className='task-status'>
                        <SvgIcon name='medal' className='svg-icon' />
                        <Typography variant='functional'>{points.score}</Typography>
                        <Button size='small' className='mark-button' color='white' onClick={() => { }}>Mark as Done</Button>
                    </div>
                </div>
                <Button size='small' fullWidth className='footer-mark-button' color='white' onClick={() => { }}>Mark as Done</Button>
            </div>
        );
    }
}

ExtraPointTask.propTypes = {
    task: PropTypes.object,
    color: PropTypes.oneOf(['light', 'dark'])
};

ExtraPointTask.defaultProps = {
    color: 'light'
}

export default ExtraPointTask;