import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import BaseComponent from '../shared/BaseComponent';
import VoterAvatar from '../shared/VoterAvatar';
import Typography from '../shared/Typography';
import VoterStatusDropdown from '../shared/VoterStatusDropdown';

class VoterProfile extends BaseComponent {

    render() {
        const { selectedVoter, changeStatusHandler } = this.props;

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
                <VoterStatusDropdown status={selectedVoter.status} onSelect={changeStatusHandler} />
                <Typography variant='body' className='voter-info'>
                    {`${selectedVoter.sex} | ${selectedVoter.street}`}
                </Typography>
            </div>
        );
    }
}

VoterProfile.propTypes = {
    selectedVoter: PropTypes.object,
    changeStatusHandler: PropTypes.func
};

export default VoterProfile;