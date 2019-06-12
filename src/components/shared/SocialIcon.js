import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from './Icon';
import BaseComponent from './BaseComponent';

class SocialIcon extends BaseComponent {

    renderSmallIcon = (name, value, height) => {

        return (
            <div className={classNames('btw-social-icon social-icon-small', { [name]: value })} >
                {value && <Icon name={`${name}-light`} height={height} />}
            </div >
        );
    }

    renderMediumIcon = (name, value, height) => {

        return (
            <div className={classNames('btw-social-icon social-icon-medium', value ? name : 'social-icon-default')} >
                <Icon name={`${name}-${value ? 'light' : 'grey'}`} height={height} />
            </div >
        );
    }

    renderLargeIcon = (name, value, height) => {

        return (
            <div className={classNames('btw-social-icon social-icon-large', value ? name : 'social-icon-default')} >
                <Icon name={`${name}-${value ? 'light' : 'grey'}`} height={height} />
            </div >
        );
    }

    render() {
        const { name, value, size } = this.props;

        switch (size) {
            case 'small':
                return this.renderSmallIcon(name, value, 8);
            case 'medium':
                return this.renderMediumIcon(name, value, 12);
            case 'large':
                return this.renderLargeIcon(name, value, 20);
            default:
                return null;
        }
    }
}

SocialIcon.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
};

SocialIcon.defaultProps = {
    size: 'small'
}

export default SocialIcon;
