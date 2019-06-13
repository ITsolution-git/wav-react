import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from './Icon';
import BaseComponent from './BaseComponent';

class SocialIcon extends BaseComponent {

    renderSmallIcon = (name, visible, height) => {

        return (
            <div className={classNames('btw-social-icon social-icon-small', { [name]: visible })} >
                {visible && <Icon name={`${name}-light`} height={height} />}
            </div >
        );
    }

    renderBigIcon = (name, visible, height, iconSizeClass) => {

        return (
            <div className={classNames('btw-social-icon', iconSizeClass, visible ? name : 'social-icon-default')} >
                <Icon name={`${name}-${visible ? 'light' : 'grey'}`} height={height} />
            </div >
        );
    }

    render() {
        const { name, visible, size } = this.props;

        switch (size) {
            case 'small':
                return this.renderSmallIcon(name, visible, 8);
            case 'medium':
                return this.renderBigIcon(name, visible, 12, 'social-icon-medium');
            case 'large':
                return this.renderBigIcon(name, visible, 20, 'social-icon-large');
            default:
                return null;
        }
    }
}

SocialIcon.propTypes = {
    name: PropTypes.string,
    visible: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
};

SocialIcon.defaultProps = {
    size: 'small'
}

export default SocialIcon;
