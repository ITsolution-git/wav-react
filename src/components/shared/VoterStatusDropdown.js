import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import classNames from 'classnames';

const VoterStatusDropdown = ({ className, status, onSelect, ...restProps }) => {

    const options = [
        { value: 'Not registered', label: 'Not registered', className: 'bss-not-registered' },
        { value: 'Infrequent', label: 'Infrequent', className: 'bss-infrequent' },
        { value: 'Regular', label: 'Regular', className: 'bss-regular' }
    ];

    const handleChange = (option) => {
        onSelect(option.value)
    }

    return (
        <Select className={classNames('btw-voter-status-select', className)}
            options={options}
            value={status}
            onChange={handleChange}
            {...restProps}
        />
    )
};

VoterStatusDropdown.propTypes = {
    status: PropTypes.string,
    onSelect: PropTypes.func
};

export default VoterStatusDropdown;
