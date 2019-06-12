import React from 'react';
import PropTypes from 'prop-types';

import SocialIcon from './SocialIcon';
import BaseComponent from './BaseComponent';

class SocialList extends BaseComponent {

    render() {
        const { social, size } = this.props;

        return (
            <div className='btw-social-list'>
                <SocialIcon name='twitter' value={social.twitter} size={size} />
                <SocialIcon name='linkedIn' value={social.linkedIn} size={size} />
                <SocialIcon name='facebook' value={social.facebook} size={size} />
            </div>
        );
    }
}

SocialList.propTypes = {
    social: PropTypes.object,
    size: PropTypes.oneOf(['medium', 'small'])
};

SocialList.defaultProps = {
    size: 'small'
}

export default SocialList;
