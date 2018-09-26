import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import BaseComponent from '../shared/BaseComponent';
import {
    loadVotingInfo
} from '../../actions/VoterListAction';

const dataTypes = {
    referendum: 'referendum',
    electionContest: 'electionContest',
    pollingLocation: 'pollingLocation'
};

class VotingInfo extends BaseComponent {
    componentWillMount() {
        const { votingInfo, email, actions } = this.props;
        Object.values(dataTypes).forEach(type => {
            const { isFetching, isSuccess, error } = (votingInfo || {})[type] || {};
            if (!isFetching && !isSuccess && !error) {
                console.log(`${email} ${type}`);
                actions.loadVotingInfo(email, type);
            }
        })
    }

    render() {
        return (
            <div>
                voting info
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        votingInfo: state.votingInfo[ownProps.email],
        email: ownProps.email
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ loadVotingInfo }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VotingInfo));
