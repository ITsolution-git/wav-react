import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';

import BaseComponent from '../shared/BaseComponent';
import { nextNumberPersist, resetVoterState } from '../../actions/VoterAction';
import { btwSignOn } from '../../actions/SignOnAction';
import routes from '../../constants/Routes';
import voterConstants from '../../constants/VoterConstants';
import authStorage from '../../storage/AuthStorage';

class NextButton extends BaseComponent {

    onNext = () => {
        const { voter, actions } = this.props;
        if (voter.currentNumber === voterConstants.VOTERS_COUNT) {
            const { username, password } = authStorage.getRegisteredCreds() || {};
            actions.resetVoterState();
            actions.btwSignOn(username, password);
            authStorage.clearRegisteredCreds();
            this.redirectToHome();
            return;
        }
        actions.nextNumberPersist();
        this.onLink(routes.voterDetail);
    };

    render() {
        const { title = 'Next' } = this.props;
        return (
            <Button className='btn btn-primary'
                    onClick={this.onNext}>
                { title }
            </Button>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        voter: state.voter
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ nextNumberPersist, resetVoterState, btwSignOn }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NextButton));