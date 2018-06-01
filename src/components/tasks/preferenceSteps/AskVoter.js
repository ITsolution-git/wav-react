import React from 'react';
import Typography from '@material-ui/core/Typography';

import BaseComponent from '../../shared/BaseComponent';

export default class AskVoter extends BaseComponent {
    renderOption = (option) => {
        return (
            <li>
                <Typography>
                    <b>{ option }</b>
                </Typography>
            </li>
        )
    }

    render() {
        const {
            voterData: {
                firstname = '',
                lastname = ''
            },
            stateInfo = {}
        } = this.props;

        return (
            <div>
                <Typography gutterBottom>
                    Ask { firstname } { lastname } how they prefer to cast their ballot, and be ready to give them more information about their options…
                    <br /><br />
                </Typography>
                <ul>
                    { stateInfo['earlyVotingAllowed'] && this.renderOption('Early voting.') }
                    { stateInfo['absenteeWithCause'] && this.renderOption('Absentee with cause.') }
                    { stateInfo['absenteeWithoutCause'] && this.renderOption('Absentee without cause.') }
                </ul>
            </div>
        );
    }
}
