import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent, Typography, SvgIcon, Button } from '../../shared';

class VoterActionItem extends BaseComponent {

    clickMarkButtonHandler = () => {
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
                        {!task.status && <Button size='small' color='white' className='mark-action-button' onClick={this.clickMarkButtonHandler}>Mark as Done</Button>}
                    </div>
                </div>
            </div>
        );
    }
}

VoterActionItem.propTypes = {
    task: PropTypes.object
};

export default VoterActionItem;