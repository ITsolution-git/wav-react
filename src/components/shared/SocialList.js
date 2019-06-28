import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { SocialIcon, BaseComponent, SvgIcon } from './index';

class SocialList extends BaseComponent {

    render() {
        const { social, size, className, showVoterFile } = this.props;
        const isLarge = size === 'large';

        return (
            <div className={classNames('btw-social-list', { 'social-list-large': isLarge }, className)}>
                {showVoterFile &&
                    <SvgIcon name='voter-list-file' size={size} className='voter-file' />
                }
                <SocialIcon name='twitter' visible={social.twitter} size={size} />
                <SocialIcon name='linkedIn' visible={social.linkedIn} size={size} />
                <SocialIcon name='facebook' visible={social.facebook} size={size} />
            </div>
        );
    }
}

SocialList.propTypes = {
    social: PropTypes.object,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    showVoterFile: PropTypes.bool
};

SocialList.defaultProps = {
    size: 'small',
    showVoterFile: false
}

export default SocialList;
