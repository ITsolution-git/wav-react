import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Checkbox = ({ className, label, onChange, checked }) => {
    return (
        <label className={classNames('btw-checkbox', className)}>
            {label}
            <input
                type='checkbox'
                onChange={onChange}
                checked={checked} />
            <span className='checkmark' />
        </label>
    )
};

Checkbox.propTypes = {
    label: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func
};

export default Checkbox;