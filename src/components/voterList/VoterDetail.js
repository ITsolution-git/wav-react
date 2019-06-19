import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { BaseComponent } from '../shared';
import { VoterProfile, VoterCommunication } from './index'

class VoterDetail extends BaseComponent {

    render() {
        const { selectedVoter, changeStatusHandler } = this.props;

        return (
            <div className={classNames('btw-voter-detail-info btw-paper')}>
                <VoterProfile selectedVoter={selectedVoter} changeStatusHandler={changeStatusHandler} />
                <VoterCommunication selectedVoter={selectedVoter} />
            </div>
        );
    }
}

VoterDetail.propTypes = {
    selectedVoter: PropTypes.object,
    changeStatusHandler: PropTypes.func
};

export default VoterDetail;
