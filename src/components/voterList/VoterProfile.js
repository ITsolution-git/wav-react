import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import BaseComponent from '../shared/BaseComponent';
import VoterAvatar from '../shared/VoterAvatar';
import Typography from '../shared/Typography';
import VoterStatusDropdown from '../shared/VoterStatusDropdown';

class VoterProfile extends BaseComponent {
    constructor() {
        super();
        this.state = {
            selectedVoter: {
                id: 1,
                name: 'Denis Damin 1',
                street: 'New work Sr. 1289',
                sex: 'Male',
                avatar: 'https://images.unsplash.com/photo-1520484033379-7f74cc7d7340?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                social: {
                    twitter: false,
                    linkedIn: false,
                    facebook: true
                },
                status: 'Infrequent'
            }
        }
    }

    changeStatusHandler = (value) => {
        const { selectedVoter } = this.state;

        this.setState({
            selectedVoter: {
                ...selectedVoter,
                status: value
            }
        })
    }

    render() {
        const { selectedVoter } = this.state;

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
                <VoterStatusDropdown status={selectedVoter.status} onSelect={this.changeStatusHandler} />
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