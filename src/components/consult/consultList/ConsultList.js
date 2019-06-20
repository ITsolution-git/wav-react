import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent } from '../../shared';

class ConsultList extends BaseComponent {

    constructor() {
        super();
        this.state = {
            isShowAll: false
        }
    }

    render() {

        return (
            <div className='btw-consult-list btw-paper'>
                dsfsdfsdf
            </div>
        );
    }
}

ConsultList.propTypes = {
    sortType: PropTypes.array,
    selectedSort: PropTypes.string,
    searchString: PropTypes.string,
    onSearch: PropTypes.func,
    onSelectSort: PropTypes.func
};

export default ConsultList;