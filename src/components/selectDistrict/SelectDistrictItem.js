import React from 'react';

import BaseComponent from '../shared/BaseComponent';
import Typography from '../shared/Typography';
import readioIcon from '../../resources/icons/radio-button.svg';
import readioSelectedIcon from '../../resources/icons/radio-button-selected.svg';

class SelectDistrictItem extends BaseComponent {

    render() {
        const { isSelected, districtName, handleSelect } = this.props;

        return(
            <div className={'district-item'} onClick={handleSelect}>
                <img src={isSelected ? readioSelectedIcon : readioIcon}
                    alt=""/>
                <Typography 
                    variant={'functional'} 
                    className={'district-name'}>{districtName}</Typography>
            </div>
        );
    }
}

export default SelectDistrictItem;