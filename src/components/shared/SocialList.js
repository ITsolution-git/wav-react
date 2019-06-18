import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { SocialIcon, BaseComponent } from '../shared';

class SocialList extends BaseComponent {

    render() {
        const { social, size, className } = this.props;
        const isLarge = size === 'large';

        return (
            <div className={classNames('btw-social-list', { 'social-list-large': isLarge }, className)}>
                <SocialIcon name='twitter' visible={social.twitter} size={size} />
                <SocialIcon name='linkedIn' visible={social.linkedIn} size={size} />
                <SocialIcon name='facebook' visible={social.facebook} size={size} />
            </div>
        );
    }
}

SocialList.propTypes = {
    social: PropTypes.object,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
};

SocialList.defaultProps = {
    size: 'small'
}

export default SocialList;
