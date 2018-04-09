import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import BaseComponent from '../shared/BaseComponent';
import NextButton from './shared/NextButton';
import { getUrlParams } from '../../helpers/UrlHelper';
import voterConstants from '../../constants/VoterConstants';


class VoterError extends BaseComponent {
    render() {
        const { makeList, currentNumber } = this.props.voter,
            firstName = makeList[`${voterConstants.FIRST_NAME_PREIX}${currentNumber}`],
            lastName = makeList[`${voterConstants.LAST_NAME_PREFIX}${currentNumber}`];

        const { firstname = firstName, lastname = lastName} = getUrlParams(this.props);

        return (
            <div className='btw-voter btw-voter-error container'>
                <div className='error-icon'>
                    <FontAwesome name='exclamation-triangle' />
                </div>
                <div className='cant-find'>We cant find '{ firstname } { lastname }'</div>
                <div className='ok-text'>That's okay we will come back to this person.</div>
                <div>
                    <NextButton />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        voter: state.voter
    }
};

export default connect(mapStateToProps)(withRouter(VoterError));