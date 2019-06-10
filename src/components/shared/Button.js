import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import BaseComponent from '../shared/BaseComponent';

class Button extends BaseComponent {

    render() {
        const {
            size='large',
            color = 'blue',
            className,
            children,
            onClick = () => {},
            ...restProps
        } = this.props;

        return (
            <button className={classNames('btw-button', `button-${size}`, `button-${color}`, className)}
                    onClick={onClick}
                    {...restProps}>
                { children }
            </button>
        )
    }
}

Button.propTypes = {
    size: PropTypes.oneOf(['large', 'medium', 'small']),
    color: PropTypes.oneOf(['blue', 'white' ])
};

export default Button;