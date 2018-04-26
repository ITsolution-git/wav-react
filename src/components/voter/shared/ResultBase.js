import React from 'react';

import BaseComponent from '../../shared/BaseComponent';
import boardingTypes from '../../../constants/VoterBoardingType';
import routes from '../../../constants/Routes';

export default class ResultBase extends BaseComponent {
    checkRedirectVoterList = () => {
        if (this.props.voter.boardingType === boardingTypes.voterList) {
            setTimeout(() => {
                this.onLink(routes.voterList);
            }, 2000);
        }
    }
}