import React from 'react';
import PropTypes from 'prop-types';

import colors from '../../constants/Colors';
import { BaseComponent, Typography, CongratsAlarm, PerformerItem } from '../shared';

class DashboardPerformer extends BaseComponent {

    render() {
        const { performers } = this.props;

        return (
            <div className='bcd-performer'>
                <CongratsAlarm className='congrats'>
                    <Typography variant='body' color={colors['white']}>
                        Your result is better than of <b>75%</b> of Captains this week!
                    </Typography>
                </CongratsAlarm>
                <div className='content'>
                    <div className='content-header'>
                        <Typography className='content-title'>This week Top Performers</Typography>
                        <span className='view-all' onClick={() => { }}>Full Leaderboard</span>
                    </div>
                    {
                        performers.map((performer, index) => (
                            <PerformerItem
                                key={index}
                                performer={performer}
                                rank={index + 1} />
                        ))
                    }
                </div>
            </div>
        );
    }
}

DashboardPerformer.propTypes = {
    performers: PropTypes.array
};

export default DashboardPerformer;