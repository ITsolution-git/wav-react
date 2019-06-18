import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import BaseComponent from '../shared/BaseComponent';
import VoterAvatar from '../shared/VoterAvatar';
import Typography from '../shared/Typography';
import StatusSelect from '../shared/StatusSelect';

class VoterProfile extends BaseComponent {

    render() {
        const { selectedVoter } = this.props;

        return (
            <div className={classNames('btw-voter-profile')}>
                <VoterAvatar
                    size={56}
                    initials='SG'
                    src={selectedVoter.avatar}
                    color='error' />
                <Typography className='voter-name'>
                    {selectedVoter.name}
                </Typography>
                <StatusSelect />
                <Typography variant='body' className='voter-info'>
                    {`${selectedVoter.sex} | ${selectedVoter.street}`}
                </Typography>
            </div>
        );
    }
}

VoterProfile.propTypes = {
    selectedVoter: PropTypes.object
};

export default VoterProfile;