import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent } from '../../shared';
import { ConsultControl, ConsultItem } from './index'

class ConsultList extends BaseComponent {

    render() {
        const { consultList } = this.props;

        return (
            <div className='btw-consult-list btw-paper'>
                <ConsultControl {...this.props} />

                {consultList.map((consult, index) => (
                    <ConsultItem key={index} consult={consult} />
                ))}
            </div>
        );
    }
}

ConsultList.propTypes = {
    consultList: PropTypes.array,
    sortTypes: PropTypes.array,
    selectedSort: PropTypes.string,
    searchString: PropTypes.string,
    onSearch: PropTypes.func,
    onSelectSort: PropTypes.func
};

export default ConsultList;