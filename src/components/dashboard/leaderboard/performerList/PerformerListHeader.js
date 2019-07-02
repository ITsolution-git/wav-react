import React from 'react';

import { BaseComponent, Typography } from '../../../shared';

class PerformerListHeader extends BaseComponent {

    render() {
        return (
            <div className='blb-performer-header'>
                <div className='info'>
                    <Typography variant='body' className='rank'>
                        Rank
                    </Typography>
                    <Typography variant='body' className='caption'>
                        Captain
                    </Typography>
                </div>
                <div className='status'>
                    <Typography variant='body' className='Task'>
                        Tasks done
                    </Typography>
                    <Typography variant='body' className='points'>
                        Points earned
                    </Typography>
                </div>
            </div>
        );
    }
}

export default PerformerListHeader;