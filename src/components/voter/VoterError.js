import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import ResultBase from './shared/ResultBase';
import NextButton from './shared/NextButton';
import { getUrlParams } from '../../helpers/UrlHelper';
import voterConstants from '../../constants/reducerConstants/VoterConstants';
import boardingTypes from '../../constants/VoterBoardingType';

class VoterError extends ResultBase {
    componentWillMount() {
        this.checkRedirectVoterList();
    }

    render() {
        const { makeList, currentNumber, boardingType } = this.props.voter,
            firstName = makeList[`${voterConstants.FIRST_NAME_PREIX}${currentNumber}`],
            lastName = makeList[`${voterConstants.LAST_NAME_PREFIX}${currentNumber}`];

        const { firstname = firstName, lastname = lastName} = getUrlParams(this.props);

        return (
            <div className='btw-voter btw-voter-error container'>
                <div className='error-icon'>
                    <FontAwesome name='exclamation-triangle' />
                </div>
                <div className='cant-find'>We found  '{ firstname } { lastname }' in the registry but they are not registered to vote.</div>
                <div className='ok-text'>Don't worry we will work together to help this person get registered</div>
                { boardingType === boardingTypes.register && <div>
                    <NextButton />
                </div> }
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