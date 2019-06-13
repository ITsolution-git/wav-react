import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import BaseComponent from '../shared/BaseComponent';
import Button from '../shared/Button';
import Typography from '../shared/Typography';
import SocialList from '../shared/SocialList';

class SocialInfo extends BaseComponent {

    render() {
        const { social, onSocialConnect, className } = this.props;

        return (
            <div className={classNames('btw-social-info btw-paper', className)}>
                <SocialList social={social} size='medium' />
                <div className='info-content'>
                    <Typography className='title'>
                        Connect social media accounts
                    </Typography>
                    <Typography variant='body'>
                        With connected social media accounts, it is much easier
                        to find voters that you already know in real life.
                    </Typography>
                </div>
                <Button
                    className='connect-button'
                    onClick={onSocialConnect}
                    color='white'>
                    Connect
                </Button>
            </div>
        );
    }
}

SocialInfo.propTypes = {
    social: PropTypes.object,
    onSocialConnect: PropTypes.func
};

export default SocialInfo;
