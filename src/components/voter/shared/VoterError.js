import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import ResultBase from './ResultBase';
import NextButton from './NextButton';
import { getUrlParams } from '../../../helpers/UrlHelper';
import voterConstants from '../../../constants/reducerConstants/VoterConstants';
import boardingTypes from '../../../constants/VoterBoardingType';
import WhiteBox from './WhiteBox';
import Icon from '../../shared/Icon';
import Button from "../../shared/Button";
import routes from "../../../constants/Routes";

class VoterError extends ResultBase {
    componentWillMount() {
        this.checkRedirectVoterList();
    }

    onEditInfoClick = () => {
        this.onLink(`${routes.voterDetail}?loadPrevious=true`);
    };

    render() {
        const { makeList, currentNumber, boardingType } = this.props.voter,
            firstName = makeList[`${voterConstants.FIRST_NAME_PREIX}${currentNumber}`],
            lastName = makeList[`${voterConstants.LAST_NAME_PREFIX}${currentNumber}`];

        const {
            firstname = firstName,
            lastname = lastName,
            noResults = false
        } = getUrlParams(this.props);

        return (
            <WhiteBox>
                <div className='btw-voter-error'>
                    <div className='error-icon'>
                        <Icon name='face-light' width={90} height={90} />
                    </div>
                    <div id="text">
                        <div className='cant-find title-32-light-blue'>
                            { firstname } { lastname } may not be <br />
                            registered.
                        </div>
                        <div className='ok-text text-18-dark-blue-bold'>
                            We couldn't find { firstname } { lastname } in the voter file. Don't worry - <br />
                            you can help { firstname } { lastname } register in just a sec.
                        </div>
                    </div>
                    { boardingType === boardingTypes.register &&
                        <div id="buttons">
                            { noResults === 'true' && <Button color="white" onClick={this.onEditInfoClick}>Edit Info</Button> }
                            <NextButton title='Next Voter' />
                        </div> }
                </div>
            </WhiteBox>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        voter: state.voter
    }
};

export default connect(mapStateToProps)(withRouter(VoterError));