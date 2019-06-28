import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { BaseComponent, VoterAction, VoterProfile, VoterCommunication, CommentsList } from '../index';

class VoterDetail extends BaseComponent {

    render() {
        const { selectedVoter, changeStatusHandler } = this.props;

        return (
            <div className={classNames('btw-voter-detail-info btw-paper')}>
                <VoterProfile selectedVoter={selectedVoter} changeStatusHandler={changeStatusHandler} />
                <VoterCommunication selectedVoter={selectedVoter} />
                <VoterAction tasks={selectedVoter.tasks} />
                <CommentsList comments={selectedVoter.comments}
                              onAdd={comment => {}}
                              onEdit={id => {}}
                              onDelete={id => {}} />
            </div>
        );
    }
}

VoterDetail.propTypes = {
    selectedVoter: PropTypes.object,
    changeStatusHandler: PropTypes.func
};

export default VoterDetail;
