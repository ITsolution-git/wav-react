import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import NextButton from './NextButton';
import { getUrlParams } from '../../../helpers/UrlHelper';
import boardingTypes from '../../../constants/VoterBoardingType';
import ResultBase from './ResultBase';
import WhiteBox from './WhiteBox';
import Icon from '../../shared/Icon';

class VoterSuccess extends ResultBase {

    componentWillMount() {
        this.checkRedirectVoterList();
    }

     render() {
        const { firstname = '', lastname = ''} = getUrlParams(this.props);
        const { boardingType } = this.props.voter;

        return (
            <WhiteBox>
                <div className="btw-voter-success">
                    <div className="success-icon">
                        <Icon name="check-light-blue" width={70} height={70} />
                    </div>
                    <div id="text">
                        <div>Awesome!</div>
                        <div>{firstname } { lastname } { ' is registered.' }</div>
                    </div>
                    { boardingType === boardingTypes.register &&
                        <div className='next-button'>
                            <NextButton title="Next Voter" />
                        </div>
                    }
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

export default connect(mapStateToProps)(withRouter(VoterSuccess));