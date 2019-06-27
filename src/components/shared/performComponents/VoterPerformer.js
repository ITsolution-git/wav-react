import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent, Typography, SvgIcon, VoterAvatar } from '../index';

class VoterPerformer extends BaseComponent {

    renderItem = (label, value, isPoint = true) => {
        return (
            <div className='status-item'>
                <Typography variant='body' fontWeight='600' className='status-label'>{label}:</Typography>
                <Typography variant='body' fontWeight='600' className='status-value'>
                    <SvgIcon name={isPoint ? 'medal' : 'action-status-completed'} className='status-icon' />
                    {value}
                </Typography>
            </div>
        );
    }

    renderStatus = () => {
        const { performer: { points, activeTasks } } = this.props;

        return (
            <div className='performer-status'>
                {this.renderItem('Tasks done', activeTasks, false)}
                {this.renderItem('Points earned', points)}
            </div>
        );
    }

    renderPerformer = () => {
        const { rank, performer } = this.props;

        return (
            <div className='performer-info'>
                <SvgIcon name={`place-${rank}`} className='place' />
                <VoterAvatar
                    firstName={performer.firstName}
                    lastName={performer.lastName}
                    src={performer.src}
                    status='Regular' />
                <div className='info'>
                    <Typography variant='body'>
                        {performer.firstName} {performer.lastName}
                    </Typography>
                    <Typography variant='body' lightColor>
                        Level: {performer.level}
                    </Typography>
                </div>
            </div>
        )
    }


    render() {
        return (
            <div className='btw-voter-performer-item btw-paper'>
                {this.renderPerformer()}
                {this.renderStatus()}
            </div >
        )
    }
}


VoterPerformer.propTypes = {
    performer: PropTypes.object,
    rank: PropTypes.number
};

export default VoterPerformer;