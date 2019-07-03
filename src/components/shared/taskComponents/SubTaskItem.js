import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {
    BaseComponent,
    Button,
    SocialList,
    StatusIcon, SvgIcon, Typography, VoterAvatar
} from '../index';
import { getColorByStatus } from '../../../constants/Colors';

class SubTaskItem extends BaseComponent {

    renderVoter = () => {
        const { subTask: { voter } } = this.props

        return (
            <div className='voter-info' >
                <VoterAvatar
                    src={voter.src}
                    firstName={voter.firstName}
                    lastName={voter.lastName}
                    color={getColorByStatus(voter.status)} />
                <div className='voter-detail'>
                    <Typography
                        variant='body'
                        fontWeight='600'
                        className='voter-name'>
                        {voter.firstName} {voter.lastName}
                    </Typography>
                    <div className='voter-social'>
                        <StatusIcon type={voter.status} noBorder />|
                        <SocialList social={voter.social} className='voter-status' />
                    </div>
                </div>
            </div>
        );
    }

    renderSubTask = () => {
        const { subTask, status, hideSubTask, onMarkAsDone } = this.props

        if (!hideSubTask) {
            return (
                <div className='sub-task-info'>
                    <SvgIcon name='medal' />
                    <Typography variant="functional">{subTask.points}</Typography>
                    {!status &&
                        <Button
                            size='small'
                            color='white'
                            className='mark-button'
                            onClick={() => onMarkAsDone(subTask)}>
                            Mark as Done
                        </Button>
                    }
                </div>
            )
        }
    }

    render() {
        const { subTask, status, hideSubTask, onMarkAsDone } = this.props;

        return (
            <div className={classNames('btw-subtask-item', { 'completed-subtask': status, 'hide-subtask': hideSubTask })}>
                <div className='item-content'>
                    {this.renderVoter()}
                    {this.renderSubTask()}
                </div>
                {!status &&
                    <Button
                        size='small'
                        color='white'
                        className='footer-mark-button'
                        fullWidth
                        onClick={() => onMarkAsDone(subTask)}>
                        Mark as Done
                    </Button>
                }
            </div>
        )
    }
}

SubTaskItem.propTypes = {
    subTask: PropTypes.object,
    status: PropTypes.number,
    hideSubTask: PropTypes.bool,
    onMarkAsDone: PropTypes.func
};

SubTaskItem.defaultProps = {
    status: 0,
    hideSubTask: false,
    onMarkAsDone: () => { }
};

export default SubTaskItem;