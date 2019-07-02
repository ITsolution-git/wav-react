import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent } from '../../../shared';

class PerformerListItem extends BaseComponent {

    render() {
        return (
            <div className='blb-performer-item'>
                performer
            </div>
        );
    }
}

PerformerListItem.propTypes = {
    performer: PropTypes.array
};

export default PerformerListItem;