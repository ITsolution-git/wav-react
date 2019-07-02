import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent, Typography, SvgIcon, VoterAvatar } from '../index';

class PerformerRank extends BaseComponent {

    renderRankContent = () => {
        const { rank } = this.props;

        return rank <= 3 ?
            <SvgIcon name={`place-${rank}`} className='place' /> :
            <Typography variant='body' className='place'>
                {`${rank}.`}
            </Typography>
    }

    render() {
        const { performer } = this.props;

        return (
            <div className='btw-performer-rank'>
                {this.renderRankContent()}
                <VoterAvatar
                    firstName={performer.firstName}
                    lastName={performer.lastName}
                    src={performer.src}
                    status='Regular' />
            </div>
        )
    }
}

PerformerRank.propTypes = {
    performer: PropTypes.object,
    rank: PropTypes.number
};

export default PerformerRank;