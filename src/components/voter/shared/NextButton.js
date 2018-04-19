import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';

import BaseComponent from '../../shared/BaseComponent';
import { nextNumberPersist, resetVoterState } from '../../../actions/VoterAction';
import routes from '../../../constants/Routes';
import voterConstants from '../../../constants/VoterConstants';
import boardingTypes from '../../../constants/VoterBoardingType';

class NextButton extends BaseComponent {

    onNext = () => {
        const { voter, actions } = this.props;
        if (voter.currentNumber === voterConstants.VOTERS_COUNT) {
            actions.resetVoterState();
            this.redirectToHome();
            return;
        }
        actions.nextNumberPersist();
        this.onLink(routes.voterDetail);
    };

    componentWillMount() {
        const { boardingType } = this.props.voter;
        if (boardingType === boardingTypes.voterList) {
            setTimeout(() => {
                this.onLink(routes.voterList);
            }, 3000);
        }
    }

    render() {
        const { title = 'Next', voter: { boardingType } } = this.props;
        return boardingType === boardingTypes.register
            ? (
                <Button className='btn btn-primary'
                        onClick={this.onNext}>
                    { title }
                </Button>
            ) : null;
    }
}

const mapStateToProps = (state) => {
    return {
        voter: state.voter
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ nextNumberPersist, resetVoterState }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NextButton));