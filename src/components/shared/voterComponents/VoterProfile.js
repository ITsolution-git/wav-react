import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { BaseComponent, VoterAvatar, Typography, VoterStatusDropdown } from '../index';

class VoterProfile extends BaseComponent {

    getAvatarColor = status => {
        switch (status) {
            case 'Infrequent':
                return 'alert';
            case 'Regular':
                return 'success';
            case 'Not registered':
                return 'error';
            default:
                return null;
        }
    }

    render() {
        const { selectedVoter, changeStatusHandler } = this.props;

        return (
            <div className={classNames('btw-voter-profile')}>
                <VoterAvatar
                    size={56}
                    initials='SG'
                    src={selectedVoter.avatar}
                    color={this.getAvatarColor(selectedVoter.status)} />
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