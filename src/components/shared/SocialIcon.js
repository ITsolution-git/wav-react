import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Icon, BaseComponent } from '../shared';

class SocialIcon extends BaseComponent {

    getIconHeight = (size) => {

        switch (size) {
            case 'small':
                return 8;
            case 'medium':
                return 12;
            case 'large':
                return 20;
            default:
                return null;
        }
    }

    renderIcon = (name, iconSizeClass, visible, height, enable) => {

        return (
            <div className={classNames('btw-social-icon', iconSizeClass, visible ? name : { 'social-icon-default': enable })} >
                {enable && <Icon name={`${name}-${visible ? 'light' : 'grey'}`} height={height} />}
            </div >
        );
    }

    render() {
        const { name, visible, size } = this.props;
        const height = this.getIconHeight(size);
        const enable = visible || size !== 'small';

        return this.renderIcon(name, `social-icon-${size}`, visible, height, enable);
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
