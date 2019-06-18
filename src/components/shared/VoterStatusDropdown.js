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





// class StatusSelect extends BaseComponent {


//     render() {

//         return (
//             // <select className='btw-status-select'>
//             //     <option value='Not registered' className='bss-not-registered'>Not registered</option>
//             //     <option value='Infrequent' className='bss-infrequent'>Infrequent</option>
//             //     <option value='Regular' className='bss-regular'>Regular</option>
//             // </select>

//             <Select className='btw-status-select'
//                 // defaultValue={options[0]}
//                 formatOptionLabel={formatOptionLabel}
//                 options={options}
//             />
//         );
//     }
// }

// StatusSelect.propTypes = {
//     onSelect: PropTypes.func
// };

// export default StatusSelect;
