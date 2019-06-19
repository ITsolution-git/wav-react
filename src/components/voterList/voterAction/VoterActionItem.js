import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent, Typography, SvgIcon, Button } from '../../shared';

class VoterActionItem extends BaseComponent {

    clickMarkButtonHandler = () => {
    }

    renderMarkButton = (device) => {
        const { task } = this.props;

        if (!task.status) {
            return (
                <Button
                    size='small'
                    color='white'
                    fullWidth={device === 'mobile'}
                    className={`${device}-mark-action-button`}
                    onClick={this.clickMarkButtonHandler}>
                    Mark as Done
                </Button>
            )
        }
    }

    render() {
        const { task } = this.props;

        return (
            <div className='voter-action-item'>
                <div className='action-header'>
                    <SvgIcon name={task.status ? 'action-status-completed' : 'action-status-inprogress'} />
                    <Typography variant='body' className='action-status'>{task.status ? 'Done' : 'Active'}</Typography>
                </div>
                <div className='action-info'>
                    <div>
                        <Typography variant='body'>
                            {task.title}
                        </Typography>
                        <Typography variant='body' lightColor>
                            {`${task.start_date} - ${task.end_date}`}
                        </Typography>
                    </div>
                    <div className='action-control'>
                        <SvgIcon name='medal' />
                        <Typography variant="functional">{task.points}</Typography>
                        {this.renderMarkButton('computer')}
                    </div>
                </div>
                {this.renderMarkButton('mobile')}
            </div>
        );
    }
}

VoterActionItem.propTypes = {
    task: PropTypes.object
};

export default VoterActionItem;