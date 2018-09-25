import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import BaseComponent from '../shared/BaseComponent';
import {
    loadReferendumInfo,
    loadElectionContestInfo,
    loadPollingLocationInfo
} from '../../actions/VoterListAction';

class VotingInfo extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        referendumInfo: state.votingInfo,

    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ loadReferendumInfo, loadElectionContestInfo, loadPollingLocationInfo  }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VotingInfo));
