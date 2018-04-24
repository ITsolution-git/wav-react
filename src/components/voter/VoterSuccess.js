import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import BaseComponent from '../shared/BaseComponent';
import NextButton from './shared/NextButton';
import { getUrlParams } from '../../helpers/UrlHelper';
import boardingTypes from '../../constants/VoterBoardingType';
import VoterContants from "../../constants/VoterConstants";
import routes from "../../constants/Routes";

class VoterSuccess extends BaseComponent {

    componentWillMount() {
        if (this.props.voter.boardingType === boardingTypes.voterList) {
            setTimeout(() => {
                this.onLink(routes.voterList);
            }, 2000);
        }
    }

     render() {
        const { firstname = '', lastname = ''} = getUrlParams(this.props);
        const { boardingType, currentNumber, makeList } = this.props.voter,
            nextFirstName = makeList[`${VoterContants.FIRST_NAME_PREIX}${currentNumber + 1}`],
            nextLastName = makeList[`${VoterContants.LAST_NAME_PREFIX}${currentNumber + 1}`];

        return (
            <div className='btw-voter btw-voter-success container'>
                <div className="full-name">
                    {firstname } { lastname } { ' is registered to vote! ' }
                </div>
                <div className='success-icon'>
                    <FontAwesome name='check-circle' />
                </div>
                <div className='success-text'>Successfully registered</div>
                { boardingType === boardingTypes.register &&
                    <div>
                        { nextFirstName && <div className='try-next'>Lets see if { nextFirstName } { nextLastName } is registered to vote</div> }
                        <div className='next-button'>
                            <NextButton />
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        voter: state.voter
    }
};

export default connect(mapStateToProps)(withRouter(VoterSuccess));