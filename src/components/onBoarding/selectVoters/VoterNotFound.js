import React from 'react';

import { SvgIcon, Typography } from '../../shared';

const VoterNotFound = () => {

    return (
        <div className='btw-voter-not-found'>
            <SvgIcon name='no-data' height='48' />
            <div className='info-content'>
                <Typography className='title'>
                    What a pity!
                </Typography>
                <Typography variant='body' className='description'>
                    It seems like there is no Dennis Holman in your district.
                    Try serching for somebody more local.
                </Typography>
            </div>
        </div >
    )
};

export default VoterNotFound;