import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import BaseComponent from '../shared/BaseComponent';
import VoterProfile from './VoterProfile';

class VoterDetail extends BaseComponent {

    render() {
        const { selectedVoter, changeStatusHandler } = this.props;

        return (
            <div className={classNames('btw-voter-detail-info btw-paper')}>
                <VoterProfile selectedVoter={selectedVoter} changeStatusHandler={changeStatusHandler} />
            </div>
        );
    }
}

VoterDetail.propTypes = {
    selectedVoter: PropTypes.object,
    changeStatusHandler: PropTypes.func
};

export default VoterDetail;
