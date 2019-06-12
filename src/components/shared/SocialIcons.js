import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from './Icon';
import BaseComponent from './BaseComponent';

class SocialIcons extends BaseComponent {

    renderSmallIcon = (name, value, height) => {

        return (
            <div className={classNames('icon icon-small', value && name)} >
                {value && <Icon name={`${name}-light`} height={height} />}
            </div >
        );
    }

    renderMediumIcon = (name, value, height) => {

        return (
            <div className={classNames('icon icon-medium', value ? name : 'default')} >
                <Icon name={`${name}-${value ? 'light' : 'grey'}`} height={height} />
            </div >
        );
    }

    renderIcon = (name, value) => {
        const { size } = this.props;
        const isSmall = size === 'small';
        const height = isSmall ? 8 : 12;

        return isSmall ?
            this.renderSmallIcon(name, value, height) :
            this.renderMediumIcon(name, value, height)
    }

    render() {
        const { social } = this.props;

        return (
            <div className='btw-social-icons'>
                {this.renderIcon('twitter', social.twitter)}
                {this.renderIcon('linkedIn', social.linkedIn)}
                {this.renderIcon('facebook', social.facebook)}
            </div>
        );
    }
}

SocialIcons.propTypes = {
    social: PropTypes.object,
    size: PropTypes.oneOf(['medium', 'small'])
};

SocialIcons.defaultProps = {
    size: 'small'
}

export default SocialIcons;
