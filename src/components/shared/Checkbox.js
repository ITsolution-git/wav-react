import React from 'react';
import cn from 'classnames';

const Checkbox = ({ className, name, onChange }) => {
    return (
        <label className={cn('btw-checkbox', className)}>
            {name}
            <input
                type='checkbox'
                onChange={onChange} />
            <span className='checkmark' />
        </label>
    )
};

export default Checkbox;