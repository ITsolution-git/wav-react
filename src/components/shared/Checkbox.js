import React from 'react';
import cn from 'classnames';

const Checkbox = ({ className, label, onChange, checked }) => {
    return (
        <label className={cn('btw-checkbox', className)}>
            {label}
            <input
                type='checkbox'
                onChange={onChange}
                checked={checked} />
            <span className='checkmark' />
        </label>
    )
};

export default Checkbox;