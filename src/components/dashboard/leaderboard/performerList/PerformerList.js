import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent, PerformersTable } from '../../../shared';
import { PerformerFilters } from './index';

class PerformerList extends BaseComponent {

    render() {
        const { performers } = this.props;

        return (
            <div className='btw-performer-list btw-paper'>
                <PerformerFilters {...this.props} />
                <PerformersTable
                    data={performers}
                />
            </div>
        );
    }
}

PerformerList.propTypes = {
    performers: PropTypes.array,
    filterTypes: PropTypes.array,
    selectedFilter: PropTypes.string,
    searchString: PropTypes.string,
    onSearch: PropTypes.func,
    onSelectFilter: PropTypes.func
};

export default PerformerList;