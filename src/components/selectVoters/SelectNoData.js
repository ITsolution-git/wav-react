import React from 'react';

import Typography from '../shared/Typography';
import SvgIcon from '../shared/SvgIcon';

const SelectNoData = () => {

    return (
        <div className='btw-select-no-data'>
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

export default SelectNoData;