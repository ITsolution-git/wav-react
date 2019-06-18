import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import BaseComponent from '../shared/BaseComponent';
import VoterProfile from './VoterProfile';

class VoterDetail extends BaseComponent {

    render() {
        const { selectedVoter } = this.props;

        return (
            <div className={classNames('btw-voter-detail-info btw-paper')}>
                <VoterProfile selectedVoter={selectedVoter} />
            </div>
        );
    }
}

VoterDetail.propTypes = {
    selectedVoter: PropTypes.object
};

export default VoterDetail;
