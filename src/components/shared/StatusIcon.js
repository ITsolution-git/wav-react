import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import BaseComponent from './BaseComponent';
import Typography from './Typography';

class StatusIcon extends BaseComponent {

    getClassName = (type) => {

        switch (type) {
            case 'Infrequent':
                return 'status-icon-infrequent';
            case 'Regular':
                return 'status-icon-regular';
            case 'Not registered':
                return 'status-icon-not-registered';
            default:
                return null;
        }
    }

    render() {
        const { type, noBorder, className } = this.props;

        return (
            <Typography
                displayInline
                variant='functional'
                className={classNames('btw-status-icon', this.getClassName(type), { 'status-icon-no-border': noBorder }, className)}>
                {type}
            </Typography>
        );
    }
}

StatusIcon.propTypes = {
    type: PropTypes.oneOf(['Infrequent', 'Regular', 'Not registered']),
    noBorder: PropTypes.bool
};

StatusIcon.defaultProps = {
    noBorder: false
}

export default StatusIcon;
