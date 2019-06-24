import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent, Typography } from '../index';
import { VoterActionItem } from './index';

class VoterAction extends BaseComponent {
    render() {
        const { tasks } = this.props;

        return (
            <div className='btw-voter-action'>
                <Typography className='title'>
                    Actions with this voter
                </Typography>
                {tasks.map((task, index) => (<VoterActionItem task={task} key={index} />))}
            </div>
        );
    }
}

VoterAction.propTypes = {
    tasks: PropTypes.array
};

export default VoterAction;