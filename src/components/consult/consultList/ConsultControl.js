import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent, SearchInput } from '../../shared';

class ConsultControl extends BaseComponent {

    constructor() {
        super();
        this.state = {
            isShowAll: false
        }
    }

    render() {
        const { onSearch } = this.props;

        return (
            <div className='btw-consult-control'>
                <SearchInput
                    placeholder='Search among 875 questions'
                    onChange={onSearch}
                    className='search-input' />
            </div>
        );
    }
}

ConsultControl.propTypes = {
    sortType: PropTypes.array,
    selectedSort: PropTypes.string,
    searchString: PropTypes.string,
    onSearch: PropTypes.func,
    onSelectSort: PropTypes.func
};

export default ConsultControl;