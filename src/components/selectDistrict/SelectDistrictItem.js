import React from 'react';

import BaseComponent from '../shared/BaseComponent';
import Typography from '../shared/Typography';
import SvgIcon from '../shared/SvgIcon';


class SelectDistrictItem extends BaseComponent {

    render() {
        const { isSelected, districtName, handleSelect } = this.props;

        return(
            <div className={'district-item'} onClick={handleSelect}>
                <SvgIcon name={isSelected ? 'radio-button-selected' : 'radio-button'}/>
                <Typography variant={'functional'} 
                    className={'district-name'}>{districtName}</Typography>
            </div>
        );
    }
}

export default SelectDistrictItem;