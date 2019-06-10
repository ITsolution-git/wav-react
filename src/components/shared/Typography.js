import React from 'react';
import PropTypes from 'prop-types';

import BaseComponent from './BaseComponent';

class Typography extends BaseComponent {
    render() {
        const { variant = 'heading', color = '', isBold = false, children } = this.props;
        return (
            <span className='btw-typography'>
                { children }
            </span>
        )
    }
}

Typography.propTypes = {
  variant: PropTypes.oneOf(['heading', 'body', 'functional']),
  color: PropTypes.string,
  isBold: PropTypes.boolean
};

export default Typography;